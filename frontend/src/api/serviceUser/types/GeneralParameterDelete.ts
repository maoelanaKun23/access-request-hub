export type GeneralParameterDeletePathParams = {
    /**
     * @description Id of general parameter object.
     * @type string, guid
    */
    id: string;
};
export type GeneralParameterDeleteHeaderParams = {
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
export type GeneralParameterDelete200 = Blob;
/**
 * @description Request successful.
*/
export type GeneralParameterDeleteMutationResponse = Blob;
export type GeneralParameterDeleteMutation = {
    Response: GeneralParameterDeleteMutationResponse;
    PathParams: GeneralParameterDeletePathParams;
    HeaderParams: GeneralParameterDeleteHeaderParams;
};