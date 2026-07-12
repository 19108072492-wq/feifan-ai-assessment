const API_URL = (process.env.NEXT_PUBLIC_ASSESSMENT_API_URL || "/api").replace(/\/$/, "");

export async function apiRequest(path, options = {}) {
  const headers = { "content-type": "application/json", ...(options.headers || {}) };
  const response = await fetch(`${API_URL}${path}`, { ...options, headers, cache: "no-store" });
  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { error: text || "服务返回格式错误" };
  }
  if (!response.ok) throw new Error(payload.error || `请求失败（${response.status}）`);
  return payload;
}

export function adminHeaders() {
  if (typeof window === "undefined") return {};
  const token = window.sessionStorage.getItem("ai-assessment-admin-token");
  return token ? { authorization: `Bearer ${token}` } : {};
}

export async function downloadCsv(path, filename) {
  const response = await fetch(`${API_URL}${path}`, { headers: adminHeaders(), cache: "no-store" });
  if (!response.ok) throw new Error("导出失败");
  const blob = await response.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
