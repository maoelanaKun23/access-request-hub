import type { UserTokenResponseDto } from "./UserTokenResponseDto";
import type { UserRefreshTokenDto } from "./UserRefreshTokenDto";

 export type AccountRefreshTokenHeaderParams = {
    /**
     * @type string | undefined
    */
    Authorization?: string;
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
export type AccountRefreshToken200 = UserTokenResponseDto;
export type AccountRefreshTokenMutationRequest = UserRefreshTokenDto;
export type AccountRefreshTokenMutationResponse = UserTokenResponseDto;
export type AccountRefreshTokenMutation = {
    Response: AccountRefreshTokenMutationResponse;
    Request: AccountRefreshTokenMutationRequest;
    HeaderParams: AccountRefreshTokenHeaderParams;
};