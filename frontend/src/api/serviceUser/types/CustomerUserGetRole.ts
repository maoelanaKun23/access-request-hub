import type { RoleListSorting } from "./RoleListSorting";
import type { RoleStatus } from "./RoleStatus";
import type { PaginatedListOfRoleDto } from "./PaginatedListOfRoleDto";

 export type CustomerUserGetRoleQueryParams = {
    /**
     * @description Id of application which filter the list by application.
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @type string | undefined, guid
    */
    userId?: string;
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
    sorting?: RoleListSorting;
    /**
     * @type integer | undefined
    */
    roleStatus?: RoleStatus;
};
export type CustomerUserGetRoleHeaderParams = {
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
export type CustomerUserGetRole200 = PaginatedListOfRoleDto;
/**
 * @description Request successful.
*/
export type CustomerUserGetRoleQueryResponse = PaginatedListOfRoleDto;
export type CustomerUserGetRoleQuery = {
    Response: CustomerUserGetRoleQueryResponse;
    QueryParams: CustomerUserGetRoleQueryParams;
    HeaderParams: CustomerUserGetRoleHeaderParams;
};