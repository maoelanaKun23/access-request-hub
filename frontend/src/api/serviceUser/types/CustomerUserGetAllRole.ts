import type { RoleStatus } from "./RoleStatus";
import type { RoleDto } from "./RoleDto";

 export type CustomerUserGetAllRolePathParams = {
    /**
     * @description Id of application which filter the list by application.
     * @type string, guid
    */
    applicationId: string;
};
export type CustomerUserGetAllRoleQueryParams = {
    /**
     * @type string | undefined, guid
    */
    userId?: string;
    /**
     * @type integer | undefined
    */
    roleStatus?: RoleStatus;
};
export type CustomerUserGetAllRoleHeaderParams = {
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
export type CustomerUserGetAllRole200 = RoleDto[];
/**
 * @description Request successful.
*/
export type CustomerUserGetAllRoleQueryResponse = RoleDto[];
export type CustomerUserGetAllRoleQuery = {
    Response: CustomerUserGetAllRoleQueryResponse;
    PathParams: CustomerUserGetAllRolePathParams;
    QueryParams: CustomerUserGetAllRoleQueryParams;
    HeaderParams: CustomerUserGetAllRoleHeaderParams;
};