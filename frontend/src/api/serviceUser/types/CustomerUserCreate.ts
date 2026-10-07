import type { UserDto } from "./UserDto";

 export type CustomerUserCreateHeaderParams = {
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
export type CustomerUserCreate200 = UserDto;
/**
 * @description Model of user object.
*/
export type CustomerUserCreateMutationRequest = UserDto;
/**
 * @description Request successful.
*/
export type CustomerUserCreateMutationResponse = UserDto;
export type CustomerUserCreateMutation = {
    Response: CustomerUserCreateMutationResponse;
    Request: CustomerUserCreateMutationRequest;
    HeaderParams: CustomerUserCreateHeaderParams;
};