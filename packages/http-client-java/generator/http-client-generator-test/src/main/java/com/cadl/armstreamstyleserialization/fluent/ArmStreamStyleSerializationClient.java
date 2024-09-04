// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package com.cadl.armstreamstyleserialization.fluent;

import com.azure.core.http.HttpPipeline;
import java.time.Duration;

/**
 * The interface for ArmStreamStyleSerializationClient class.
 */
public interface ArmStreamStyleSerializationClient {
    /**
     * Gets Service host.
     * 
     * @return the endpoint value.
     */
    String getEndpoint();

    /**
     * Gets Version parameter.
     * 
     * @return the apiVersion value.
     */
    String getApiVersion();

    /**
     * Gets The ID of the target subscription. The value must be an UUID.
     * 
     * @return the subscriptionId value.
     */
    String getSubscriptionId();

    /**
     * Gets The HTTP pipeline to send requests through.
     * 
     * @return the httpPipeline value.
     */
    HttpPipeline getHttpPipeline();

    /**
     * Gets The default poll interval for long-running operation.
     * 
     * @return the defaultPollInterval value.
     */
    Duration getDefaultPollInterval();

    /**
     * Gets the FishesClient object to access its operations.
     * 
     * @return the FishesClient object.
     */
    FishesClient getFishes();

    /**
     * Gets the TopLevelArmResourcesClient object to access its operations.
     * 
     * @return the TopLevelArmResourcesClient object.
     */
    TopLevelArmResourcesClient getTopLevelArmResources();
}