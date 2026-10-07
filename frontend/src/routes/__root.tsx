import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Fragment } from "react";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

export default function RootComponent() {
  return (
    <Fragment>
      <Outlet />
      {import.meta.env.DEV ? (
        <Fragment>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-right"
          />
          <TanStackRouterDevtools position="bottom-left" />
        </Fragment>
      ) : null}
    </Fragment>
  );
}
