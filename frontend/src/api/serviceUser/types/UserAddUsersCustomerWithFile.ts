import type { IHeaderDictionary } from "./IHeaderDictionary";

 export type UserAddUsersCustomerWithFileHeaderParams = {
    /**
     * @type string | undefined
    */
    Authorization?: string;
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
export type UserAddUsersCustomerWithFile200 = Blob;
export type UserAddUsersCustomerWithFileMutationRequest = {
    /**
     * @type string | undefined
    */
    ContentType?: string;
    /**
     * @type string | undefined
    */
    ContentDisposition?: string;
    /**
     * @type object | undefined
    */
    Headers?: IHeaderDictionary;
    /**
     * @type integer | undefined, int64
    */
    Length?: number;
    /**
     * @type string | undefined
    */
    Name?: string;
    /**
     * @type string | undefined
    */
    FileName?: string;
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
};
export type UserAddUsersCustomerWithFileMutationResponse = Blob;
export type UserAddUsersCustomerWithFileMutation = {
    Response: UserAddUsersCustomerWithFileMutationResponse;
    Request: UserAddUsersCustomerWithFileMutationRequest;
    HeaderParams: UserAddUsersCustomerWithFileHeaderParams;
};