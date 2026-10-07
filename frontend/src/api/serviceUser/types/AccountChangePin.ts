import type { UserTokenResponseDto } from "./UserTokenResponseDto";
import type { ChangePinDto } from "./ChangePinDto";

 export type AccountChangePinHeaderParams = {
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
export type AccountChangePin200 = UserTokenResponseDto;
export type AccountChangePinMutationRequest = ChangePinDto;
export type AccountChangePinMutationResponse = UserTokenResponseDto;
export type AccountChangePinMutation = {
    Response: AccountChangePinMutationResponse;
    Request: AccountChangePinMutationRequest;
    HeaderParams: AccountChangePinHeaderParams;
};