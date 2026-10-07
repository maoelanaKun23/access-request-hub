export type CustomerApplicationChangeStatusPathParams = {
    /**
     * @description Id of permission object.
     * @type string, guid
    */
    id: string;
    /**
     * @type boolean
    */
    status: boolean;
};
export type CustomerApplicationChangeStatusHeaderParams = {
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
export type CustomerApplicationChangeStatus200 = Blob;
/**
 * @description Request successful.
*/
export type CustomerApplicationChangeStatusMutationResponse = Blob;
export type CustomerApplicationChangeStatusMutation = {
    Response: CustomerApplicationChangeStatusMutationResponse;
    PathParams: CustomerApplicationChangeStatusPathParams;
    HeaderParams: CustomerApplicationChangeStatusHeaderParams;
};