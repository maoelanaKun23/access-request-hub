export type MonitoringUserDownloadMonitoringUserQueryParams = {
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
export type MonitoringUserDownloadMonitoringUserHeaderParams = {
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
export type MonitoringUserDownloadMonitoringUser200 = Blob;
export type MonitoringUserDownloadMonitoringUserQueryResponse = Blob;
export type MonitoringUserDownloadMonitoringUserQuery = {
    Response: MonitoringUserDownloadMonitoringUserQueryResponse;
    QueryParams: MonitoringUserDownloadMonitoringUserQueryParams;
    HeaderParams: MonitoringUserDownloadMonitoringUserHeaderParams;
};