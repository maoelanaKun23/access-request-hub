import type { PaginatedListOfMonitoringUsersDto } from "./PaginatedListOfMonitoringUsersDto";

 export type MonitoringUserGetMonitoringUserInListQueryParams = {
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @type boolean
    */
    status?: boolean | null;
    /**
     * @type string, date-time
    */
    startDate?: string | null;
    /**
     * @type string, date-time
    */
    endDate?: string | null;
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
};
export type MonitoringUserGetMonitoringUserInListHeaderParams = {
    /**
     * @type string | undefined
    */
    Auhtorization?: string;
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
export type MonitoringUserGetMonitoringUserInList200 = PaginatedListOfMonitoringUsersDto;
export type MonitoringUserGetMonitoringUserInListQueryResponse = PaginatedListOfMonitoringUsersDto;
export type MonitoringUserGetMonitoringUserInListQuery = {
    Response: MonitoringUserGetMonitoringUserInListQueryResponse;
    QueryParams: MonitoringUserGetMonitoringUserInListQueryParams;
    HeaderParams: MonitoringUserGetMonitoringUserInListHeaderParams;
};