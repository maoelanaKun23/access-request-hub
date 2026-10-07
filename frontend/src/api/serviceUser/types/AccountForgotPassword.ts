import type { UserForgotPasswordDto } from "./UserForgotPasswordDto";

 export type AccountForgotPasswordHeaderParams = {
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
/**
 * @description Request successful.
*/
export type AccountForgotPassword200 = Blob;
/**
 * @description Model of user forgot object.
*/
export type AccountForgotPasswordMutationRequest = UserForgotPasswordDto;
/**
 * @description Request successful.
*/
export type AccountForgotPasswordMutationResponse = Blob;
export type AccountForgotPasswordMutation = {
    Response: AccountForgotPasswordMutationResponse;
    Request: AccountForgotPasswordMutationRequest;
    HeaderParams: AccountForgotPasswordHeaderParams;
};