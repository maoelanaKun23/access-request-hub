import type { UserInfoDto } from "./UserInfoDto";

 export type AccountGetUserInfo1QueryParams = {
    /**
     * @type string | undefined, guid
    */
    UserId?: string;
    /**
     * @type string | undefined
    */
    ClientId?: string;
};
export type AccountGetUserInfo1HeaderParams = {
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
export type AccountGetUserInfo1200 = UserInfoDto;
export type AccountGetUserInfo1QueryResponse = UserInfoDto;
export type AccountGetUserInfo1Query = {
    Response: AccountGetUserInfo1QueryResponse;
    QueryParams: AccountGetUserInfo1QueryParams;
    HeaderParams: AccountGetUserInfo1HeaderParams;
};