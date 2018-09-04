package com.sensocon.core.service.impl;

import com.sensocon.core.service.SensorThresholdService;
import com.sensocon.core.domain.SensorThreshold;
import com.sensocon.core.repository.SensorThresholdRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing SensorThreshold.
 */
@Service
@Transactional
public class SensorThresholdServiceImpl implements SensorThresholdService {

    private final Logger log = LoggerFactory.getLogger(SensorThresholdServiceImpl.class);

    private final SensorThresholdRepository sensorThresholdRepository;

    public SensorThresholdServiceImpl(SensorThresholdRepository sensorThresholdRepository) {
        this.sensorThresholdRepository = sensorThresholdRepository;
    }

    /**
     * Save a sensorThreshold.
     *
     * @param sensorThreshold the entity to save
     * @return the persisted entity
     */
    @Override
    public SensorThreshold save(SensorThreshold sensorThreshold) {
        log.debug("Request to save SensorThreshold : {}", sensorThreshold);        return sensorThresholdRepository.save(sensorThreshold);
    }

    /**
     * Get all the sensorThresholds.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SensorThreshold> findAll() {
        log.debug("Request to get all SensorThresholds");
        return sensorThresholdRepository.findAll();
    }


    /**
     * Get one sensorThreshold by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SensorThreshold> findOne(Long id) {
        log.debug("Request to get SensorThreshold : {}", id);
        return sensorThresholdRepository.findById(id);
    }

    /**
     * Delete the sensorThreshold by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SensorThreshold : {}", id);
        sensorThresholdRepository.deleteById(id);
    }
}
