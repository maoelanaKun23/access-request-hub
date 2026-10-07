import type { UserTokenResponseDto } from "./UserTokenResponseDto";
import type { UserLoginByPinDto } from "./UserLoginByPinDto";

 export type AccountLoginByPinHeaderParams = {
    /**
     * @description Client ID
     * @type string | undefined
    */
    "client-id"?: string;
    /**
     * @description Client Secret
     * @type string | undefined
    */
    "client-secret"?: string;
};
export type AccountLoginByPin200 = UserTokenResponseDto;
export type AccountLoginByPinMutationRequest = UserLoginByPinDto;
export type AccountLoginByPinMutationResponse = UserTokenResponseDto;
export type AccountLoginByPinMutation = {
    Response: AccountLoginByPinMutationResponse;
    Request: AccountLoginByPinMutationRequest;
    HeaderParams: AccountLoginByPinHeaderParams;
};