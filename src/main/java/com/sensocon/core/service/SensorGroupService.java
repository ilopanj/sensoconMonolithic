package com.sensocon.core.service;

import com.sensocon.core.domain.SensorGroup;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing SensorGroup.
 */
public interface SensorGroupService {

    /**
     * Save a sensorGroup.
     *
     * @param sensorGroup the entity to save
     * @return the persisted entity
     */
    SensorGroup save(SensorGroup sensorGroup);

    /**
     * Get all the sensorGroups.
     *
     * @return the list of entities
     */
    List<SensorGroup> findAll();


    /**
     * Get the "id" sensorGroup.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SensorGroup> findOne(Long id);

    /**
     * Delete the "id" sensorGroup.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
