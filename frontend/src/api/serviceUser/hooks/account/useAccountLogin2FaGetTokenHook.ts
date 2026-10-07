import client from "@/config/userInstance";
import { useMutation } from "@tanstack/react-query";
import type { AccountLogin2FaGetTokenMutationRequest, AccountLogin2FaGetTokenMutationResponse, AccountLogin2FaGetTokenHeaderParams } from "../../types/AccountLogin2FaGetToken";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AccountLogin2FaGetTokenClient = typeof client<AccountLogin2FaGetTokenMutationResponse, Error, AccountLogin2FaGetTokenMutationRequest>;
type AccountLogin2FaGetToken = {
    data: AccountLogin2FaGetTokenMutationResponse;
    error: Error;
    request: AccountLogin2FaGetTokenMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: AccountLogin2FaGetTokenHeaderParams;
    response: AccountLogin2FaGetTokenMutationResponse;
    client: {
        parameters: Partial<Parameters<AccountLogin2FaGetTokenClient>[0]>;
        return: Awaited<ReturnType<AccountLogin2FaGetTokenClient>>;
    };
};
/**
 * @link /api/login/mfagettoken
 */
export function useAccountLogin2FaGetTokenHook(options: {
    mutation?: UseMutationOptions<AccountLogin2FaGetToken["response"], AccountLogin2FaGetToken["error"], {
        headers?: AccountLogin2FaGetToken["headerParams"];
        data: AccountLogin2FaGetToken["request"];
    }>;
    client?: AccountLogin2FaGetToken["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ data, headers }) => {
            const res = await client<AccountLogin2FaGetToken["data"], AccountLogin2FaGetToken["error"], AccountLogin2FaGetToken["request"]>({
                method: "post",
                url: `/api/login/mfagettoken`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}