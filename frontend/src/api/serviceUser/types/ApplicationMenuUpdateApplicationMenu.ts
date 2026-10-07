import type { ApplicationMenu } from "./ApplicationMenu";
import type { ApplicationMenuAddDto } from "./ApplicationMenuAddDto";

 export type ApplicationMenuUpdateApplicationMenuPathParams = {
    /**
     * @type string, guid
    */
    id: string;
};
export type ApplicationMenuUpdateApplicationMenuHeaderParams = {
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
export type ApplicationMenuUpdateApplicationMenu200 = ApplicationMenu;
export type ApplicationMenuUpdateApplicationMenuMutationRequest = ApplicationMenuAddDto;
export type ApplicationMenuUpdateApplicationMenuMutationResponse = ApplicationMenu;
export type ApplicationMenuUpdateApplicationMenuMutation = {
    Response: ApplicationMenuUpdateApplicationMenuMutationResponse;
    Request: ApplicationMenuUpdateApplicationMenuMutationRequest;
    PathParams: ApplicationMenuUpdateApplicationMenuPathParams;
    HeaderParams: ApplicationMenuUpdateApplicationMenuHeaderParams;
};