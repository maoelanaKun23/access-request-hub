import type { ApplicationDto } from "./ApplicationDto";

 export type ApplicationCreateHeaderParams = {
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
export type ApplicationCreate200 = string;
/**
 * @description Model of application object.
*/
export type ApplicationCreateMutationRequest = ApplicationDto;
/**
 * @description Request successful.
*/
export type ApplicationCreateMutationResponse = string;
export type ApplicationCreateMutation = {
    Response: ApplicationCreateMutationResponse;
    Request: ApplicationCreateMutationRequest;
    HeaderParams: ApplicationCreateHeaderParams;
};