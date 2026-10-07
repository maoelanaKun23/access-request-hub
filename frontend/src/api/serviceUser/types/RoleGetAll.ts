import type { RoleListSorting } from "./RoleListSorting";
import type { RoleStatus } from "./RoleStatus";
import type { RoleDto } from "./RoleDto";

 export type RoleGetAllPathParams = {
    /**
     * @description Id of application which filter the list by application.
     * @type string, guid
    */
    applicationId: string;
};
export type RoleGetAllQueryParams = {
    /**
     * @description Id of user.
     * @type string | undefined, guid
    */
    userId?: string;
    /**
     * @default ""
     * @type string | undefined
    */
    keyword?: string;
    /**
     * @default 1
     * @type integer | undefined, int32
    */
    page?: number;
    /**
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
     * @description Customercode of customer.
     * @default ""
     * @type string | undefined
    */
    customerCode?: string;
    /**
     * @default false
     * @type boolean | undefined
    */
    hasAttribute?: boolean;
};
export type RoleGetAllHeaderParams = {
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
export type RoleGetAll200 = RoleDto[];
/**
 * @description Request successful.
*/
export type RoleGetAllQueryResponse = RoleDto[];
export type RoleGetAllQuery = {
    Response: RoleGetAllQueryResponse;
    PathParams: RoleGetAllPathParams;
    QueryParams: RoleGetAllQueryParams;
    HeaderParams: RoleGetAllHeaderParams;
};