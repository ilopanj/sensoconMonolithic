package com.sensocon.core.service.impl;

import com.sensocon.core.service.ContactService;
import com.sensocon.core.domain.Contact;
import com.sensocon.core.repository.ContactRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Contact.
 */
@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    private final Logger log = LoggerFactory.getLogger(ContactServiceImpl.class);

    private final ContactRepository contactRepository;

    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    /**
     * Save a contact.
     *
     * @param contact the entity to save
     * @return the persisted entity
     */
    @Override
    public Contact save(Contact contact) {
        log.debug("Request to save Contact : {}", contact);        return contactRepository.save(contact);
    }

    /**
     * Get all the contacts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Contact> findAll() {
        log.debug("Request to get all Contacts");
        return contactRepository.findAll();
    }


    /**
     * Get one contact by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Contact> findOne(Long id) {
        log.debug("Request to get Contact : {}", id);
        return contactRepository.findById(id);
    }

    /**
     * Delete the contact by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Contact : {}", id);
        contactRepository.deleteById(id);
    }
}
