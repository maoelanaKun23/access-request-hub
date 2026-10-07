import type { UserRegisterDto } from "./UserRegisterDto";

 export type AccountRegisterCustomerPathParams = {
    /**
     * @type string
    */
    clientId: string;
};
export type AccountRegisterCustomerHeaderParams = {
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
export type AccountRegisterCustomer200 = Blob;
export type AccountRegisterCustomerMutationRequest = UserRegisterDto;
export type AccountRegisterCustomerMutationResponse = Blob;
export type AccountRegisterCustomerMutation = {
    Response: AccountRegisterCustomerMutationResponse;
    Request: AccountRegisterCustomerMutationRequest;
    PathParams: AccountRegisterCustomerPathParams;
    HeaderParams: AccountRegisterCustomerHeaderParams;
};