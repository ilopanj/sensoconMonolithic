package com.sensocon.core.service.impl;

import com.sensocon.core.service.NotificationGroupService;
import com.sensocon.core.domain.NotificationGroup;
import com.sensocon.core.repository.NotificationGroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing NotificationGroup.
 */
@Service
@Transactional
public class NotificationGroupServiceImpl implements NotificationGroupService {

    private final Logger log = LoggerFactory.getLogger(NotificationGroupServiceImpl.class);

    private final NotificationGroupRepository notificationGroupRepository;

    public NotificationGroupServiceImpl(NotificationGroupRepository notificationGroupRepository) {
        this.notificationGroupRepository = notificationGroupRepository;
    }

    /**
     * Save a notificationGroup.
     *
     * @param notificationGroup the entity to save
     * @return the persisted entity
     */
    @Override
    public NotificationGroup save(NotificationGroup notificationGroup) {
        log.debug("Request to save NotificationGroup : {}", notificationGroup);        return notificationGroupRepository.save(notificationGroup);
    }

    /**
     * Get all the notificationGroups.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<NotificationGroup> findAll() {
        log.debug("Request to get all NotificationGroups");
        return notificationGroupRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the NotificationGroup with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<NotificationGroup> findAllWithEagerRelationships(Pageable pageable) {
        return notificationGroupRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one notificationGroup by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<NotificationGroup> findOne(Long id) {
        log.debug("Request to get NotificationGroup : {}", id);
        return notificationGroupRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the notificationGroup by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete NotificationGroup : {}", id);
        notificationGroupRepository.deleteById(id);
    }
}
