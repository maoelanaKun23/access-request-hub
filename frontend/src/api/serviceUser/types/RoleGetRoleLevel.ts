import type { RoleDto } from "./RoleDto";

 export type RoleGetRoleLevelQueryParams = {
    /**
     * @description Id of application which filter the list by application.
     * @type string | undefined, guid
    */
    applicationId?: string;
};
export type RoleGetRoleLevelHeaderParams = {
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
export type RoleGetRoleLevel200 = RoleDto[];
/**
 * @description Request successful.
*/
export type RoleGetRoleLevelQueryResponse = RoleDto[];
export type RoleGetRoleLevelQuery = {
    Response: RoleGetRoleLevelQueryResponse;
    QueryParams: RoleGetRoleLevelQueryParams;
    HeaderParams: RoleGetRoleLevelHeaderParams;
};