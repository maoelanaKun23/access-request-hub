import type { PropsWithChildren } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useAuth, DEMO_USERS } from "@/hooks/use-auth";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Inbox, 
  History, 
  LogOut, 
  UserCircle2, 
  ChevronDown,
  Building2,
  ExternalLink
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function AppLayout({ children }: PropsWithChildren) {
  const { user, role, logout, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitchUser = async (targetEmail: string) => {
    setDropdownOpen(false);
    await login.mutateAsync({ email: targetEmail });
    navigate({ to: "/dashboard" });
  };

  // Role badge colors & text
  const getRoleBadge = (roleName: string | null) => {
    switch (roleName) {
      case "Requester":
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">Requester</span>;
      case "Manager":
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">Manager</span>;
      case "System Owner":
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-200">System Owner</span>;
      case "Admin":
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">Admin / Auditor</span>;
      default:
        return null;
    }
  };

  // Role-based Nav links
  const isRequester = role === "Requester";
  const isApprover = role === "Manager" || role === "System Owner";
  const isAdmin = role === "Admin";

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, show: true },
    { label: isAdmin ? "All Requests" : "My Requests", href: "/requests", icon: FileText, show: true },
    { label: "Create Request", href: "/requests/new", icon: PlusCircle, show: isRequester },
    { label: "Approval Inbox", href: "/approvals", icon: Inbox, show: isApprover },
    { label: "Audit Trail", href: "/audit", icon: History, show: isAdmin },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 antialiased overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 z-20">
        {/* Brand / Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800 bg-slate-950">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[14px] font-bold tracking-wider text-white uppercase font-sans">
              Access Request
            </div>
            <div className="text-[11px] font-semibold text-blue-400 tracking-widest uppercase">
              Hub
            </div>
          </div>
        </div>

        {/* Current User Quick Info */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-1.5">
            Active Simulated Session
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
              {user?.label ? user.label.slice(0, 2).toUpperCase() : "U"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-slate-100 truncate">
                {user?.label || "Demo User"}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Nav list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Menu Navigation
          </div>
          {navItems.filter(item => item.show).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-semibold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Switch / Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="font-semibold text-slate-800 text-sm hidden sm:block">
              Internal Application Access Management
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Role Badge */}
            {getRoleBadge(role)}

            {/* Simulated User Switcher Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all text-left"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {user?.label ? user.label[0] : "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    {user?.label || "Select User"}
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight">
                    {user?.email}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Simulate As Seed User
                  </div>
                  <div className="space-y-0.5">
                    {DEMO_USERS.map((u) => {
                      const isSelected = user?.email === u.email;
                      return (
                        <button
                          key={u.email}
                          onClick={() => handleSwitchUser(u.email)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                            isSelected
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <div className="text-xs">{u.label}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{u.email}</div>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            {u.role}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
