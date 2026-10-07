import type { RoleDto } from "./RoleDto";

 export type RoleUpdatePathParams = {
    /**
     * @description Id of role object.
     * @type string, guid
    */
    id: string;
};
export type RoleUpdateHeaderParams = {
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
export type RoleUpdate200 = RoleDto;
/**
 * @description Model of role object.
*/
export type RoleUpdateMutationRequest = RoleDto;
/**
 * @description Request successful.
*/
export type RoleUpdateMutationResponse = RoleDto;
export type RoleUpdateMutation = {
    Response: RoleUpdateMutationResponse;
    Request: RoleUpdateMutationRequest;
    PathParams: RoleUpdatePathParams;
    HeaderParams: RoleUpdateHeaderParams;
};