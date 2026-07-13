/**
 * Build app-bundle.js for standalone mode.
 *
 * 用 esbuild 把 lib/*.mjs 和 app/*.tsx 打包成单文件 IIFE，
 * 再拼接到 React UMD + ReactDOM UMD 后面。
 *
 * 用法：node scripts/build-bundle.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import esbuild from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const REACT_UMD = join(root, "react-bundle.js");
const REACT_DOM_UMD = join(root, "react-dom-bundle.js");
const OUTPUT = join(root, "app-bundle.js");

async function main() {
  console.log("[build-bundle] 开始构建 app-bundle.js …");

  // 1) 读取 React UMD
  if (!existsSync(REACT_UMD)) throw new Error(`找不到 React UMD: ${REACT_UMD}`);
  if (!existsSync(REACT_DOM_UMD)) throw new Error(`找不到 ReactDOM UMD: ${REACT_DOM_UMD}`);
  const reactCode = readFileSync(REACT_UMD, "utf-8");
  const reactDomCode = readFileSync(REACT_DOM_UMD, "utf-8");

  // 2) 用 esbuild 打包业务代码（入口：AssessmentApp.tsx）
  const entryFile = join(root, "app", "AssessmentApp.tsx");
  if (!existsSync(entryFile)) throw new Error(`找不到入口文件: ${entryFile}`);

  // 我们的代码运行在浏览器中，使用全局 React/ReactDOM（UMD），
  // 所以需要把 import "react" / "react-dom" 映射到全局变量。
  // 使用 esbuild 的 external + globalName + footer 方式。
  const result = await esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    format: "iife",
    target: ["es2020"],
    platform: "browser",
    jsx: "automatic",
    jsxImportSource: "react",
    // 把 react / react-dom 标记为外部，运行时通过全局变量访问
    external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    globalName: "__AppBundle",
    minify: false,
    write: false,
    sourcemap: false,
    loader: {
      ".tsx": "tsx",
      ".ts": "ts",
      ".mjs": "js",
      ".js": "js",
      ".css": "text",
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    alias: {
      "@": join(root),
    },
    // 把外部依赖映射到全局变量
    footer: {
      js: `
// 把外部依赖映射到全局变量
var __externals = {
  "react": React,
  "react-dom": ReactDOM,
  "react/jsx-runtime": { jsx: function(type, props, key) { return React.createElement(type, props, key); }, jsxs: function(type, props, key) { return React.createElement(type, props, key); }, Fragment: React.Fragment },
  "react/jsx-dev-runtime": { jsxDEV: function(type, props, key, isStaticChildren, source, self) { return React.createElement(type, props); }, Fragment: React.Fragment },
};
// 用我们的 entry 替换外部引用
if (typeof __AppBundle !== "undefined" && __AppBundle.main) {
  __AppBundle.main(__externals);
}
`,
    },
  });

  // 3) 读取打包后的代码
  let bundledCode = result.outputFiles[0].text;

  // 4) 修补：esbuild 把 import React from "react" 编译成对 require("react") 的访问。
  //    在 IIFE 模式下，esbuild 会把 external 模块通过 __require 函数访问，
  //    但这个 __require 在浏览器里不存在。我们需要自己提供。
  //    最简单的做法：在外面包一层提供 require 函数。
  const requireShim = `
var __modules = {};
var __cache = {};
function __require(name) {
  if (__cache[name]) return __cache[name].exports;
  var module = __cache[name] = { exports: {} };
  if (!__modules[name]) {
    // 外部依赖映射到全局
    var externalMap = {
      "react": React,
      "react-dom": ReactDOM,
      "react/jsx-runtime": { jsx: function(type, props, key) { return React.createElement(type, props, key); }, jsxs: function(type, props, key) { return React.createElement(type, props, key); }, Fragment: React.Fragment },
      "react/jsx-dev-runtime": { jsxDEV: function(type, props, key, isStaticChildren, source, self) { return React.createElement(type, props); }, Fragment: React.Fragment },
    };
    if (externalMap[name]) return externalMap[name];
    throw new Error("Module not found: " + name);
  }
  __modules[name].call(module.exports, module, module.exports, __require);
  return module.exports;
}
`;

  // 5) 用 esbuild 时 format: "iife" 已经把代码包在一个函数里，
  //    但 external 的 import 还是用 require() 访问的。
  //    我们改用 esbuild 的 banner 来注入 require shim。
  //    但这样可能仍然不够，因为 esbuild 生成的 IIFE 里有自己的 require。
  //
  //    更稳的方案：改用 format: "cjs"，然后手动用一个 IIFE 包裹，
  //    提供 require 函数。

  // 实际上，让我们换一个策略：
  // 用 esbuild 的 format: "esm" 生成代码，
  // 然后手动用正则把 import 语句替换成全局变量访问。

  const result2 = await esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    format: "esm",
    target: ["es2020"],
    platform: "browser",
    jsx: "automatic",
    jsxImportSource: "react",
    external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "recharts", "qrcode", "html-to-image"],
    minify: false,
    write: false,
    sourcemap: false,
    loader: {
      ".tsx": "tsx",
      ".ts": "ts",
      ".mjs": "js",
      ".js": "js",
      ".css": "text",
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    alias: {
      "@": join(root),
    },
  });

  let esmCode = result2.outputFiles[0].text;

  // 6) 去掉所有 export 语句（IIFE 内不能用 export）
  //    export { foo, bar }; → 移除
  //    export default foo; → 移除
  //    export const foo = ... → const foo = ...
  //    export function foo() → function foo()
  esmCode = esmCode.replace(/^export\s+\{[^}]*\};?\s*$/gm, "");
  esmCode = esmCode.replace(/^export\s+default\s+/gm, "");
  esmCode = esmCode.replace(/^export\s+const\s+/gm, "const ");
  esmCode = esmCode.replace(/^export\s+let\s+/gm, "let ");
  esmCode = esmCode.replace(/^export\s+var\s+/gm, "var ");
  esmCode = esmCode.replace(/^export\s+function\s+/gm, "function ");
  esmCode = esmCode.replace(/^export\s+class\s+/gm, "class ");

  // 8) 把 ESM 的 import 语句替换成全局变量访问
  //    import React from "react" → const React = window.React
  //    import * as React from "react" → const React = window.React
  //    import { useState } from "react" → const { useState } = window.React
  //    import { jsxDEV } from "react/jsx-dev-runtime" → 内联定义
  const importRegex = /^import\s+([\s\S]+?)\s+from\s+["']([^"']+)["'];?\s*$/gm;
  esmCode = esmCode.replace(importRegex, (match, imports, source) => {
    if (source === "react") {
      // 各种 react 导入形式
      if (imports.startsWith("* as ")) {
        return `const ${imports.replace("* as ", "")} = window.React;`;
      }
      if (imports.startsWith("{") && imports.endsWith("}")) {
        // esbuild 用 ESM 的 "as" 重命名语法，在普通 JS 解构中需要改成 ":"
        // 例：{ useEffect as useEffect2 } → { useEffect: useEffect2 }
        const fixedImports = imports.replace(/\b(\w+)\s+as\s+(\w+)\b/g, "$1: $2");
        return `const ${fixedImports} = window.React;`;
      }
      // default import
      return `const ${imports} = window.React;`;
    }
    if (source === "react-dom") {
      if (imports.startsWith("* as ")) {
        return `const ${imports.replace("* as ", "")} = window.ReactDOM;`;
      }
      return `const ${imports} = window.ReactDOM;`;
    }
    if (source === "react/jsx-dev-runtime") {
      return `const ${imports} = { jsxDEV: function(type, props, key, isStaticChildren, source, self) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, Fragment: React.Fragment };`;
    }
    if (source === "react/jsx-runtime") {
      return `const ${imports} = { jsx: function(type, props, key) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, jsxs: function(type, props, key) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, Fragment: React.Fragment };`;
    }
    if (source === "recharts") {
      // recharts 未安装，提供 stub
      return `const ${imports} = {};`;
    }
    if (source === "qrcode") {
      return `const ${imports} = window.QRCode || { toDataURL: function(t) { return Promise.resolve("https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=1&color=171713&bgcolor=ffffff&data=" + encodeURIComponent(t)); } };`;
    }
    if (source === "html-to-image") {
      return `const ${imports} = window.htmlToImage || { toPng: function(n) { return Promise.resolve("data:,"); } };`;
    }
    // 未知依赖，留空
    console.warn(`[build-bundle] 未知 import：${source}`);
    return `const ${imports} = {};`;
  });

  // 后处理：ESM 的 "as" 重命名在普通 JS 解构中无效，全部替换成 ":"
  // 例：const { useEffect as useEffect2 } = ... → const { useEffect: useEffect2 } = ...
  esmCode = esmCode.replace(/\bconst\s*\{([^}]*)\}\s*=/g, (match, inner) => {
    if (!/\bas\b/.test(inner)) return match;
    return match.replace(/\b(\w+)\s+as\s+(\w+)\b/g, "$1: $2");
  });

  // 9) 拼接最终 bundle
  const output = [
    "/* ============================================================",
    " * AI 能力与风格测评 — app-bundle.js",
    " * 自动构建于 " + new Date().toISOString(),
    " * ============================================================ */",
    "",
    "/* React 18.3.1 UMD */",
    reactCode,
    "",
    "/* ReactDOM 18.3.1 UMD */",
    reactDomCode,
    "",
    "/* ======================== POLYFILLS ======================== */",
    "if (!window.QRCode) { window.QRCode = { toDataURL: function(t) { return Promise.resolve(\"https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=1&color=171713&bgcolor=ffffff&data=\" + encodeURIComponent(t)); } }; }",
    "if (!window.htmlToImage) { window.htmlToImage = { toPng: function(node, options) { return Promise.resolve(\"data:,\"); } }; }",
    "if (!window.recharts) { window.recharts = {}; }",
    "",
    "/* ======================== APP CODE ======================== */",
    "(function() {",
    "'use strict';",
    esmCode,
    "",
    "/* ======================== RENDER ======================== */",
    "const root = ReactDOM.createRoot(document.getElementById('root'));",
    "root.render(React.createElement(AssessmentApp));",
    "})();",
    "",
  ].join("\n");

  writeFileSync(OUTPUT, output, "utf-8");
  console.log(`[build-bundle] ✅ 已写入 ${OUTPUT}（${(output.length / 1024).toFixed(1)} KB）`);

  // 10) 同步更新 standalone.html 的内联 CSS
  const cssFile = join(root, "app", "globals.css");
  if (existsSync(cssFile)) {
    const css = readFileSync(cssFile, "utf-8");
    // 去掉 @import "tailwindcss"（独立运行不需要）
    const cleanedCss = css.replace(/^@import\s+"tailwindcss";?\s*$/gm, "").trim();
    const htmlFile = join(root, "standalone.html");
    let html = readFileSync(htmlFile, "utf-8");
    // 替换 <style>...</style> 内容
    html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${cleanedCss}\n</style>`);
    writeFileSync(htmlFile, html, "utf-8");
    console.log(`[build-bundle] ✅ 已同步 CSS 到 standalone.html`);
  }
}

main().catch((err) => {
  console.error("[build-bundle] 构建失败：", err);
  process.exit(1);
});
