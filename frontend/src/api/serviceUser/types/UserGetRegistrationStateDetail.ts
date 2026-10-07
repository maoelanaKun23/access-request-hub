export type UserGetRegistrationStateDetailPathParams = {
    /**
     * @type string, guid
    */
    id: string;
};
export type UserGetRegistrationStateDetailQueryParams = {
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
export type UserGetRegistrationStateDetailHeaderParams = {
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
export type UserGetRegistrationStateDetail200 = Blob;
export type UserGetRegistrationStateDetailQueryResponse = Blob;
export type UserGetRegistrationStateDetailQuery = {
    Response: UserGetRegistrationStateDetailQueryResponse;
    PathParams: UserGetRegistrationStateDetailPathParams;
    QueryParams: UserGetRegistrationStateDetailQueryParams;
    HeaderParams: UserGetRegistrationStateDetailHeaderParams;
};