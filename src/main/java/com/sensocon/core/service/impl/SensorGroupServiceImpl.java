package com.sensocon.core.service.impl;

import com.sensocon.core.service.SensorGroupService;
import com.sensocon.core.domain.SensorGroup;
import com.sensocon.core.repository.SensorGroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing SensorGroup.
 */
@Service
@Transactional
public class SensorGroupServiceImpl implements SensorGroupService {

    private final Logger log = LoggerFactory.getLogger(SensorGroupServiceImpl.class);

    private final SensorGroupRepository sensorGroupRepository;

    public SensorGroupServiceImpl(SensorGroupRepository sensorGroupRepository) {
        this.sensorGroupRepository = sensorGroupRepository;
    }

    /**
     * Save a sensorGroup.
     *
     * @param sensorGroup the entity to save
     * @return the persisted entity
     */
    @Override
    public SensorGroup save(SensorGroup sensorGroup) {
        log.debug("Request to save SensorGroup : {}", sensorGroup);        return sensorGroupRepository.save(sensorGroup);
    }

    /**
     * Get all the sensorGroups.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SensorGroup> findAll() {
        log.debug("Request to get all SensorGroups");
        return sensorGroupRepository.findAll();
    }


    /**
     * Get one sensorGroup by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SensorGroup> findOne(Long id) {
        log.debug("Request to get SensorGroup : {}", id);
        return sensorGroupRepository.findById(id);
    }

    /**
     * Delete the sensorGroup by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SensorGroup : {}", id);
        sensorGroupRepository.deleteById(id);
    }
}
