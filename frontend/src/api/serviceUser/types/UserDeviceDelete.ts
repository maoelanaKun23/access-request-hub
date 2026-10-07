import type { UserApplicationDeviceDto } from "./UserApplicationDeviceDto";

 export type UserDeviceDeletePathParams = {
    /**
     * @description Id of userDevice object.
     * @type string
    */
    deviceId: string;
};
export type UserDeviceDeleteHeaderParams = {
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
export type UserDeviceDelete200 = UserApplicationDeviceDto;
/**
 * @description Request successful.
*/
export type UserDeviceDeleteMutationResponse = UserApplicationDeviceDto;
export type UserDeviceDeleteMutation = {
    Response: UserDeviceDeleteMutationResponse;
    PathParams: UserDeviceDeletePathParams;
    HeaderParams: UserDeviceDeleteHeaderParams;
};