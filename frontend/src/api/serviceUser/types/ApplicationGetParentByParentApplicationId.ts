import type { ApplicationChildDto } from "./ApplicationChildDto";

 export type ApplicationGetParentByParentApplicationIdHeaderParams = {
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
export type ApplicationGetParentByParentApplicationId200 = ApplicationChildDto[];
export type ApplicationGetParentByParentApplicationIdQueryResponse = ApplicationChildDto[];
export type ApplicationGetParentByParentApplicationIdQuery = {
    Response: ApplicationGetParentByParentApplicationIdQueryResponse;
    HeaderParams: ApplicationGetParentByParentApplicationIdHeaderParams;
};