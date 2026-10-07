// layout.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { SIDEBAR_MENU } from "@/components/templates/layout/layout-sidebar-data";
import { getMenu } from "@/lib/get-menu";
import {
  Bell, Trash2, X, Loader2, Info, AlertTriangle, CheckCircle, AlertOctagon,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   NOTIF TYPES & HELPERS
   ═══════════════════════════════════════════════ */

interface Notif {
  id: string; judul: string; pesan: string; tipe: string;
  dibaca: boolean; createdAt: string;
}

const TIPE_CFG: Record<string, { icon: React.ReactNode; bg: string; color: string; dot: string }> = {
  INFO:    { icon: <Info className="w-4 h-4" />,           bg: "bg-blue-50",   color: "text-blue-600",   dot: "bg-blue-500" },
  WARNING: { icon: <AlertTriangle className="w-4 h-4" />,  bg: "bg-amber-50",  color: "text-amber-600",  dot: "bg-amber-500" },
  SUCCESS: { icon: <CheckCircle className="w-4 h-4" />,    bg: "bg-green-50",  color: "text-green-600",  dot: "bg-green-500" },
  DANGER:  { icon: <AlertOctagon className="w-4 h-4" />,   bg: "bg-red-50",    color: "text-red-600",    dot: "bg-red-500" },
};

function timeAgo(dateStr: string) {
  const now = new Date(); const d = new Date(dateStr);
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

/* ═══════════════════════════════════════════════
   NOTIF DROPDOWN — RESPONSIVE
   Desktop: dropdown popover kanan atas
   Mobile: full-screen bottom sheet overlay
   ═══════════════════════════════════════════════ */

function NotifDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
  const qc = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside (desktop only)
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = orig; };
  }, [open]);

  const { data: notifData, isLoading } = useQuery({
    queryKey: ["notifikasi", "dropdown"],
    queryFn: async () => (await api.get("/notifikasi?limit=10")).data.data,
    enabled: open,
    refetchInterval: open ? 15_000 : false,
  });

  const notifList: Notif[] = notifData?.data || [];
  const unread = notifData?.unread || 0;

  const markReadMut = useMutation({
    mutationFn: async (id: string) => (await api.put(`/notifikasi/${id}/read`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifikasi"] }),
  });
  const markAllReadMut = useMutation({
    mutationFn: async () => (await api.put("/notifikasi/read-all")).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifikasi"] }),
  });
  const deleteMut = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/notifikasi/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifikasi"] }),
  });

  if (!open) return null;

  const content = (
    <>
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-500 md:hidden" />
          <span className="text-[14px] font-bold text-slate-900">Notifikasi</span>
          {unread > 0 && <span className="text-[9px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">{unread} baru</span>}
        </div>
        <div className="flex items-center gap-1.5">
          {unread > 0 && (
            <button onClick={() => markAllReadMut.mutate()} disabled={markAllReadMut.isPending}
              className="text-[10px] font-semibold text-blue-600 hover:underline px-1.5 py-0.5 rounded disabled:opacity-50">
              Tandai dibaca
            </button>
          )}
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center"><X className="w-4 h-4 text-slate-400" /></button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-5 h-5 text-slate-300 animate-spin" /></div>
        ) : notifList.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-10 h-10 text-slate-200 mx-auto mb-2" />
            <p className="text-[13px] font-semibold text-slate-400">Belum ada notifikasi</p>
            <p className="text-[11px] text-slate-300 mt-1">Notifikasi akan muncul di sini</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {notifList.map(n => {
              const cfg = TIPE_CFG[n.tipe] || TIPE_CFG.INFO;
              return (
                <div key={n.id}
                  onClick={() => { if (!n.dibaca) markReadMut.mutate(n.id); }}
                  className={`px-4 py-3.5 flex items-start gap-3 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer group ${!n.dibaca ? "bg-blue-50/30" : ""}`}>
                  <div className={`w-9 h-9 md:w-8 md:h-8 rounded-lg ${cfg.bg} ${cfg.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>{cfg.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {!n.dibaca && <span className={`w-2 h-2 md:w-1.5 md:h-1.5 rounded-full ${cfg.dot} flex-shrink-0`} />}
                      <p className={`text-[12px] md:text-[11px] font-bold truncate ${!n.dibaca ? "text-slate-900" : "text-slate-600"}`}>{n.judul}</p>
                    </div>
                    <p className="text-[11px] md:text-[10px] text-slate-500 leading-relaxed line-clamp-2">{n.pesan}</p>
                    <p className="text-[10px] md:text-[9px] text-slate-400 mt-1">{timeAgo(n.createdAt)}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteMut.mutate(n.id); }}
                    className="w-8 h-8 md:w-6 md:h-6 rounded-lg md:rounded-md flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 opacity-60 transition-opacity hover:bg-red-50 flex-shrink-0 mt-0.5">
                    <Trash2 className="w-3.5 h-3.5 md:w-3 md:h-3 text-slate-400 hover:text-red-500" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifList.length > 0 && (
        <div className="px-4 py-3 md:py-2.5 border-t border-slate-100 bg-slate-50 flex-shrink-0">
          <button onClick={() => { onClose(); window.location.href = "/notifikasi"; }}
            className="w-full text-center text-[12px] md:text-[11px] font-semibold text-blue-600 hover:underline py-1">
            Lihat semua notifikasi →
          </button>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* ═══ MOBILE: Full-screen bottom sheet ═══ */}
      <div className="md:hidden fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl flex flex-col" style={{ maxHeight: "85vh" }}>
          {/* Drag handle */}
          <div className="flex justify-center pt-2 pb-1 flex-shrink-0"><div className="w-10 h-1 rounded-full bg-slate-300" /></div>
          {content}
        </div>
      </div>

      {/* ═══ DESKTOP: Dropdown popover ═══ */}
      <div ref={ref} className="hidden md:block absolute right-0 top-full mt-2 w-[360px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col" style={{ maxHeight: "480px" }}>
        {content}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   LAYOUT PROPS
   ═══════════════════════════════════════════════ */

export interface LayoutProps extends PropsWithChildren {
  menuAccessFromAPI?: any[];
  schoolName?: string;
  schoolSubtitle?: string;
  academicYear?: string;
  userName?: string;
  userInitials?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  onExport?: () => void;
  onFilter?: () => void;
}

/* ═══════════════════════════════════════════════
   MOBILE DRAWER
   ═══════════════════════════════════════════════ */

function MobileDrawer({
  open, onClose, navMain, userName, userInitials, activeUrl, onNavigate,
}: {
  open: boolean; onClose: () => void; navMain: typeof SIDEBAR_MENU.navMain;
  userName: string; userInitials: string; activeUrl: string; onNavigate: (url: string) => void;
}) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-64 bg-[#0F172A] z-50 flex flex-col p-4 gap-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-5 px-2">
          <span className="text-white font-bold text-[15px]">Menu</span>
          <button onClick={onClose} className="text-slate-400 text-xl leading-none bg-transparent border-none cursor-pointer">✕</button>
        </div>
        {navMain.map((n) => {
          const isActive = activeUrl === n.url;
          return (
            <button key={n.title} onClick={() => { onNavigate(n.url); onClose(); }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-left transition-colors border-none cursor-pointer w-full ${isActive ? "bg-[#1E3A5F] text-blue-400" : "text-slate-400 hover:bg-[#1E293B] bg-transparent"}`}>
              {n.icon && <img src={n.icon} alt={n.title} className="w-4 h-4 flex-shrink-0 object-contain" style={{ filter: isActive ? "none" : "grayscale(1) brightness(0.6)" }} />}
              {n.title}
            </button>
          );
        })}
        <div className="mt-auto bg-[#1E293B] rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">{userInitials}</div>
          <div><p className="text-[13px] font-semibold text-slate-200">{userName}</p><p className="text-[10px] text-slate-500">Administrator</p></div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════ */

function Navbar({
  navMain, schoolName, schoolSubtitle, academicYear, userInitials,
  onDrawerOpen, activeUrl, onNavigate,
}: {
  navMain: typeof SIDEBAR_MENU.navMain; schoolName: string; schoolSubtitle: string;
  academicYear: string; userInitials: string; onDrawerOpen: () => void;
  activeUrl: string; onNavigate: (url: string) => void;
}) {
  const [openUser, setOpenUser] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const { data: notifData } = useQuery({
    queryKey: ["notifikasi", "unread-count"],
    queryFn: async () => (await api.get("/notifikasi?limit=1")).data.data,
    refetchInterval: 30_000,
  });
  const unreadCount = notifData?.unread || 0;

  return (
    <nav className="bg-[#0F172A] h-14 flex items-center px-4 md:px-5 sticky top-0 z-30 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mr-6 flex-shrink-0">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0">
          <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="white"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg>
        </div>
        <div className="hidden sm:block">
          <p className="text-[13px] font-bold text-slate-50 leading-tight">{schoolName}</p>
          <p className="text-[10px] text-slate-500">{schoolSubtitle}</p>
        </div>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-0.5 flex-1 overflow-x-auto scrollbar-none">
        {navMain.map((n) => {
          const isActive = activeUrl === n.url;
          return (
            <button key={n.title} onClick={() => onNavigate(n.url)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap border-none cursor-pointer transition-colors ${isActive ? "bg-[#1E3A5F] text-blue-400" : "text-slate-500 hover:bg-[#1E293B] hover:text-slate-300 bg-transparent"}`}>
              {n.icon && <img src={n.icon} alt={n.title} className="w-3.5 h-3.5 flex-shrink-0 object-contain" style={{ filter: isActive ? "none" : "grayscale(1) brightness(0.6)" }} />}
              {n.title}
            </button>
          );
        })}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto flex-shrink-0">
        <span className="hidden lg:flex items-center text-[10px] font-semibold text-slate-500 bg-[#1E293B] border border-white/5 px-2.5 py-1.5 rounded-lg">{academicYear}</span>

        {/* ═══ NOTIFICATION BELL ═══ */}
        <div className="relative">
          <button onClick={() => { setNotifOpen(!notifOpen); setOpenUser(false); }}
            className="relative w-8 h-8 rounded-lg bg-[#1E293B] border border-white/5 flex items-center justify-center cursor-pointer hover:bg-[#2D3B4F] transition-colors">
            <Bell className="w-[15px] h-[15px] text-slate-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white border-[2px] border-[#0F172A] px-0.5">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          <NotifDropdown open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        {/* User avatar */}
        <div className="relative">
          <div onClick={() => { setOpenUser(!openUser); setNotifOpen(false); }}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 cursor-pointer select-none">
            {userInitials}
          </div>
          {openUser && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpenUser(false)} />
              <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-1.5">
                <button onClick={() => { localStorage.clear(); window.location.href = "/"; }}
                  className="w-full text-left text-[12px] font-semibold text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition">Logout</button>
              </div>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={onDrawerOpen} className="md:hidden w-8 h-8 rounded-lg bg-[#1E293B] border border-white/5 flex items-center justify-center cursor-pointer">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="#94A3B8"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
        </button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

/* ═══════════════════════════════════════════════
   LAYOUT EXPORT
   ═══════════════════════════════════════════════ */

export const Layout = ({
  children,
  menuAccessFromAPI = [],
  schoolName = "SDN Warakas 01",
  schoolSubtitle = "Sistem Absensi",
  academicYear = "TA 2025/2026",
  userName = "Budi Santoso",
  userInitials = "BS",
}: LayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState("/dashboard");

  const menu = getMenu(menuAccessFromAPI);
  const navMain = menu.navMain;

  const handleNavigate = (url: string) => { setActiveUrl(url); window.location.href = url; };

  const currentUrl = typeof window !== "undefined" ? window.location.pathname : activeUrl;
  const userLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;

  const dynamicUserName = userLS?.nama || userName;
  const dynamicInitials = getInitials(dynamicUserName);
  const now = new Date();
  const year = now.getFullYear();
  const academicYearDynamic = `TA ${year}/${year + 1}`;

  return (
    <div className="flex h-screen flex-col">
      <Navbar
        navMain={navMain}
        schoolName={schoolName}
        schoolSubtitle={schoolSubtitle}
        academicYear={academicYearDynamic}
        userInitials={dynamicInitials}
        onDrawerOpen={() => setDrawerOpen(true)}
        activeUrl={currentUrl}
        onNavigate={handleNavigate}
      />
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navMain={navMain}
        userName={dynamicUserName}
        userInitials={dynamicInitials}
        activeUrl={currentUrl}
        onNavigate={handleNavigate}
      />
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider className="flex">
          <SidebarInset className="flex-1 flex flex-col">
            <ScrollArea className="flex-1">
              <main className="w-full flex-1">{children}</main>
            </ScrollArea>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
};