import type { MonitoringUserDashboardDto } from "./MonitoringUserDashboardDto";

 export type MonitoringUserGetSummaryMonitoringUserQueryParams = {
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
};
export type MonitoringUserGetSummaryMonitoringUserHeaderParams = {
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
export type MonitoringUserGetSummaryMonitoringUser200 = MonitoringUserDashboardDto;
export type MonitoringUserGetSummaryMonitoringUserQueryResponse = MonitoringUserDashboardDto;
export type MonitoringUserGetSummaryMonitoringUserQuery = {
    Response: MonitoringUserGetSummaryMonitoringUserQueryResponse;
    QueryParams: MonitoringUserGetSummaryMonitoringUserQueryParams;
    HeaderParams: MonitoringUserGetSummaryMonitoringUserHeaderParams;
};