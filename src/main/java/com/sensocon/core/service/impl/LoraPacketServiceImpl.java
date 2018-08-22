package com.sensocon.core.service.impl;

import com.sensocon.core.service.LoraPacketService;
import com.sensocon.core.domain.LoraPacket;
import com.sensocon.core.repository.LoraPacketRepository;
import com.sensocon.core.service.dto.LoraPacketDTO;
import com.sensocon.core.service.mapper.LoraPacketMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing LoraPacket.
 */
@Service
@Transactional
public class LoraPacketServiceImpl implements LoraPacketService {

    private final Logger log = LoggerFactory.getLogger(LoraPacketServiceImpl.class);

    private final LoraPacketRepository loraPacketRepository;

    private final LoraPacketMapper loraPacketMapper;

    public LoraPacketServiceImpl(LoraPacketRepository loraPacketRepository, LoraPacketMapper loraPacketMapper) {
        this.loraPacketRepository = loraPacketRepository;
        this.loraPacketMapper = loraPacketMapper;
    }

    /**
     * Save a loraPacket.
     *
     * @param loraPacketDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LoraPacketDTO save(LoraPacketDTO loraPacketDTO) {
        log.debug("Request to save LoraPacket : {}", loraPacketDTO);
        LoraPacket loraPacket = loraPacketMapper.toEntity(loraPacketDTO);
        loraPacket = loraPacketRepository.save(loraPacket);
        return loraPacketMapper.toDto(loraPacket);
    }

    /**
     * Get all the loraPackets.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LoraPacketDTO> findAll() {
        log.debug("Request to get all LoraPackets");
        return loraPacketRepository.findAll().stream()
            .map(loraPacketMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one loraPacket by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LoraPacketDTO> findOne(Long id) {
        log.debug("Request to get LoraPacket : {}", id);
        return loraPacketRepository.findById(id)
            .map(loraPacketMapper::toDto);
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
