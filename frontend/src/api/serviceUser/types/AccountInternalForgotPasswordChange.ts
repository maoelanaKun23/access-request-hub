import type { UserForgotPasswordDto } from "./UserForgotPasswordDto";

 export type AccountInternalForgotPasswordChangeHeaderParams = {
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
export type AccountInternalForgotPasswordChange200 = Blob;
export type AccountInternalForgotPasswordChangeMutationRequest = UserForgotPasswordDto;
export type AccountInternalForgotPasswordChangeMutationResponse = Blob;
export type AccountInternalForgotPasswordChangeMutation = {
    Response: AccountInternalForgotPasswordChangeMutationResponse;
    Request: AccountInternalForgotPasswordChangeMutationRequest;
    HeaderParams: AccountInternalForgotPasswordChangeHeaderParams;
};