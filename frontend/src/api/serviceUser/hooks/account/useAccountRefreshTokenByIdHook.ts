import client from "@/config/userInstance";
import { useMutation } from "@tanstack/react-query";
import type { AccountRefreshTokenByIdMutationRequest, AccountRefreshTokenByIdMutationResponse, AccountRefreshTokenByIdPathParams, AccountRefreshTokenByIdHeaderParams } from "../../types/AccountRefreshTokenById";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AccountRefreshTokenByIdClient = typeof client<AccountRefreshTokenByIdMutationResponse, Error, AccountRefreshTokenByIdMutationRequest>;
type AccountRefreshTokenById = {
    data: AccountRefreshTokenByIdMutationResponse;
    error: Error;
    request: AccountRefreshTokenByIdMutationRequest;
    pathParams: AccountRefreshTokenByIdPathParams;
    queryParams: never;
    headerParams: AccountRefreshTokenByIdHeaderParams;
    response: AccountRefreshTokenByIdMutationResponse;
    client: {
        parameters: Partial<Parameters<AccountRefreshTokenByIdClient>[0]>;
        return: Awaited<ReturnType<AccountRefreshTokenByIdClient>>;
    };
};
/**
 * @summary Refresh Token For application portal
 * @link /api/refreshtoken/:id
 */
export function useAccountRefreshTokenByIdHook(options: {
    mutation?: UseMutationOptions<AccountRefreshTokenById["response"], AccountRefreshTokenById["error"], {
        id: AccountRefreshTokenByIdPathParams["id"];
        headers?: AccountRefreshTokenById["headerParams"];
        data: AccountRefreshTokenById["request"];
    }>;
    client?: AccountRefreshTokenById["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ id, data, headers }) => {
            const res = await client<AccountRefreshTokenById["data"], AccountRefreshTokenById["error"], AccountRefreshTokenById["request"]>({
                method: "post",
                url: `/api/refreshtoken/${id}`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}