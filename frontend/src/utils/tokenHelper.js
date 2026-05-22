// src/utils/tokenHelper.js
// Small helper to parse JWT payload in the browser (no external deps)
export const parseJwt = (token) => {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    // atob is available in browser environments
    const decoded = JSON.parse(
      decodeURIComponent(escape(window.atob(payload))),
    );
    return decoded;
  } catch (e) {
    console.error("Failed to parse token", e);
    return null;
  }
};

export const getRoleFromToken = (token) => {
  const payload = parseJwt(token);
  return payload?.role || null;
};

export default { parseJwt, getRoleFromToken };
