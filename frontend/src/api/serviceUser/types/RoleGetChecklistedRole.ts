import type { RoleListSorting } from "./RoleListSorting";
import type { RoleStatus } from "./RoleStatus";
import type { PaginatedListOfCheckListedRole } from "./PaginatedListOfCheckListedRole";

 export type RoleGetChecklistedRoleQueryParams = {
    /**
     * @description Id of application which filter the list by application.
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @description Id of user application which filter the list by application.
     * @type string | undefined, guid
    */
    userApplicationId?: string;
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
export type RoleGetChecklistedRoleHeaderParams = {
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
export type RoleGetChecklistedRole200 = PaginatedListOfCheckListedRole;
/**
 * @description Request successful.
*/
export type RoleGetChecklistedRoleQueryResponse = PaginatedListOfCheckListedRole;
export type RoleGetChecklistedRoleQuery = {
    Response: RoleGetChecklistedRoleQueryResponse;
    QueryParams: RoleGetChecklistedRoleQueryParams;
    HeaderParams: RoleGetChecklistedRoleHeaderParams;
};