import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import "./font-pdf";
import "./index.css";
import { Toaster } from "sonner";
import { Layout } from "./components/templates/layout";
import { routeTree } from "./routeTree.gen";
import { PageNotFound } from "./components/templates/page-not-found";
import { Ping } from 'ldrs/react'
import 'ldrs/react/Ping.css'


const queryClient = new QueryClient();

const NotFound = () => (
  <Layout>
    <PageNotFound />
  </Layout>
);

const PendingComponent = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
    }}
  >
    <Ping size="80" speed="2" color="blue" />
  </div>
);

const router = createRouter({
  routeTree,
  // defaultPendingComponent: PendingComponent,
  // defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  // defaultNotFoundComponent: NotFound,
  context: {
    queryClient,
  },
  basepath: "/",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="absensi">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}