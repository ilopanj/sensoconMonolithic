package com.sensocon.core.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sensocon.core.domain.NotificationGroup;
import com.sensocon.core.service.NotificationGroupService;
import com.sensocon.core.web.rest.errors.BadRequestAlertException;
import com.sensocon.core.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing NotificationGroup.
 */
@RestController
@RequestMapping("/api")
public class NotificationGroupResource {

    private final Logger log = LoggerFactory.getLogger(NotificationGroupResource.class);

    private static final String ENTITY_NAME = "notificationGroup";

    private final NotificationGroupService notificationGroupService;

    public NotificationGroupResource(NotificationGroupService notificationGroupService) {
        this.notificationGroupService = notificationGroupService;
    }

    /**
     * POST  /notification-groups : Create a new notificationGroup.
     *
     * @param notificationGroup the notificationGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new notificationGroup, or with status 400 (Bad Request) if the notificationGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/notification-groups")
    @Timed
    public ResponseEntity<NotificationGroup> createNotificationGroup(@RequestBody NotificationGroup notificationGroup) throws URISyntaxException {
        log.debug("REST request to save NotificationGroup : {}", notificationGroup);
        if (notificationGroup.getId() != null) {
            throw new BadRequestAlertException("A new notificationGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NotificationGroup result = notificationGroupService.save(notificationGroup);
        return ResponseEntity.created(new URI("/api/notification-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /notification-groups : Updates an existing notificationGroup.
     *
     * @param notificationGroup the notificationGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated notificationGroup,
     * or with status 400 (Bad Request) if the notificationGroup is not valid,
     * or with status 500 (Internal Server Error) if the notificationGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/notification-groups")
    @Timed
    public ResponseEntity<NotificationGroup> updateNotificationGroup(@RequestBody NotificationGroup notificationGroup) throws URISyntaxException {
        log.debug("REST request to update NotificationGroup : {}", notificationGroup);
        if (notificationGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NotificationGroup result = notificationGroupService.save(notificationGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, notificationGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /notification-groups : get all the notificationGroups.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of notificationGroups in body
     */
    @GetMapping("/notification-groups")
    @Timed
    public List<NotificationGroup> getAllNotificationGroups(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all NotificationGroups");
        return notificationGroupService.findAll();
    }

    /**
     * GET  /notification-groups/:id : get the "id" notificationGroup.
     *
     * @param id the id of the notificationGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the notificationGroup, or with status 404 (Not Found)
     */
    @GetMapping("/notification-groups/{id}")
    @Timed
    public ResponseEntity<NotificationGroup> getNotificationGroup(@PathVariable Long id) {
        log.debug("REST request to get NotificationGroup : {}", id);
        Optional<NotificationGroup> notificationGroup = notificationGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(notificationGroup);
    }

    /**
     * DELETE  /notification-groups/:id : delete the "id" notificationGroup.
     *
     * @param id the id of the notificationGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/notification-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteNotificationGroup(@PathVariable Long id) {
        log.debug("REST request to delete NotificationGroup : {}", id);
        notificationGroupService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
