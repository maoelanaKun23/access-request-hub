import type { GraphMonitoringUserDto } from "./GraphMonitoringUserDto";

 export type MonitoringUserGetMonitoringUserInGraphQueryParams = {
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
export type MonitoringUserGetMonitoringUserInGraphHeaderParams = {
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
export type MonitoringUserGetMonitoringUserInGraph200 = GraphMonitoringUserDto;
export type MonitoringUserGetMonitoringUserInGraphQueryResponse = GraphMonitoringUserDto;
export type MonitoringUserGetMonitoringUserInGraphQuery = {
    Response: MonitoringUserGetMonitoringUserInGraphQueryResponse;
    QueryParams: MonitoringUserGetMonitoringUserInGraphQueryParams;
    HeaderParams: MonitoringUserGetMonitoringUserInGraphHeaderParams;
};