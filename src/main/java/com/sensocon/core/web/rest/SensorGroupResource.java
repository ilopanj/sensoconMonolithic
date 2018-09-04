package com.sensocon.core.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sensocon.core.domain.SensorGroup;
import com.sensocon.core.service.SensorGroupService;
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
 * REST controller for managing SensorGroup.
 */
@RestController
@RequestMapping("/api")
public class SensorGroupResource {

    private final Logger log = LoggerFactory.getLogger(SensorGroupResource.class);

    private static final String ENTITY_NAME = "sensorGroup";

    private final SensorGroupService sensorGroupService;

    public SensorGroupResource(SensorGroupService sensorGroupService) {
        this.sensorGroupService = sensorGroupService;
    }

    /**
     * POST  /sensor-groups : Create a new sensorGroup.
     *
     * @param sensorGroup the sensorGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sensorGroup, or with status 400 (Bad Request) if the sensorGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sensor-groups")
    @Timed
    public ResponseEntity<SensorGroup> createSensorGroup(@RequestBody SensorGroup sensorGroup) throws URISyntaxException {
        log.debug("REST request to save SensorGroup : {}", sensorGroup);
        if (sensorGroup.getId() != null) {
            throw new BadRequestAlertException("A new sensorGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SensorGroup result = sensorGroupService.save(sensorGroup);
        return ResponseEntity.created(new URI("/api/sensor-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sensor-groups : Updates an existing sensorGroup.
     *
     * @param sensorGroup the sensorGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sensorGroup,
     * or with status 400 (Bad Request) if the sensorGroup is not valid,
     * or with status 500 (Internal Server Error) if the sensorGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sensor-groups")
    @Timed
    public ResponseEntity<SensorGroup> updateSensorGroup(@RequestBody SensorGroup sensorGroup) throws URISyntaxException {
        log.debug("REST request to update SensorGroup : {}", sensorGroup);
        if (sensorGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SensorGroup result = sensorGroupService.save(sensorGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sensorGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sensor-groups : get all the sensorGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sensorGroups in body
     */
    @GetMapping("/sensor-groups")
    @Timed
    public List<SensorGroup> getAllSensorGroups() {
        log.debug("REST request to get all SensorGroups");
        return sensorGroupService.findAll();
    }

    /**
     * GET  /sensor-groups/:id : get the "id" sensorGroup.
     *
     * @param id the id of the sensorGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sensorGroup, or with status 404 (Not Found)
     */
    @GetMapping("/sensor-groups/{id}")
    @Timed
    public ResponseEntity<SensorGroup> getSensorGroup(@PathVariable Long id) {
        log.debug("REST request to get SensorGroup : {}", id);
        Optional<SensorGroup> sensorGroup = sensorGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sensorGroup);
    }

    /**
     * DELETE  /sensor-groups/:id : delete the "id" sensorGroup.
     *
     * @param id the id of the sensorGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sensor-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteSensorGroup(@PathVariable Long id) {
        log.debug("REST request to delete SensorGroup : {}", id);
        sensorGroupService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
