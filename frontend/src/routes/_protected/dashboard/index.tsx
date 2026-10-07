import { createFileRoute } from '@tanstack/react-router'
import DashboardAdmin from '../../../pages/Dashboard/Admin/index';
import DashboardGuru from '@/pages/Dashboard/Guru';
import DashboardOrtu from '@/pages/Dashboard/Ortu';

export const Route = createFileRoute('/_protected/dashboard/')({
  component: RouteComponent,
})

function getRoleFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
}

function RouteComponent() {
  const role = getRoleFromToken();

  if (role === "ADMIN") return <DashboardAdmin />;
  if (role === "GURU") return <DashboardGuru />;
  if (role === "ORTU") return <DashboardOrtu/>;

  return <div>Tidak punya akses</div>;
}
