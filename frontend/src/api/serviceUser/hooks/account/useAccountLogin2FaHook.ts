import client from "@/config/userInstance";
import { useMutation } from "@tanstack/react-query";
import type { AccountLogin2FaMutationRequest, AccountLogin2FaMutationResponse, AccountLogin2FaHeaderParams } from "../../types/AccountLogin2Fa";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AccountLogin2FaClient = typeof client<AccountLogin2FaMutationResponse, Error, AccountLogin2FaMutationRequest>;
type AccountLogin2Fa = {
    data: AccountLogin2FaMutationResponse;
    error: Error;
    request: AccountLogin2FaMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: AccountLogin2FaHeaderParams;
    response: AccountLogin2FaMutationResponse;
    client: {
        parameters: Partial<Parameters<AccountLogin2FaClient>[0]>;
        return: Awaited<ReturnType<AccountLogin2FaClient>>;
    };
};
/**
 * @link /api/login/mfa
 */
export function useAccountLogin2FaHook(options: {
    mutation?: UseMutationOptions<AccountLogin2Fa["response"], AccountLogin2Fa["error"], {
        headers?: AccountLogin2Fa["headerParams"];
        data: AccountLogin2Fa["request"];
    }>;
    client?: AccountLogin2Fa["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ data, headers }) => {
            const res = await client<AccountLogin2Fa["data"], AccountLogin2Fa["error"], AccountLogin2Fa["request"]>({
                method: "post",
                url: `/api/login/mfa`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}