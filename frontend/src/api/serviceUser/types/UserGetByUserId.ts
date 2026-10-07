import type { UserDto } from "./UserDto";

 export type UserGetByUserIdHeaderParams = {
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
export type UserGetByUserId200 = UserDto;
export type UserGetByUserIdMutationRequest = string[];
export type UserGetByUserIdMutationResponse = UserDto;
export type UserGetByUserIdMutation = {
    Response: UserGetByUserIdMutationResponse;
    Request: UserGetByUserIdMutationRequest;
    HeaderParams: UserGetByUserIdHeaderParams;
};