import type { PermissionDto } from "./PermissionDto";

 export type PermissionGetAllQueryParams = {
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
};
export type PermissionGetAllHeaderParams = {
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
export type PermissionGetAll200 = PermissionDto[];
/**
 * @description Request successful.
*/
export type PermissionGetAllQueryResponse = PermissionDto[];
export type PermissionGetAllQuery = {
    Response: PermissionGetAllQueryResponse;
    QueryParams: PermissionGetAllQueryParams;
    HeaderParams: PermissionGetAllHeaderParams;
};