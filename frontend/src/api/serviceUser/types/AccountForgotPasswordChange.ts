import type { UserForgotPasswordDto } from "./UserForgotPasswordDto";

 export type AccountForgotPasswordChangeHeaderParams = {
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
export type AccountForgotPasswordChange200 = Blob;
/**
 * @description Model of user forgot object.
*/
export type AccountForgotPasswordChangeMutationRequest = UserForgotPasswordDto;
/**
 * @description Request successful.
*/
export type AccountForgotPasswordChangeMutationResponse = Blob;
export type AccountForgotPasswordChangeMutation = {
    Response: AccountForgotPasswordChangeMutationResponse;
    Request: AccountForgotPasswordChangeMutationRequest;
    HeaderParams: AccountForgotPasswordChangeHeaderParams;
};