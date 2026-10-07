export type PrivateTransformQueryParams = {
    /**
     * @type string | undefined
    */
    data?: string;
};
export type PrivateTransformHeaderParams = {
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
export type PrivateTransform200 = Blob;
export type PrivateTransformQueryResponse = Blob;
export type PrivateTransformQuery = {
    Response: PrivateTransformQueryResponse;
    QueryParams: PrivateTransformQueryParams;
    HeaderParams: PrivateTransformHeaderParams;
};