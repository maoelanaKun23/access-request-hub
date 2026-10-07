import type { ApplicationMenu } from "./ApplicationMenu";
import type { ApplicationMenuAddDto } from "./ApplicationMenuAddDto";

 export type ApplicationMenuCreateApplicationMenuHeaderParams = {
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
export type ApplicationMenuCreateApplicationMenu200 = ApplicationMenu;
export type ApplicationMenuCreateApplicationMenuMutationRequest = ApplicationMenuAddDto;
export type ApplicationMenuCreateApplicationMenuMutationResponse = ApplicationMenu;
export type ApplicationMenuCreateApplicationMenuMutation = {
    Response: ApplicationMenuCreateApplicationMenuMutationResponse;
    Request: ApplicationMenuCreateApplicationMenuMutationRequest;
    HeaderParams: ApplicationMenuCreateApplicationMenuHeaderParams;
};