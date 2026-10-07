import client from "@/config/userInstance";
import { useMutation } from "@tanstack/react-query";
import type { AccountLoginByPinMutationRequest, AccountLoginByPinMutationResponse, AccountLoginByPinHeaderParams } from "../../types/AccountLoginByPin";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AccountLoginByPinClient = typeof client<AccountLoginByPinMutationResponse, Error, AccountLoginByPinMutationRequest>;
type AccountLoginByPin = {
    data: AccountLoginByPinMutationResponse;
    error: Error;
    request: AccountLoginByPinMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: AccountLoginByPinHeaderParams;
    response: AccountLoginByPinMutationResponse;
    client: {
        parameters: Partial<Parameters<AccountLoginByPinClient>[0]>;
        return: Awaited<ReturnType<AccountLoginByPinClient>>;
    };
};
/**
 * @link /api/login/pin
 */
export function useAccountLoginByPinHook(options: {
    mutation?: UseMutationOptions<AccountLoginByPin["response"], AccountLoginByPin["error"], {
        headers?: AccountLoginByPin["headerParams"];
        data: AccountLoginByPin["request"];
    }>;
    client?: AccountLoginByPin["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ data, headers }) => {
            const res = await client<AccountLoginByPin["data"], AccountLoginByPin["error"], AccountLoginByPin["request"]>({
                method: "post",
                url: `/api/login/pin`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}