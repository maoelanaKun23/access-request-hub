import type { GroupListSorting } from "./GroupListSorting";
import type { PaginatedListOfGroupDto } from "./PaginatedListOfGroupDto";

 export type GroupGetQueryParams = {
    /**
     * @description Id of application which filter the list by application.
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
    sorting?: GroupListSorting;
};
export type GroupGetHeaderParams = {
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
export type GroupGet200 = PaginatedListOfGroupDto;
/**
 * @description Request successful.
*/
export type GroupGetQueryResponse = PaginatedListOfGroupDto;
export type GroupGetQuery = {
    Response: GroupGetQueryResponse;
    QueryParams: GroupGetQueryParams;
    HeaderParams: GroupGetHeaderParams;
};