import type { ApplicationViewDto } from "./ApplicationViewDto";

 export type UserGetUserApplicationsHeaderParams = {
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
export type UserGetUserApplications200 = ApplicationViewDto[];
/**
 * @description Request successful.
*/
export type UserGetUserApplicationsQueryResponse = ApplicationViewDto[];
export type UserGetUserApplicationsQuery = {
    Response: UserGetUserApplicationsQueryResponse;
    HeaderParams: UserGetUserApplicationsHeaderParams;
};