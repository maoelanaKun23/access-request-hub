import type { RoleListSorting } from "./RoleListSorting";
import type { RoleStatus } from "./RoleStatus";
import type { PaginatedListOfCheckListedRole } from "./PaginatedListOfCheckListedRole";

 export type CustomerUserGetChecklistedRoleQueryParams = {
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
export type CustomerUserGetChecklistedRoleHeaderParams = {
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
export type CustomerUserGetChecklistedRole200 = PaginatedListOfCheckListedRole;
/**
 * @description Request successful.
*/
export type CustomerUserGetChecklistedRoleQueryResponse = PaginatedListOfCheckListedRole;
export type CustomerUserGetChecklistedRoleQuery = {
    Response: CustomerUserGetChecklistedRoleQueryResponse;
    QueryParams: CustomerUserGetChecklistedRoleQueryParams;
    HeaderParams: CustomerUserGetChecklistedRoleHeaderParams;
};