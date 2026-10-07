import type { UserListSorting } from "./UserListSorting";
import type { UserApprovedStatus } from "./UserApprovedStatus";
import type { PaginatedListOfUserDto } from "./PaginatedListOfUserDto";

 export type CustomerUserGetQueryParams = {
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
    sorting?: UserListSorting;
    /**
     * @type integer | undefined
    */
    approvedStatus?: UserApprovedStatus;
    /**
     * @description The status of user application.
     * @default false
     * @type boolean | undefined
    */
    duplicateRole?: boolean;
};
export type CustomerUserGetHeaderParams = {
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
export type CustomerUserGet200 = PaginatedListOfUserDto;
/**
 * @description Request successful.
*/
export type CustomerUserGetQueryResponse = PaginatedListOfUserDto;
export type CustomerUserGetQuery = {
    Response: CustomerUserGetQueryResponse;
    QueryParams: CustomerUserGetQueryParams;
    HeaderParams: CustomerUserGetHeaderParams;
};