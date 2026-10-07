import type { UserInfoTokenDto } from "./UserInfoTokenDto";
import type { UserLogoutDto } from "./UserLogoutDto";

 export type AccountLogoutHeaderParams = {
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
export type AccountLogout200 = UserInfoTokenDto;
export type AccountLogoutMutationRequest = UserLogoutDto;
export type AccountLogoutMutationResponse = UserInfoTokenDto;
export type AccountLogoutMutation = {
    Response: AccountLogoutMutationResponse;
    Request: AccountLogoutMutationRequest;
    HeaderParams: AccountLogoutHeaderParams;
};