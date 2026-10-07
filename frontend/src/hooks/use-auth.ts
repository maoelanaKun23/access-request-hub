import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export type Role = "Requester" | "Manager" | "System Owner" | "Admin";

export interface User {
  email: string;
  role: Role;
  label: string;
}

function getStoredUser(): User | null {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export const DEMO_USERS: User[] = [
  { email: "alice@example.local", role: "Requester", label: "Alice (Requester)" },
  { email: "bob@example.local", role: "Manager", label: "Bob (Manager)" },
  { email: "carol@example.local", role: "System Owner", label: "Carol (CRM Owner)" },
  { email: "dana@example.local", role: "System Owner", label: "Dana (Finance Owner)" },
  { email: "erin@example.local", role: "Admin", label: "Erin (Admin/Auditor)" },
];

export function useAuth() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      return getStoredUser();
    },
    initialData: getStoredUser,
  });

  const login = useMutation({
    mutationFn: async (payload: { email: string; password?: string }) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const foundUser = DEMO_USERS.find(u => u.email === payload.email);
      if (!foundUser) throw new Error("User not found");
      return foundUser;
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      qc.setQueryData(["auth", "me"], data);
      navigate({ to: "/dashboard" });
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
    isAdmin: user?.role === "Admin",
    login,
    logout,
  };
}