export type AttributeUploadAttributeHeaderParams = {
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
export type AttributeUploadAttribute200 = string;
/**
 * @description Request failed because of an exception.
*/
export type AttributeUploadAttribute400 = string;
export type AttributeUploadAttributeMutationRequest = {
    /**
     * @type string | undefined
    */
    json?: string;
};
/**
 * @description Request successful.
*/
export type AttributeUploadAttributeMutationResponse = string;
export type AttributeUploadAttributeMutation = {
    Response: AttributeUploadAttributeMutationResponse;
    Request: AttributeUploadAttributeMutationRequest;
    HeaderParams: AttributeUploadAttributeHeaderParams;
    Errors: AttributeUploadAttribute400;
};