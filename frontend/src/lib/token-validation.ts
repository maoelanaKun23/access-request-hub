export function isAccessTokenValid(user: any): boolean {
  const token = localStorage.getItem("token");
  if (!token || !user) return false;

  try {
    // Decode JWT payload (tanpa verify signature — verify di BE)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; // convert to ms
    return Date.now() < exp;
  } catch {
    return false;
  }
}