export type ApplicationChangeStatusPathParams = {
    /**
     * @description Id of application object.
     * @type string, guid
    */
    id: string;
    /**
     * @description Status of application.
     * @type boolean
    */
    status: boolean;
};
export type ApplicationChangeStatusHeaderParams = {
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
export type ApplicationChangeStatus200 = Blob;
/**
 * @description Request successful.
*/
export type ApplicationChangeStatusMutationResponse = Blob;
export type ApplicationChangeStatusMutation = {
    Response: ApplicationChangeStatusMutationResponse;
    PathParams: ApplicationChangeStatusPathParams;
    HeaderParams: ApplicationChangeStatusHeaderParams;
};