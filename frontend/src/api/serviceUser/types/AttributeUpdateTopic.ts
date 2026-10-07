import type { AttributeTopicDto } from "./AttributeTopicDto";

 export type AttributeUpdateTopicPathParams = {
    /**
     * @type string, guid
    */
    id: string;
};
export type AttributeUpdateTopicHeaderParams = {
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
export type AttributeUpdateTopic200 = string;
/**
 * @description Request failed because of an exception.
*/
export type AttributeUpdateTopic400 = string;
export type AttributeUpdateTopicMutationRequest = AttributeTopicDto;
/**
 * @description Request successful.
*/
export type AttributeUpdateTopicMutationResponse = string;
export type AttributeUpdateTopicMutation = {
    Response: AttributeUpdateTopicMutationResponse;
    Request: AttributeUpdateTopicMutationRequest;
    PathParams: AttributeUpdateTopicPathParams;
    HeaderParams: AttributeUpdateTopicHeaderParams;
    Errors: AttributeUpdateTopic400;
};