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

export const Route = createFileRoute("/_protected")({
  component: RootComponent,
});

function RootComponent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const match = useMatch({ from: "/_protected", shouldThrow: false });

  useEffect(() => {
    if (!user && !match) {
      navigate({ to: "/", replace: true });
    }
  }, [user, match, navigate]);

  useEffect(() => {
    if (!user && !isAccessTokenValid(user)) {
      localStorage.clear();
      navigate({
        to: import.meta.env.DEV ? "/" : `${window.location.hostname}/Landing`,
        replace: true,
      });
    }
  }, [user, navigate]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
