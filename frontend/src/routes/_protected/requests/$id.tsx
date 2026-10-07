import { createFileRoute } from "@tanstack/react-router";
import { RequestDetailPage } from "@/pages/RequestDetailPage";

export const Route = createFileRoute("/_protected/requests/$id")({
  component: RequestDetailPage,
});
