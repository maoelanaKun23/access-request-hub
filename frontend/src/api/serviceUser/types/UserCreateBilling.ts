import type { BillingAddDto } from "./BillingAddDto";

 export type UserCreateBillingHeaderParams = {
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
export type UserCreateBilling200 = Blob;
export type UserCreateBillingMutationRequest = BillingAddDto[];
export type UserCreateBillingMutationResponse = Blob;
export type UserCreateBillingMutation = {
    Response: UserCreateBillingMutationResponse;
    Request: UserCreateBillingMutationRequest;
    HeaderParams: UserCreateBillingHeaderParams;
};