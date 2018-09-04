package com.sensocon.core.service;

import com.sensocon.core.domain.LoraGateway;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing LoraGateway.
 */
public interface LoraGatewayService {

    /**
     * Save a loraGateway.
     *
     * @param loraGateway the entity to save
     * @return the persisted entity
     */
    LoraGateway save(LoraGateway loraGateway);

    /**
     * Get all the loraGateways.
     *
     * @return the list of entities
     */
    List<LoraGateway> findAll();


    /**
     * Get the "id" loraGateway.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<LoraGateway> findOne(Long id);

    /**
     * Delete the "id" loraGateway.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
