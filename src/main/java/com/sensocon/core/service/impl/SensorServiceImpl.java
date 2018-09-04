package com.sensocon.core.service.impl;

import com.sensocon.core.service.SensorService;
import com.sensocon.core.domain.Sensor;
import com.sensocon.core.repository.SensorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Sensor.
 */
@Service
@Transactional
public class SensorServiceImpl implements SensorService {

    private final Logger log = LoggerFactory.getLogger(SensorServiceImpl.class);

    private final SensorRepository sensorRepository;

    public SensorServiceImpl(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    /**
     * Save a sensor.
     *
     * @param sensor the entity to save
     * @return the persisted entity
     */
    @Override
    public Sensor save(Sensor sensor) {
        log.debug("Request to save Sensor : {}", sensor);        return sensorRepository.save(sensor);
    }

    /**
     * Get all the sensors.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Sensor> findAll() {
        log.debug("Request to get all Sensors");
        return sensorRepository.findAll();
    }


    /**
     * Get one sensor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Sensor> findOne(Long id) {
        log.debug("Request to get Sensor : {}", id);
        return sensorRepository.findById(id);
    }

    /**
     * Delete the sensor by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Sensor : {}", id);
        sensorRepository.deleteById(id);
    }
}
