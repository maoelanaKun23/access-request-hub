import { Layout } from "@/components/templates/layout";
import { useAuth } from "@/hooks/use-auth";
import { isAccessTokenValid } from "@/lib/token-validation";
import {
  Outlet,
  createFileRoute,
  useMatch,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/develop")({
  component: RootComponent,
});

function RootComponent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const match = useMatch({ from: "/develop", shouldThrow: false });

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
