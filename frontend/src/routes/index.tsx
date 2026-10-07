import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  if (!localStorage.getItem("accessToken")) {
    return navigate({ to: "/login", replace: true });
  }

  return navigate({ to: "/dashboard", replace: true });
}
