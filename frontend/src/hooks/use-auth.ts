import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";

export type Role = "ADMIN" | "GURU" | "ORTU";

export interface User {
  id: string;
  nama: string;
  email: string;
  role: Role;
}

function getStoredUser(): User | null {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export function useAuth() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      if (!localStorage.getItem("token")) return null;
      try {
        const res = await api.get("/auth/me");
        const u = res.data.data;
        localStorage.setItem("user", JSON.stringify(u));
        return u;
      } catch {
        localStorage.clear();
        return null;
      }
    },
    initialData: getStoredUser,
    staleTime: 5 * 60 * 1000,
  });

  const login = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await api.post("/auth/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      qc.setQueryData(["auth", "me"], data.data.user);

      // Redirect berdasarkan role
      const role = data.data.user.role as Role;
      switch (role) {
        case "ADMIN": navigate({ to: "/dashboard" }); break;
        case "GURU":  navigate({ to: "/dashboard" }); break;
        case "ORTU":  navigate({ to: "/dashboard" }); break;
      }
    },
  });

  const logout = () => {
    localStorage.clear();
    qc.setQueryData(["auth", "me"], null);
    qc.clear();
    navigate({ to: "/", replace: true });
  };

  return {
    user,
    isLoading,
    isLoggedIn: !!user,
    role: user?.role || null,
    isAdmin: user?.role === "ADMIN",
    isGuru: user?.role === "GURU",
    isOrtu: user?.role === "ORTU",
    login,
    logout,
  };
}