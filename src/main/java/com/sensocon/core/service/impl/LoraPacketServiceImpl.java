package com.sensocon.core.service.impl;

import com.sensocon.core.service.LoraPacketService;
import com.sensocon.core.domain.LoraPacket;
import com.sensocon.core.repository.LoraPacketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing LoraPacket.
 */
@Service
@Transactional
public class LoraPacketServiceImpl implements LoraPacketService {

    private final Logger log = LoggerFactory.getLogger(LoraPacketServiceImpl.class);

    private final LoraPacketRepository loraPacketRepository;

    public LoraPacketServiceImpl(LoraPacketRepository loraPacketRepository) {
        this.loraPacketRepository = loraPacketRepository;
    }

    /**
     * Save a loraPacket.
     *
     * @param loraPacket the entity to save
     * @return the persisted entity
     */
    @Override
    public LoraPacket save(LoraPacket loraPacket) {
        log.debug("Request to save LoraPacket : {}", loraPacket);        return loraPacketRepository.save(loraPacket);
    }

    /**
     * Get all the loraPackets.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LoraPacket> findAll() {
        log.debug("Request to get all LoraPackets");
        return loraPacketRepository.findAll();
    }


    /**
     * Get one loraPacket by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LoraPacket> findOne(Long id) {
        log.debug("Request to get LoraPacket : {}", id);
        return loraPacketRepository.findById(id);
    }

    /**
     * Delete the loraPacket by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LoraPacket : {}", id);
        loraPacketRepository.deleteById(id);
    }
}
