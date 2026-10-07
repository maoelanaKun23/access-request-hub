import type { ApplicationParentdDto } from "./ApplicationParentdDto";

 export type ApplicationGetListParentsHeaderParams = {
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
export type ApplicationGetListParents200 = ApplicationParentdDto[];
export type ApplicationGetListParentsQueryResponse = ApplicationParentdDto[];
export type ApplicationGetListParentsQuery = {
    Response: ApplicationGetListParentsQueryResponse;
    HeaderParams: ApplicationGetListParentsHeaderParams;
};