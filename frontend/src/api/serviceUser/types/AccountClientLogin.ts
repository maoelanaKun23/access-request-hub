import type { UserInfoTokenDto } from "./UserInfoTokenDto";

 export type AccountClientLoginHeaderParams = {
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
export type AccountClientLogin200 = UserInfoTokenDto;
/**
 * @description Request successful.
*/
export type AccountClientLoginMutationResponse = UserInfoTokenDto;
export type AccountClientLoginMutation = {
    Response: AccountClientLoginMutationResponse;
    HeaderParams: AccountClientLoginHeaderParams;
};