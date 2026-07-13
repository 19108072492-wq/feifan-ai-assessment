/**
 * Local storage-based data persistence layer.
 * Replaces PostgreSQL for standalone / offline mode.
 */

const STORAGE_KEYS = {
  sessions: "ai-assessment:sessions",
  submissions: "ai-assessment:submissions",
  loginAttempts: "ai-assessment:login-attempts",
  adminToken: "ai-assessment-admin-token",
  adminCode: "ai-assessment:admin-code",
};

/** Default teacher access code for local mode. */
export const DEFAULT_ADMIN_CODE = "teacher2026";

function read(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

/* ------------------------------ Sessions ------------------------------ */

export function getSessions() {
  return read(STORAGE_KEYS.sessions);
}

export function getSessionById(id) {
  return getSessions().find((s) => s.id === id) || null;
}

export function getSessionByCode(code) {
  return getSessions().find((s) => s.code === code.toUpperCase()) || null;
}

export function saveSession(session) {
  const sessions = getSessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) {
    sessions[index] = { ...sessions[index], ...session };
  } else {
    sessions.unshift(session);
  }
  write(STORAGE_KEYS.sessions, sessions);
  return session;
}

export function deleteSessionById(id) {
  const sessions = getSessions().filter((s) => s.id !== id);
  write(STORAGE_KEYS.sessions, sessions);
  // Also remove related submissions
  const submissions = getSubmissions().filter((s) => s.sessionId !== id);
  write(STORAGE_KEYS.submissions, submissions);
}

/* ----------------------------- Submissions ---------------------------- */

export function getSubmissions() {
  return read(STORAGE_KEYS.submissions);
}

export function getSubmissionsBySession(sessionId) {
  return getSubmissions()
    .filter((s) => s.sessionId === sessionId)
    .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
}

export function getSubmissionByToken(token) {
  return getSubmissions().find((s) => s.reportToken === token) || null;
}

export function getSubmissionById(id) {
  return getSubmissions().find((s) => s.id === id) || null;
}

export function saveSubmission(submission) {
  const submissions = getSubmissions();
  const index = submissions.findIndex((s) => s.id === submission.id);
  if (index >= 0) {
    submissions[index] = { ...submissions[index], ...submission };
  } else {
    submissions.unshift(submission);
  }
  write(STORAGE_KEYS.submissions, submissions);
  return submission;
}

export function findSubmissionByIdempotency(sessionId, idempotencyKey) {
  return (
    getSubmissions().find(
      (s) => s.sessionId === sessionId && s.idempotencyKey === idempotencyKey,
    ) || null
  );
}

/* --------------------------- Login Attempts --------------------------- */

export function getLoginAttempt(ipHash) {
  return read(STORAGE_KEYS.loginAttempts).find((a) => a.ipHash === ipHash) || null;
}

export function saveLoginAttempt(attempt) {
  const attempts = read(STORAGE_KEYS.loginAttempts);
  const index = attempts.findIndex((a) => a.ipHash === attempt.ipHash);
  if (index >= 0) {
    attempts[index] = attempt;
  } else {
    attempts.push(attempt);
  }
  write(STORAGE_KEYS.loginAttempts, attempts);
}

export function clearLoginAttempt(ipHash) {
  const attempts = read(STORAGE_KEYS.loginAttempts).filter((a) => a.ipHash !== ipHash);
  write(STORAGE_KEYS.loginAttempts, attempts);
}

/* ----------------------------- Admin Code ----------------------------- */

export function getAdminCode() {
  if (typeof window === "undefined") return DEFAULT_ADMIN_CODE;
  return window.localStorage.getItem(STORAGE_KEYS.adminCode) || DEFAULT_ADMIN_CODE;
}

export function setAdminCode(code) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEYS.adminCode, code);
}

/* ------------------------------ Utilities ------------------------------ */

export function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function generateSessionCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes =
    typeof crypto !== "undefined" && "getRandomValues" in crypto
      ? crypto.getRandomValues(new Uint8Array(6))
      : Array.from({ length: 6 }, () => Math.floor(Math.random() * 256));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

export function generateReportToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "").slice(0, 43);
  }
  return Array.from({ length: 43 }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(
      Math.floor(Math.random() * 64),
    ),
  ).join("");
}
