import type { ApplicationDto } from "./ApplicationDto";

 export type ApplicationUpdatePathParams = {
    /**
     * @description Id of application object.
     * @type string, guid
    */
    id: string;
};
export type ApplicationUpdateHeaderParams = {
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
export type ApplicationUpdate200 = Blob;
/**
 * @description Model of application object.
*/
export type ApplicationUpdateMutationRequest = ApplicationDto;
/**
 * @description Request successful.
*/
export type ApplicationUpdateMutationResponse = Blob;
export type ApplicationUpdateMutation = {
    Response: ApplicationUpdateMutationResponse;
    Request: ApplicationUpdateMutationRequest;
    PathParams: ApplicationUpdatePathParams;
    HeaderParams: ApplicationUpdateHeaderParams;
};