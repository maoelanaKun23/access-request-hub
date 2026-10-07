import { createFileRoute } from "@tanstack/react-router";
import { CreateRequestPage } from "@/pages/CreateRequestPage";

export const Route = createFileRoute("/_protected/requests/new")({
  component: CreateRequestPage,
});
