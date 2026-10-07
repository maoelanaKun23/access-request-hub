import type { UserForgotPasswordDto } from "./UserForgotPasswordDto";

 export type AccountValidateForgotTokenHeaderParams = {
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
export type AccountValidateForgotToken200 = Blob;
/**
 * @description Model of user forgot object.
*/
export type AccountValidateForgotTokenMutationRequest = UserForgotPasswordDto;
/**
 * @description Request successful.
*/
export type AccountValidateForgotTokenMutationResponse = Blob;
export type AccountValidateForgotTokenMutation = {
    Response: AccountValidateForgotTokenMutationResponse;
    Request: AccountValidateForgotTokenMutationRequest;
    HeaderParams: AccountValidateForgotTokenHeaderParams;
};