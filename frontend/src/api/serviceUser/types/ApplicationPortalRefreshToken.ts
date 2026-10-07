import type { UserTokenResponseDto } from "./UserTokenResponseDto";
import type { UserRefreshTokenDto } from "./UserRefreshTokenDto";

 export type ApplicationPortalRefreshTokenHeaderParams = {
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
export type ApplicationPortalRefreshToken200 = UserTokenResponseDto;
/**
 * @description Model of user refresh object.
*/
export type ApplicationPortalRefreshTokenMutationRequest = UserRefreshTokenDto;
/**
 * @description Request successful.
*/
export type ApplicationPortalRefreshTokenMutationResponse = UserTokenResponseDto;
export type ApplicationPortalRefreshTokenMutation = {
    Response: ApplicationPortalRefreshTokenMutationResponse;
    Request: ApplicationPortalRefreshTokenMutationRequest;
    HeaderParams: ApplicationPortalRefreshTokenHeaderParams;
};