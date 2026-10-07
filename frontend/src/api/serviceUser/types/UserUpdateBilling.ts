import type { BillingUpdateDto } from "./BillingUpdateDto";

 export type UserUpdateBillingPathParams = {
    /**
     * @type string, guid
    */
    billingId: string;
};
export type UserUpdateBillingHeaderParams = {
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
export type UserUpdateBilling200 = Blob;
export type UserUpdateBillingMutationRequest = BillingUpdateDto;
export type UserUpdateBillingMutationResponse = Blob;
export type UserUpdateBillingMutation = {
    Response: UserUpdateBillingMutationResponse;
    Request: UserUpdateBillingMutationRequest;
    PathParams: UserUpdateBillingPathParams;
    HeaderParams: UserUpdateBillingHeaderParams;
};