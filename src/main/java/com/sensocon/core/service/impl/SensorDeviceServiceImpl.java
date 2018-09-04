package com.sensocon.core.service.impl;

import com.sensocon.core.service.SensorDeviceService;
import com.sensocon.core.domain.SensorDevice;
import com.sensocon.core.repository.SensorDeviceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing SensorDevice.
 */
@Service
@Transactional
public class SensorDeviceServiceImpl implements SensorDeviceService {

    private final Logger log = LoggerFactory.getLogger(SensorDeviceServiceImpl.class);

    private final SensorDeviceRepository sensorDeviceRepository;

    public SensorDeviceServiceImpl(SensorDeviceRepository sensorDeviceRepository) {
        this.sensorDeviceRepository = sensorDeviceRepository;
    }

    /**
     * Save a sensorDevice.
     *
     * @param sensorDevice the entity to save
     * @return the persisted entity
     */
    @Override
    public SensorDevice save(SensorDevice sensorDevice) {
        log.debug("Request to save SensorDevice : {}", sensorDevice);        return sensorDeviceRepository.save(sensorDevice);
    }

    /**
     * Get all the sensorDevices.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SensorDevice> findAll() {
        log.debug("Request to get all SensorDevices");
        return sensorDeviceRepository.findAll();
    }


    /**
     * Get one sensorDevice by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SensorDevice> findOne(Long id) {
        log.debug("Request to get SensorDevice : {}", id);
        return sensorDeviceRepository.findById(id);
    }

    /**
     * Delete the sensorDevice by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SensorDevice : {}", id);
        sensorDeviceRepository.deleteById(id);
    }
}
