import type { ApplicationGroupDto } from "./ApplicationGroupDto";

 export type ApplicationUpdateApplicationGroupPathParams = {
    /**
     * @description ApplicationGroupId
     * @type string, guid
    */
    id: string;
};
export type ApplicationUpdateApplicationGroupHeaderParams = {
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
export type ApplicationUpdateApplicationGroup200 = string;
export type ApplicationUpdateApplicationGroup400 = string;
export type ApplicationUpdateApplicationGroupMutationRequest = ApplicationGroupDto;
export type ApplicationUpdateApplicationGroupMutationResponse = string;
export type ApplicationUpdateApplicationGroupMutation = {
    Response: ApplicationUpdateApplicationGroupMutationResponse;
    Request: ApplicationUpdateApplicationGroupMutationRequest;
    PathParams: ApplicationUpdateApplicationGroupPathParams;
    HeaderParams: ApplicationUpdateApplicationGroupHeaderParams;
    Errors: ApplicationUpdateApplicationGroup400;
};