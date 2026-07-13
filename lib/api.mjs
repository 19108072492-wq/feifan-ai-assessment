/** Shared remote API. Classroom data must be visible across devices. */
export const API_ENDPOINT =
  "https://eyzcleghbczxxptdwlkq.supabase.co/functions/v1/ai-assessment-api";

/**
 * Make an API request through the Supabase Edge Function.
 * @param {string} path - API path (e.g. "/session/A7K9Q2")
 * @param {object} options - { method, body, headers }
 * @returns {Promise<object>} Response body
 */
export async function apiRequest(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const headers = { "content-type": "application/json", ...(options.headers || {}) };
  const admin = adminHeaders();
  for (const key of Object.keys(admin)) {
    if (!headers[key]) headers[key] = admin[key];
  }

  const response = await fetch(`${API_ENDPOINT}${path}`, {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : options.body,
  });
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/csv")) {
    const csv = await response.text();
    if (!response.ok) throw new Error(`导出失败（${response.status}）`);
    return { csv };
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error || `请求失败（${response.status}）`);
  return payload;
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
