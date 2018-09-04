package com.sensocon.core.service;

import com.sensocon.core.domain.SensorThreshold;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing SensorThreshold.
 */
public interface SensorThresholdService {

    /**
     * Save a sensorThreshold.
     *
     * @param sensorThreshold the entity to save
     * @return the persisted entity
     */
    SensorThreshold save(SensorThreshold sensorThreshold);

    /**
     * Get all the sensorThresholds.
     *
     * @return the list of entities
     */
    List<SensorThreshold> findAll();


    /**
     * Get the "id" sensorThreshold.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SensorThreshold> findOne(Long id);

    /**
     * Delete the "id" sensorThreshold.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
