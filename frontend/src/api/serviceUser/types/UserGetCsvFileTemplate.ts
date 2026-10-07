export type UserGetCsvFileTemplateQueryParams = {
    /**
     * @default false
     * @type boolean | undefined
    */
    customer?: boolean;
};
export type UserGetCsvFileTemplateHeaderParams = {
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
export type UserGetCsvFileTemplate200 = Blob;
export type UserGetCsvFileTemplateQueryResponse = Blob;
export type UserGetCsvFileTemplateQuery = {
    Response: UserGetCsvFileTemplateQueryResponse;
    QueryParams: UserGetCsvFileTemplateQueryParams;
    HeaderParams: UserGetCsvFileTemplateHeaderParams;
};