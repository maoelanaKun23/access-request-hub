import { createFileRoute } from "@tanstack/react-router";
import { RequestsPage } from "@/pages/RequestsPage";

export const Route = createFileRoute("/_protected/requests/")({
  component: RequestsPage,
});
