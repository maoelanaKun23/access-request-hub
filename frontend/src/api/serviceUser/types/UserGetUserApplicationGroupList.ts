import type { PaginatedListOfUserApplicationDashboardDto } from "./PaginatedListOfUserApplicationDashboardDto";

 export type UserGetUserApplicationGroupListQueryParams = {
    /**
     * @default 1
     * @type integer | undefined, int32
    */
    page?: number;
    /**
     * @default 7
     * @type integer | undefined, int32
    */
    pageSize?: number;
};
export type UserGetUserApplicationGroupListHeaderParams = {
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
export type UserGetUserApplicationGroupList200 = PaginatedListOfUserApplicationDashboardDto;
export type UserGetUserApplicationGroupListQueryResponse = PaginatedListOfUserApplicationDashboardDto;
export type UserGetUserApplicationGroupListQuery = {
    Response: UserGetUserApplicationGroupListQueryResponse;
    QueryParams: UserGetUserApplicationGroupListQueryParams;
    HeaderParams: UserGetUserApplicationGroupListHeaderParams;
};