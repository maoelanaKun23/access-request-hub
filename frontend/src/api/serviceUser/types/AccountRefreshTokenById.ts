import type { UserTokenResponseDto } from "./UserTokenResponseDto";
import type { UserRefreshTokenDto } from "./UserRefreshTokenDto";

 export type AccountRefreshTokenByIdPathParams = {
    /**
     * @description client id
     * @type string
    */
    id: string;
};
export type AccountRefreshTokenByIdHeaderParams = {
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
export type AccountRefreshTokenById200 = UserTokenResponseDto;
/**
 * @description Model of user refresh object.
*/
export type AccountRefreshTokenByIdMutationRequest = UserRefreshTokenDto;
/**
 * @description Request successful.
*/
export type AccountRefreshTokenByIdMutationResponse = UserTokenResponseDto;
export type AccountRefreshTokenByIdMutation = {
    Response: AccountRefreshTokenByIdMutationResponse;
    Request: AccountRefreshTokenByIdMutationRequest;
    PathParams: AccountRefreshTokenByIdPathParams;
    HeaderParams: AccountRefreshTokenByIdHeaderParams;
};