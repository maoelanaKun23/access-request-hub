import type { RoleDto } from "./RoleDto";

 export type RoleCreateHeaderParams = {
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
export type RoleCreate200 = RoleDto;
/**
 * @description Model of role object.
*/
export type RoleCreateMutationRequest = RoleDto;
/**
 * @description Request successful.
*/
export type RoleCreateMutationResponse = RoleDto;
export type RoleCreateMutation = {
    Response: RoleCreateMutationResponse;
    Request: RoleCreateMutationRequest;
    HeaderParams: RoleCreateHeaderParams;
};