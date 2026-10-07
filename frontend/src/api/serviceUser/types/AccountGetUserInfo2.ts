import type { UserInfoDto } from "./UserInfoDto";

 export type AccountGetUserInfo2QueryParams = {
    /**
     * @type string | undefined, guid
    */
    UserId?: string;
    /**
     * @type string | undefined
    */
    ClientId?: string;
};
export type AccountGetUserInfo2HeaderParams = {
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
export type AccountGetUserInfo2200 = UserInfoDto;
export type AccountGetUserInfo2MutationResponse = UserInfoDto;
export type AccountGetUserInfo2Mutation = {
    Response: AccountGetUserInfo2MutationResponse;
    QueryParams: AccountGetUserInfo2QueryParams;
    HeaderParams: AccountGetUserInfo2HeaderParams;
};