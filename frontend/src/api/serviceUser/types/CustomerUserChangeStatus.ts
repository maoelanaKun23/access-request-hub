export type CustomerUserChangeStatusPathParams = {
    /**
     * @description Id of user application object.
     * @type string, guid
    */
    userApplicationId: string;
    /**
     * @description Status of userApplication.
     * @type boolean
    */
    status: boolean;
};
export type CustomerUserChangeStatusHeaderParams = {
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
export type CustomerUserChangeStatus200 = Blob;
/**
 * @description Request successful.
*/
export type CustomerUserChangeStatusMutationResponse = Blob;
export type CustomerUserChangeStatusMutation = {
    Response: CustomerUserChangeStatusMutationResponse;
    PathParams: CustomerUserChangeStatusPathParams;
    HeaderParams: CustomerUserChangeStatusHeaderParams;
};