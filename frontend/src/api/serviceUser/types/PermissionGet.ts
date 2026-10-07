import type { PermissionListSorting } from "./PermissionListSorting";
import type { PaginatedListOfPermissionListDto } from "./PaginatedListOfPermissionListDto";

 export type PermissionGetQueryParams = {
    /**
     * @description id of application to filter permissions.
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @description The keyword which filter the list.
     * @default ""
     * @type string | undefined
    */
    keyword?: string;
    /**
     * @description The page number to be opened (default to 1).
     * @default 1
     * @type integer | undefined, int32
    */
    page?: number;
    /**
     * @description number of item in one page
     * @default 10
     * @type integer | undefined, int32
    */
    pageSize?: number;
    /**
     * @type integer | undefined
    */
    sorting?: PermissionListSorting;
};
export type PermissionGetHeaderParams = {
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
export type PermissionGet200 = PaginatedListOfPermissionListDto;
/**
 * @description Request successful.
*/
export type PermissionGetQueryResponse = PaginatedListOfPermissionListDto;
export type PermissionGetQuery = {
    Response: PermissionGetQueryResponse;
    QueryParams: PermissionGetQueryParams;
    HeaderParams: PermissionGetHeaderParams;
};