package com.sensocon.core.service.impl;

import com.sensocon.core.service.LoraGatewayService;
import com.sensocon.core.domain.LoraGateway;
import com.sensocon.core.repository.LoraGatewayRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing LoraGateway.
 */
@Service
@Transactional
public class LoraGatewayServiceImpl implements LoraGatewayService {

    private final Logger log = LoggerFactory.getLogger(LoraGatewayServiceImpl.class);

    private final LoraGatewayRepository loraGatewayRepository;

    public LoraGatewayServiceImpl(LoraGatewayRepository loraGatewayRepository) {
        this.loraGatewayRepository = loraGatewayRepository;
    }

    /**
     * Save a loraGateway.
     *
     * @param loraGateway the entity to save
     * @return the persisted entity
     */
    @Override
    public LoraGateway save(LoraGateway loraGateway) {
        log.debug("Request to save LoraGateway : {}", loraGateway);        return loraGatewayRepository.save(loraGateway);
    }

    /**
     * Get all the loraGateways.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LoraGateway> findAll() {
        log.debug("Request to get all LoraGateways");
        return loraGatewayRepository.findAll();
    }


    /**
     * Get one loraGateway by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LoraGateway> findOne(Long id) {
        log.debug("Request to get LoraGateway : {}", id);
        return loraGatewayRepository.findById(id);
    }

    /**
     * Delete the loraGateway by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LoraGateway : {}", id);
        loraGatewayRepository.deleteById(id);
    }
}
