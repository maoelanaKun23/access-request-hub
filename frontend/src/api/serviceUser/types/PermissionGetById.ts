import type { PermissionListDto } from "./PermissionListDto";

 export type PermissionGetByIdPathParams = {
    /**
     * @description Code of permission
     * @type string
    */
    permissionCode: string;
    /**
     * @description Unique identifier of service
     * @type string, guid
    */
    serviceId: string;
};
export type PermissionGetByIdQueryParams = {
    /**
     * @description id of application to filter permissions.
     * @type string | undefined, guid
    */
    applicationId?: string;
};
export type PermissionGetByIdHeaderParams = {
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
export type PermissionGetById200 = PermissionListDto;
/**
 * @description Request successful.
*/
export type PermissionGetByIdQueryResponse = PermissionListDto;
export type PermissionGetByIdQuery = {
    Response: PermissionGetByIdQueryResponse;
    PathParams: PermissionGetByIdPathParams;
    QueryParams: PermissionGetByIdQueryParams;
    HeaderParams: PermissionGetByIdHeaderParams;
};