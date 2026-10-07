import client from "@/config/userInstance";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { AccountLoginAuthenticatedQueryResponse, AccountLoginAuthenticatedPathParams, AccountLoginAuthenticatedHeaderParams } from "../../types/AccountLoginAuthenticated";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type AccountLoginAuthenticatedClient = typeof client<AccountLoginAuthenticatedQueryResponse, Error, never>;
type AccountLoginAuthenticated = {
    data: AccountLoginAuthenticatedQueryResponse;
    error: Error;
    request: never;
    pathParams: AccountLoginAuthenticatedPathParams;
    queryParams: never;
    headerParams: AccountLoginAuthenticatedHeaderParams;
    response: AccountLoginAuthenticatedQueryResponse;
    client: {
        parameters: Partial<Parameters<AccountLoginAuthenticatedClient>[0]>;
        return: Awaited<ReturnType<AccountLoginAuthenticatedClient>>;
    };
};
export const accountLoginAuthenticatedQueryKey = (id: AccountLoginAuthenticatedPathParams["id"]) => [{ url: "/api/login/:id", params: { id: id } }] as const;
export type AccountLoginAuthenticatedQueryKey = ReturnType<typeof accountLoginAuthenticatedQueryKey>;
export function accountLoginAuthenticatedQueryOptions<TData = AccountLoginAuthenticated["response"], TQueryData = AccountLoginAuthenticated["response"]>(id: AccountLoginAuthenticatedPathParams["id"], headers?: AccountLoginAuthenticated["headerParams"], options: AccountLoginAuthenticated["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<AccountLoginAuthenticated["response"], AccountLoginAuthenticated["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = accountLoginAuthenticatedQueryKey(id);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<AccountLoginAuthenticated["data"], AccountLoginAuthenticated["error"]>({
                method: "get",
                url: `/api/login/${id}`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @link /api/login/:id
 */
export function useAccountLoginAuthenticatedHook<TData = AccountLoginAuthenticated["response"], TQueryData = AccountLoginAuthenticated["response"], TQueryKey extends QueryKey = AccountLoginAuthenticatedQueryKey>(id: AccountLoginAuthenticatedPathParams["id"], headers?: AccountLoginAuthenticated["headerParams"], options: {
    query?: Partial<QueryObserverOptions<AccountLoginAuthenticated["response"], AccountLoginAuthenticated["error"], TData, TQueryData, TQueryKey>>;
    client?: AccountLoginAuthenticated["client"]["parameters"];
} = {}): UseQueryResult<TData, AccountLoginAuthenticated["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? accountLoginAuthenticatedQueryKey(id);
    const query = useQuery({
        ...accountLoginAuthenticatedQueryOptions(id, headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, AccountLoginAuthenticated["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const accountLoginAuthenticatedInfiniteQueryKey = (id: AccountLoginAuthenticatedPathParams["id"]) => [{ url: "/api/login/:id", params: { id: id } }] as const;
export type AccountLoginAuthenticatedInfiniteQueryKey = ReturnType<typeof accountLoginAuthenticatedInfiniteQueryKey>;
export function accountLoginAuthenticatedInfiniteQueryOptions(id: AccountLoginAuthenticatedPathParams["id"], headers?: AccountLoginAuthenticated["headerParams"], options: AccountLoginAuthenticated["client"]["parameters"] = {}) {
    const queryKey = accountLoginAuthenticatedInfiniteQueryKey(id);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<AccountLoginAuthenticated["data"], AccountLoginAuthenticated["error"]>({
                method: "get",
                url: `/api/login/${id}`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res.data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage: any, _allPages: any[], lastPageParam: number) => !lastPage?.meta.hasNextPage ? undefined : lastPageParam + 1,
        getPreviousPageParam: (_firstPage: any, _allPages: any[], firstPageParam: number) => firstPageParam <= 1 ? undefined : firstPageParam - 1
    });
}
/**
 * @link /api/login/:id
 */
export function useAccountLoginAuthenticatedHookInfinite<TData = InfiniteData<AccountLoginAuthenticated["response"]>, TQueryData = AccountLoginAuthenticated["response"], TQueryKey extends QueryKey = AccountLoginAuthenticatedInfiniteQueryKey>(id: AccountLoginAuthenticatedPathParams["id"], headers?: AccountLoginAuthenticated["headerParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<AccountLoginAuthenticated["response"], AccountLoginAuthenticated["error"], TData, TQueryData, TQueryKey>>;
    client?: AccountLoginAuthenticated["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, AccountLoginAuthenticated["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? accountLoginAuthenticatedInfiniteQueryKey(id);
    const query = useInfiniteQuery({
        ...accountLoginAuthenticatedInfiniteQueryOptions(id, headers, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, AccountLoginAuthenticated["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}