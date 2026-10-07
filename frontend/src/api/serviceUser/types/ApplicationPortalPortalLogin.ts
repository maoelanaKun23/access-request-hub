import type { UserInfoTokenDto } from "./UserInfoTokenDto";
import type { UserLoginDto } from "./UserLoginDto";

 export type ApplicationPortalPortalLoginHeaderParams = {
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
export type ApplicationPortalPortalLogin200 = UserInfoTokenDto;
/**
 * @description Model of user login object.
*/
export type ApplicationPortalPortalLoginMutationRequest = UserLoginDto;
/**
 * @description Request successful.
*/
export type ApplicationPortalPortalLoginMutationResponse = UserInfoTokenDto;
export type ApplicationPortalPortalLoginMutation = {
    Response: ApplicationPortalPortalLoginMutationResponse;
    Request: ApplicationPortalPortalLoginMutationRequest;
    HeaderParams: ApplicationPortalPortalLoginHeaderParams;
};