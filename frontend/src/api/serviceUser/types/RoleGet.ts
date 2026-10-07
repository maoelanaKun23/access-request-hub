import type { RoleListSorting } from "./RoleListSorting";
import type { RoleStatus } from "./RoleStatus";
import type { PaginatedListOfRoleDto } from "./PaginatedListOfRoleDto";

 export type RoleGetQueryParams = {
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
    /**
     * @description Customercode of the customer.
     * @default ""
     * @type string | undefined
    */
    customerCode?: string;
    /**
     * @description Show roles that have attributes.
     * @default false
     * @type boolean | undefined
    */
    hasAttribute?: boolean;
};
export type RoleGetHeaderParams = {
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
export type RoleGet200 = PaginatedListOfRoleDto;
/**
 * @description Request successful.
*/
export type RoleGetQueryResponse = PaginatedListOfRoleDto;
export type RoleGetQuery = {
    Response: RoleGetQueryResponse;
    QueryParams: RoleGetQueryParams;
    HeaderParams: RoleGetHeaderParams;
};