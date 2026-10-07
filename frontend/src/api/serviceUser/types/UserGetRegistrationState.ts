export type UserGetRegistrationStateQueryParams = {
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @default ""
     * @type string | undefined
    */
    keyword?: string;
    /**
     * @default 1
     * @type integer | undefined, int32
    */
    page?: number;
    /**
     * @default 10
     * @type integer | undefined, int32
    */
    pageSize?: number;
};
export type UserGetRegistrationStateHeaderParams = {
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
export type UserGetRegistrationState200 = Blob;
export type UserGetRegistrationStateQueryResponse = Blob;
export type UserGetRegistrationStateQuery = {
    Response: UserGetRegistrationStateQueryResponse;
    QueryParams: UserGetRegistrationStateQueryParams;
    HeaderParams: UserGetRegistrationStateHeaderParams;
};