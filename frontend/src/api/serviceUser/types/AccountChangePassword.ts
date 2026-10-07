import type { UserChangePasswordDto } from "./UserChangePasswordDto";

 export type AccountChangePasswordHeaderParams = {
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
export type AccountChangePassword200 = Blob;
/**
 * @description Model of user change object.
*/
export type AccountChangePasswordMutationRequest = UserChangePasswordDto;
/**
 * @description Request successful.
*/
export type AccountChangePasswordMutationResponse = Blob;
export type AccountChangePasswordMutation = {
    Response: AccountChangePasswordMutationResponse;
    Request: AccountChangePasswordMutationRequest;
    HeaderParams: AccountChangePasswordHeaderParams;
};