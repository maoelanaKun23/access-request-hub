import type { UserSfRegisterDto } from "./UserSfRegisterDto";

 export type AccountRegisterSfHeaderParams = {
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
export type AccountRegisterSf200 = Blob;
export type AccountRegisterSfMutationRequest = UserSfRegisterDto;
export type AccountRegisterSfMutationResponse = Blob;
export type AccountRegisterSfMutation = {
    Response: AccountRegisterSfMutationResponse;
    Request: AccountRegisterSfMutationRequest;
    HeaderParams: AccountRegisterSfHeaderParams;
};