package com.sensocon.core.service;

import com.sensocon.core.domain.LoraPacket;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing LoraPacket.
 */
public interface LoraPacketService {

    /**
     * Save a loraPacket.
     *
     * @param loraPacket the entity to save
     * @return the persisted entity
     */
    LoraPacket save(LoraPacket loraPacket);

    /**
     * Get all the loraPackets.
     *
     * @return the list of entities
     */
    List<LoraPacket> findAll();


    /**
     * Get the "id" loraPacket.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<LoraPacket> findOne(Long id);

    /**
     * Delete the "id" loraPacket.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
