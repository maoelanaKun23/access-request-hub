import { jwtDecode, type JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role_name?: string;
}

export function getRole(): string | undefined {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return undefined;
    }

    const role = jwtDecode<CustomJwtPayload>(token).role_name;
    return role;
  } catch (error) {
    if (!error) {
      return undefined;
    }
  }
}
