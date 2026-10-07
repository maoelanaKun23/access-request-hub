import client from "@/config/userInstance";
import { useMutation } from "@tanstack/react-query";
import type { AccountRefreshTokenMutationRequest, AccountRefreshTokenMutationResponse, AccountRefreshTokenHeaderParams } from "../../types/AccountRefreshToken";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AccountRefreshTokenClient = typeof client<AccountRefreshTokenMutationResponse, Error, AccountRefreshTokenMutationRequest>;
type AccountRefreshToken = {
    data: AccountRefreshTokenMutationResponse;
    error: Error;
    request: AccountRefreshTokenMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: AccountRefreshTokenHeaderParams;
    response: AccountRefreshTokenMutationResponse;
    client: {
        parameters: Partial<Parameters<AccountRefreshTokenClient>[0]>;
        return: Awaited<ReturnType<AccountRefreshTokenClient>>;
    };
};
/**
 * @link /api/refreshtoken
 */
export function useAccountRefreshTokenHook(options: {
    mutation?: UseMutationOptions<AccountRefreshToken["response"], AccountRefreshToken["error"], {
        headers?: AccountRefreshToken["headerParams"];
        data: AccountRefreshToken["request"];
    }>;
    client?: AccountRefreshToken["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ data, headers }) => {
            const res = await client<AccountRefreshToken["data"], AccountRefreshToken["error"], AccountRefreshToken["request"]>({
                method: "post",
                url: `/api/refreshtoken`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}