import type { ListUsersInfoDto } from "./ListUsersInfoDto";

 export type PrivateGetListByUserIdHeaderParams = {
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
export type PrivateGetListByUserId200 = ListUsersInfoDto;
export type PrivateGetListByUserIdMutationRequest = string[];
export type PrivateGetListByUserIdMutationResponse = ListUsersInfoDto;
export type PrivateGetListByUserIdMutation = {
    Response: PrivateGetListByUserIdMutationResponse;
    Request: PrivateGetListByUserIdMutationRequest;
    HeaderParams: PrivateGetListByUserIdHeaderParams;
};