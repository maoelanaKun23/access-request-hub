import type { UserInfoUpdateDto } from "./UserInfoUpdateDto";

 export type UserUpdateUserInfoHeaderParams = {
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
export type UserUpdateUserInfo200 = Blob;
export type UserUpdateUserInfoMutationRequest = UserInfoUpdateDto;
export type UserUpdateUserInfoMutationResponse = Blob;
export type UserUpdateUserInfoMutation = {
    Response: UserUpdateUserInfoMutationResponse;
    Request: UserUpdateUserInfoMutationRequest;
    HeaderParams: UserUpdateUserInfoHeaderParams;
};