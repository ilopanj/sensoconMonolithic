package com.sensocon.core.service;

import com.sensocon.core.domain.NotificationGroup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing NotificationGroup.
 */
public interface NotificationGroupService {

    /**
     * Save a notificationGroup.
     *
     * @param notificationGroup the entity to save
     * @return the persisted entity
     */
    NotificationGroup save(NotificationGroup notificationGroup);

    /**
     * Get all the notificationGroups.
     *
     * @return the list of entities
     */
    List<NotificationGroup> findAll();

    /**
     * Get all the NotificationGroup with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<NotificationGroup> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" notificationGroup.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<NotificationGroup> findOne(Long id);

    /**
     * Delete the "id" notificationGroup.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
