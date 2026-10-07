import type { ApplicationDto } from "./ApplicationDto";

 export type AttributeGetAttributeTopicByIdPathParams = {
    /**
     * @description Id of AttributeTopic object.
     * @type string, guid
    */
    id: string;
};
export type AttributeGetAttributeTopicByIdHeaderParams = {
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
export type AttributeGetAttributeTopicById200 = ApplicationDto;
/**
 * @description Request successful.
*/
export type AttributeGetAttributeTopicByIdQueryResponse = ApplicationDto;
export type AttributeGetAttributeTopicByIdQuery = {
    Response: AttributeGetAttributeTopicByIdQueryResponse;
    PathParams: AttributeGetAttributeTopicByIdPathParams;
    HeaderParams: AttributeGetAttributeTopicByIdHeaderParams;
};