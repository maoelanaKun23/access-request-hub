import { createFileRoute } from '@tanstack/react-router'
import DashboardGuru from '@/pages/Dashboard/Guru'

export const Route = createFileRoute('/_protected/dasboard guru/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardGuru/>
}
