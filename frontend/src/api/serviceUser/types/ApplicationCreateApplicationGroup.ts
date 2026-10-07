import type { ApplicationGroupDto } from "./ApplicationGroupDto";

 export type ApplicationCreateApplicationGroupHeaderParams = {
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
export type ApplicationCreateApplicationGroup200 = string;
export type ApplicationCreateApplicationGroup400 = string;
export type ApplicationCreateApplicationGroupMutationRequest = ApplicationGroupDto[];
export type ApplicationCreateApplicationGroupMutationResponse = string;
export type ApplicationCreateApplicationGroupMutation = {
    Response: ApplicationCreateApplicationGroupMutationResponse;
    Request: ApplicationCreateApplicationGroupMutationRequest;
    HeaderParams: ApplicationCreateApplicationGroupHeaderParams;
    Errors: ApplicationCreateApplicationGroup400;
};