import type { UserTokenResponseDto } from "./UserTokenResponseDto";
import type { UserLoginByPinDto } from "./UserLoginByPinDto";

 export type AccountRegisterPinHeaderParams = {
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
export type AccountRegisterPin200 = UserTokenResponseDto;
export type AccountRegisterPinMutationRequest = UserLoginByPinDto;
export type AccountRegisterPinMutationResponse = UserTokenResponseDto;
export type AccountRegisterPinMutation = {
    Response: AccountRegisterPinMutationResponse;
    Request: AccountRegisterPinMutationRequest;
    HeaderParams: AccountRegisterPinHeaderParams;
};