import type { UserListSorting } from "./UserListSorting";
import type { UserApprovedStatus } from "./UserApprovedStatus";
import type { PaginatedListOfUserDto } from "./PaginatedListOfUserDto";

 export type UserGetQueryParams = {
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
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
    sorting?: UserListSorting;
    /**
     * @type integer | undefined
    */
    approvedStatus?: UserApprovedStatus;
    /**
     * @default ""
     * @type string | undefined
    */
    customerCode?: string;
    /**
     * @default false
     * @type boolean | undefined
    */
    duplicateRole?: boolean;
    /**
     * @default false
     * @type boolean | undefined
    */
    exact?: boolean;
};
export type UserGetHeaderParams = {
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
export type UserGet200 = PaginatedListOfUserDto;
export type UserGetQueryResponse = PaginatedListOfUserDto;
export type UserGetQuery = {
    Response: UserGetQueryResponse;
    QueryParams: UserGetQueryParams;
    HeaderParams: UserGetHeaderParams;
};