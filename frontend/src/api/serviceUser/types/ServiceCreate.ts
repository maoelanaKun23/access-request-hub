import type { ServiceInputDto } from "./ServiceInputDto";

 export type ServiceCreateHeaderParams = {
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
export type ServiceCreate200 = ServiceInputDto;
export type ServiceCreateMutationRequest = ServiceInputDto;
export type ServiceCreateMutationResponse = ServiceInputDto;
export type ServiceCreateMutation = {
    Response: ServiceCreateMutationResponse;
    Request: ServiceCreateMutationRequest;
    HeaderParams: ServiceCreateHeaderParams;
};