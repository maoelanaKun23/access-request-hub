import type { UserDto } from "./UserDto";

 export type UserUpdatePathParams = {
    /**
     * @description Id of user object.
     * @type string, guid
    */
    id: string;
};
export type UserUpdateHeaderParams = {
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
export type UserUpdate200 = UserDto;
/**
 * @description Model of user object.
*/
export type UserUpdateMutationRequest = UserDto;
/**
 * @description Request successful.
*/
export type UserUpdateMutationResponse = UserDto;
export type UserUpdateMutation = {
    Response: UserUpdateMutationResponse;
    Request: UserUpdateMutationRequest;
    PathParams: UserUpdatePathParams;
    HeaderParams: UserUpdateHeaderParams;
};