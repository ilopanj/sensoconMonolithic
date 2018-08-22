package com.sensocon.core.service;

import com.sensocon.core.service.dto.ContactDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Contact.
 */
public interface ContactService {

    /**
     * Save a contact.
     *
     * @param contactDTO the entity to save
     * @return the persisted entity
     */
    ContactDTO save(ContactDTO contactDTO);

    /**
     * Get all the contacts.
     *
     * @return the list of entities
     */
    List<ContactDTO> findAll();


    /**
     * Get the "id" contact.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ContactDTO> findOne(Long id);

    /**
     * Delete the "id" contact.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
