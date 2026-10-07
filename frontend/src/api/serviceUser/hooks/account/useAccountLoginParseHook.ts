import client from "@/config/userInstance";
import { useMutation } from "@tanstack/react-query";
import type { AccountLoginParseMutationRequest, AccountLoginParseMutationResponse, AccountLoginParseHeaderParams } from "../../types/AccountLoginParse";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AccountLoginParseClient = typeof client<AccountLoginParseMutationResponse, Error, AccountLoginParseMutationRequest>;
type AccountLoginParse = {
    data: AccountLoginParseMutationResponse;
    error: Error;
    request: AccountLoginParseMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: AccountLoginParseHeaderParams;
    response: AccountLoginParseMutationResponse;
    client: {
        parameters: Partial<Parameters<AccountLoginParseClient>[0]>;
        return: Awaited<ReturnType<AccountLoginParseClient>>;
    };
};
/**
 * @link /api/login/parse
 */
export function useAccountLoginParseHook(options: {
    mutation?: UseMutationOptions<AccountLoginParse["response"], AccountLoginParse["error"], {
        headers?: AccountLoginParse["headerParams"];
        data: AccountLoginParse["request"];
    }>;
    client?: AccountLoginParse["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ data, headers }) => {
            const res = await client<AccountLoginParse["data"], AccountLoginParse["error"], AccountLoginParse["request"]>({
                method: "post",
                url: `/api/login/parse`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}