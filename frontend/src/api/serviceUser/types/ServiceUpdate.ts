import type { ServiceInputDto } from "./ServiceInputDto";

 export type ServiceUpdatePathParams = {
    /**
     * @type string, guid
    */
    id: string;
};
export type ServiceUpdateHeaderParams = {
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
export type ServiceUpdate200 = ServiceInputDto;
export type ServiceUpdateMutationRequest = ServiceInputDto;
export type ServiceUpdateMutationResponse = ServiceInputDto;
export type ServiceUpdateMutation = {
    Response: ServiceUpdateMutationResponse;
    Request: ServiceUpdateMutationRequest;
    PathParams: ServiceUpdatePathParams;
    HeaderParams: ServiceUpdateHeaderParams;
};