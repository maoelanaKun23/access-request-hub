import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect } from "react";
import { LogIn, Loader2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

const DEMO_USERS = [
  { email: "alice@example.local", role: "Requester", label: "Alice (Requester)" },
  { email: "bob@example.local", role: "Manager", label: "Bob (Manager)" },
  { email: "carol@example.local", role: "System Owner", label: "Carol (CRM Owner)" },
  { email: "dana@example.local", role: "System Owner", label: "Dana (Finance Owner)" },
  { email: "erin@example.local", role: "Admin", label: "Erin (Admin/Auditor)" },
];

export function LoginPage() {
  const [email, setEmail] = useState(DEMO_USERS[0].email);
  const [error, setError] = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login.mutateAsync({ email, password: "password" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to switch user.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-200">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Access Request Hub</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">Enterprise Access Management</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Simulated Login</h2>
          <p className="text-sm text-slate-500 mb-6">Select a demo user to simulate authentication.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Demo User</label>
              <div className="relative">
                <select
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full appearance-none text-sm text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer font-medium"
                >
                  {DEMO_USERS.map((u) => (
                    <option key={u.email} value={u.email}>
                      {u.label} - {u.email}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={login.isPending}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-bold py-3.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2 shadow-md shadow-blue-200"
            >
              {login.isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
              ) : (
                <><LogIn className="w-5 h-5" /> Switch User</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8 font-medium">© 2026 Access Request Hub MVP</p>
      </div>
    </div>
  );
}