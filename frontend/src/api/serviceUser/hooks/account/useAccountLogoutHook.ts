import client from "@/config/userInstance";
import { useMutation } from "@tanstack/react-query";
import type { AccountLogoutMutationRequest, AccountLogoutMutationResponse, AccountLogoutHeaderParams } from "../../types/AccountLogout";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AccountLogoutClient = typeof client<AccountLogoutMutationResponse, Error, AccountLogoutMutationRequest>;
type AccountLogout = {
    data: AccountLogoutMutationResponse;
    error: Error;
    request: AccountLogoutMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: AccountLogoutHeaderParams;
    response: AccountLogoutMutationResponse;
    client: {
        parameters: Partial<Parameters<AccountLogoutClient>[0]>;
        return: Awaited<ReturnType<AccountLogoutClient>>;
    };
};
/**
 * @link /api/logout
 */
export function useAccountLogoutHook(options: {
    mutation?: UseMutationOptions<AccountLogout["response"], AccountLogout["error"], {
        headers?: AccountLogout["headerParams"];
        data: AccountLogout["request"];
    }>;
    client?: AccountLogout["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ data, headers }) => {
            const res = await client<AccountLogout["data"], AccountLogout["error"], AccountLogout["request"]>({
                method: "post",
                url: `/api/logout`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}