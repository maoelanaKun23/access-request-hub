import type { UserInfoAddDto } from "./UserInfoAddDto";

 export type UserCreateUserInfoHeaderParams = {
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
export type UserCreateUserInfo200 = Blob;
export type UserCreateUserInfoMutationRequest = UserInfoAddDto;
export type UserCreateUserInfoMutationResponse = Blob;
export type UserCreateUserInfoMutation = {
    Response: UserCreateUserInfoMutationResponse;
    Request: UserCreateUserInfoMutationRequest;
    HeaderParams: UserCreateUserInfoHeaderParams;
};