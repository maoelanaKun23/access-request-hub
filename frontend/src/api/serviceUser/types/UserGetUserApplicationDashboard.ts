import type { ApplicationDashboardDto } from "./ApplicationDashboardDto";

 export type UserGetUserApplicationDashboardQueryParams = {
    /**
     * @description result size
     * @type integer, int32
    */
    size?: number | null;
};
export type UserGetUserApplicationDashboardHeaderParams = {
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
export type UserGetUserApplicationDashboard200 = ApplicationDashboardDto[];
export type UserGetUserApplicationDashboardQueryResponse = ApplicationDashboardDto[];
export type UserGetUserApplicationDashboardQuery = {
    Response: UserGetUserApplicationDashboardQueryResponse;
    QueryParams: UserGetUserApplicationDashboardQueryParams;
    HeaderParams: UserGetUserApplicationDashboardHeaderParams;
};