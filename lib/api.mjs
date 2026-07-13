/**
 * API request layer — routes all requests through the local API
 * (localStorage + heuristic analysis) for standalone offline mode.
 * No backend server or database required.
 */

import { handleLocalApi } from "./local-api.mjs";

/**
 * Make an API request through the local handler.
 * Maintains the same interface as the original fetch-based implementation.
 * @param {string} path - API path (e.g. "/session/A7K9Q2")
 * @param {object} options - { method, body, headers }
 * @returns {Promise<object>} Response body
 */
export async function apiRequest(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  let body = {};
  if (options.body) {
    try {
      body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    } catch {
      body = {};
    }
  }
  const headers = { ...(options.headers || {}) };
  // Merge admin headers if available
  const admin = adminHeaders();
  for (const key of Object.keys(admin)) {
    if (!headers[key]) headers[key] = admin[key];
  }

  const result = await handleLocalApi(method, path, body, headers);

  if (!result.ok) {
    throw new Error(result.body?.error || `请求失败（${result.status}）`);
  }

  // Handle CSV export
  if (result.body?.isCsv) {
    return { csv: result.body.csv };
  }

  return result.body || {};
}

/**
 * Get admin authorization headers from sessionStorage.
 */
export function adminHeaders() {
  if (typeof window === "undefined") return {};
  const token = window.sessionStorage.getItem("ai-assessment-admin-token");
  return token ? { authorization: `Bearer ${token}` } : {};
}

/**
 * Download CSV data as a file.
 */
export async function downloadCsv(path, filename) {
  const result = await apiRequest(path, { headers: adminHeaders() });
  if (!result.csv) throw new Error("导出失败");

  // Add BOM for Excel UTF-8 compatibility (buildCsv already includes it, but ensure)
  const csv = result.csv;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
