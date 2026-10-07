import type { UserByAttributeClientIdDto } from "./UserByAttributeClientIdDto";

 export type PrivateGetUsersByClientIdAttributesPathParams = {
    /**
     * @type string
    */
    clientId: string;
};
export type PrivateGetUsersByClientIdAttributesQueryParams = {
    /**
     * @type string | undefined
    */
    customerCode?: string;
};
export type PrivateGetUsersByClientIdAttributesHeaderParams = {
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
export type PrivateGetUsersByClientIdAttributes200 = UserByAttributeClientIdDto[];
export type PrivateGetUsersByClientIdAttributesMutationRequest = {
    [key: string]: string[];
};
export type PrivateGetUsersByClientIdAttributesMutationResponse = UserByAttributeClientIdDto[];
export type PrivateGetUsersByClientIdAttributesMutation = {
    Response: PrivateGetUsersByClientIdAttributesMutationResponse;
    Request: PrivateGetUsersByClientIdAttributesMutationRequest;
    PathParams: PrivateGetUsersByClientIdAttributesPathParams;
    QueryParams: PrivateGetUsersByClientIdAttributesQueryParams;
    HeaderParams: PrivateGetUsersByClientIdAttributesHeaderParams;
};