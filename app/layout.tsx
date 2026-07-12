import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI能力与风格测评",
  description: "企业内部AI工作方式起点画像与课堂测评工具。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
