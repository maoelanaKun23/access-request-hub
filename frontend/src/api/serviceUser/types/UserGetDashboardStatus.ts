import type { DashboardByStatusDto } from "./DashboardByStatusDto";

 export type UserGetDashboardStatusQueryParams = {
    /**
     * @description Id of application which filter the list by application.
     * @type string | undefined, guid
    */
    applicationId?: string;
};
export type UserGetDashboardStatusHeaderParams = {
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
export type UserGetDashboardStatus200 = DashboardByStatusDto;
/**
 * @description Request successful.
*/
export type UserGetDashboardStatusQueryResponse = DashboardByStatusDto;
export type UserGetDashboardStatusQuery = {
    Response: UserGetDashboardStatusQueryResponse;
    QueryParams: UserGetDashboardStatusQueryParams;
    HeaderParams: UserGetDashboardStatusHeaderParams;
};