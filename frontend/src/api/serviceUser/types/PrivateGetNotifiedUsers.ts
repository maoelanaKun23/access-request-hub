import type { UserForNotificationDto } from "./UserForNotificationDto";

 export type PrivateGetNotifiedUsersPathParams = {
    /**
     * @description Service name.
     * @type string
    */
    serviceName: string;
};
export type PrivateGetNotifiedUsersQueryParams = {
    /**
     * @description Permission notification name.
     * @type string | undefined
    */
    notifPermission?: string;
    /**
     * @description Application ClientId.
     * @type array | undefined
    */
    clientId?: string[];
};
export type PrivateGetNotifiedUsersHeaderParams = {
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
export type PrivateGetNotifiedUsers200 = UserForNotificationDto[];
/**
 * @description Dictionary of attributes model.
*/
export type PrivateGetNotifiedUsersMutationRequest = {
    [key: string]: string[];
};
/**
 * @description Request successful.
*/
export type PrivateGetNotifiedUsersMutationResponse = UserForNotificationDto[];
export type PrivateGetNotifiedUsersMutation = {
    Response: PrivateGetNotifiedUsersMutationResponse;
    Request: PrivateGetNotifiedUsersMutationRequest;
    PathParams: PrivateGetNotifiedUsersPathParams;
    QueryParams: PrivateGetNotifiedUsersQueryParams;
    HeaderParams: PrivateGetNotifiedUsersHeaderParams;
};