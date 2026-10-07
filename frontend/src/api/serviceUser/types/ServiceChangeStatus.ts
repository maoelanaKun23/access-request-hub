export type ServiceChangeStatusPathParams = {
    /**
     * @description Id of service object.
     * @type string, guid
    */
    id: string;
    /**
     * @description Status of service.
     * @type boolean
    */
    status: boolean;
};
export type ServiceChangeStatusHeaderParams = {
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
export type ServiceChangeStatus200 = Blob;
/**
 * @description Request successful.
*/
export type ServiceChangeStatusMutationResponse = Blob;
export type ServiceChangeStatusMutation = {
    Response: ServiceChangeStatusMutationResponse;
    PathParams: ServiceChangeStatusPathParams;
    HeaderParams: ServiceChangeStatusHeaderParams;
};