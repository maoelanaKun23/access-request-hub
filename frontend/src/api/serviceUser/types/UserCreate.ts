import type { UserDto } from "./UserDto";

 export type UserCreateHeaderParams = {
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
export type UserCreate200 = UserDto;
/**
 * @description Model of user object.
*/
export type UserCreateMutationRequest = UserDto;
/**
 * @description Request successful.
*/
export type UserCreateMutationResponse = UserDto;
export type UserCreateMutation = {
    Response: UserCreateMutationResponse;
    Request: UserCreateMutationRequest;
    HeaderParams: UserCreateHeaderParams;
};