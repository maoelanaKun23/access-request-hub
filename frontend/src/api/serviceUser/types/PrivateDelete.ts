import type { UserApplicationDeviceDto } from "./UserApplicationDeviceDto";

 export type PrivateDeletePathParams = {
    /**
     * @type string
    */
    deviceId: string;
};
export type PrivateDeleteHeaderParams = {
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
export type PrivateDelete200 = UserApplicationDeviceDto;
/**
 * @description Request successful.
*/
export type PrivateDeleteMutationResponse = UserApplicationDeviceDto;
export type PrivateDeleteMutation = {
    Response: PrivateDeleteMutationResponse;
    PathParams: PrivateDeletePathParams;
    HeaderParams: PrivateDeleteHeaderParams;
};