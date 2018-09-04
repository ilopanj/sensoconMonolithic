package com.sensocon.core.service;

import com.sensocon.core.domain.SensorDevice;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing SensorDevice.
 */
public interface SensorDeviceService {

    /**
     * Save a sensorDevice.
     *
     * @param sensorDevice the entity to save
     * @return the persisted entity
     */
    SensorDevice save(SensorDevice sensorDevice);

    /**
     * Get all the sensorDevices.
     *
     * @return the list of entities
     */
    List<SensorDevice> findAll();


    /**
     * Get the "id" sensorDevice.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SensorDevice> findOne(Long id);

    /**
     * Delete the "id" sensorDevice.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
