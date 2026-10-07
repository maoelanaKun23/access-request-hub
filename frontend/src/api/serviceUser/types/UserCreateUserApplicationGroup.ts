import type { UserApplicationGroupDto } from "./UserApplicationGroupDto";

 export type UserCreateUserApplicationGroupHeaderParams = {
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
export type UserCreateUserApplicationGroup200 = string;
export type UserCreateUserApplicationGroup400 = string;
export type UserCreateUserApplicationGroupMutationRequest = UserApplicationGroupDto[];
export type UserCreateUserApplicationGroupMutationResponse = string;
export type UserCreateUserApplicationGroupMutation = {
    Response: UserCreateUserApplicationGroupMutationResponse;
    Request: UserCreateUserApplicationGroupMutationRequest;
    HeaderParams: UserCreateUserApplicationGroupHeaderParams;
    Errors: UserCreateUserApplicationGroup400;
};