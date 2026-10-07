export type GeneralParameterGetbyIdPathParams = {
    /**
     * @description Id of general parameter object.
     * @type string, guid
    */
    id: string;
};
export type GeneralParameterGetbyIdHeaderParams = {
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
export type GeneralParameterGetbyId200 = Blob;
/**
 * @description Request successful.
*/
export type GeneralParameterGetbyIdQueryResponse = Blob;
export type GeneralParameterGetbyIdQuery = {
    Response: GeneralParameterGetbyIdQueryResponse;
    PathParams: GeneralParameterGetbyIdPathParams;
    HeaderParams: GeneralParameterGetbyIdHeaderParams;
};