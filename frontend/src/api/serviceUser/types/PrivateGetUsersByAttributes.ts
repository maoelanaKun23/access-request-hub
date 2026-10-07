import type { UserForNotificationDto } from "./UserForNotificationDto";

 export type PrivateGetUsersByAttributesPathParams = {
    /**
     * @description Service name.
     * @type string
    */
    serviceName: string;
};
export type PrivateGetUsersByAttributesHeaderParams = {
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
export type PrivateGetUsersByAttributes200 = UserForNotificationDto[];
/**
 * @description Dictionary of attributes model.
*/
export type PrivateGetUsersByAttributesMutationRequest = {
    [key: string]: string[];
};
/**
 * @description Request successful.
*/
export type PrivateGetUsersByAttributesMutationResponse = UserForNotificationDto[];
export type PrivateGetUsersByAttributesMutation = {
    Response: PrivateGetUsersByAttributesMutationResponse;
    Request: PrivateGetUsersByAttributesMutationRequest;
    PathParams: PrivateGetUsersByAttributesPathParams;
    HeaderParams: PrivateGetUsersByAttributesHeaderParams;
};