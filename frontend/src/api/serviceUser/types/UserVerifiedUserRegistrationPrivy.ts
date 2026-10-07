import type { ErrorResponseRegistrationRequestDto } from "./ErrorResponseRegistrationRequestDto";

 export type UserVerifiedUserRegistrationPrivyHeaderParams = {
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
export type UserVerifiedUserRegistrationPrivy200 = string;
export type UserVerifiedUserRegistrationPrivy400 = ErrorResponseRegistrationRequestDto;
export type UserVerifiedUserRegistrationPrivy500 = ErrorResponseRegistrationRequestDto;
export type UserVerifiedUserRegistrationPrivyMutationRequest = {
    /**
     * @type string | undefined
    */
    FullName?: string;
    /**
     * @type string | undefined
    */
    Nik?: string;
    /**
     * @type string | undefined, date-time
    */
    Dob?: string;
    /**
     * @type string | undefined
    */
    Phone?: string;
    /**
     * @type string | undefined
    */
    Email?: string;
    /**
     * @type string | undefined
    */
    EmailPIC?: string;
    /**
     * @type string | undefined, binary
    */
    Poa?: Blob;
    /**
     * @type array | undefined
    */
    Slocs?: string[];
};
export type UserVerifiedUserRegistrationPrivyMutationResponse = string;
export type UserVerifiedUserRegistrationPrivyMutation = {
    Response: UserVerifiedUserRegistrationPrivyMutationResponse;
    Request: UserVerifiedUserRegistrationPrivyMutationRequest;
    HeaderParams: UserVerifiedUserRegistrationPrivyHeaderParams;
    Errors: UserVerifiedUserRegistrationPrivy400 | UserVerifiedUserRegistrationPrivy500;
};