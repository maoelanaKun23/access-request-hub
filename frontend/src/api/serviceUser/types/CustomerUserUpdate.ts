import type { UserDto } from "./UserDto";

 export type CustomerUserUpdatePathParams = {
    /**
     * @description Id of user object.
     * @type string, guid
    */
    id: string;
};
export type CustomerUserUpdateHeaderParams = {
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
export type CustomerUserUpdate200 = UserDto;
/**
 * @description Model of user object.
*/
export type CustomerUserUpdateMutationRequest = UserDto;
/**
 * @description Request successful.
*/
export type CustomerUserUpdateMutationResponse = UserDto;
export type CustomerUserUpdateMutation = {
    Response: CustomerUserUpdateMutationResponse;
    Request: CustomerUserUpdateMutationRequest;
    PathParams: CustomerUserUpdatePathParams;
    HeaderParams: CustomerUserUpdateHeaderParams;
};