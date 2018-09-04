package com.sensocon.core.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sensocon.core.domain.SensorThreshold;
import com.sensocon.core.service.SensorThresholdService;
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
 * REST controller for managing SensorThreshold.
 */
@RestController
@RequestMapping("/api")
public class SensorThresholdResource {

    private final Logger log = LoggerFactory.getLogger(SensorThresholdResource.class);

    private static final String ENTITY_NAME = "sensorThreshold";

    private final SensorThresholdService sensorThresholdService;

    public SensorThresholdResource(SensorThresholdService sensorThresholdService) {
        this.sensorThresholdService = sensorThresholdService;
    }

    /**
     * POST  /sensor-thresholds : Create a new sensorThreshold.
     *
     * @param sensorThreshold the sensorThreshold to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sensorThreshold, or with status 400 (Bad Request) if the sensorThreshold has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sensor-thresholds")
    @Timed
    public ResponseEntity<SensorThreshold> createSensorThreshold(@RequestBody SensorThreshold sensorThreshold) throws URISyntaxException {
        log.debug("REST request to save SensorThreshold : {}", sensorThreshold);
        if (sensorThreshold.getId() != null) {
            throw new BadRequestAlertException("A new sensorThreshold cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SensorThreshold result = sensorThresholdService.save(sensorThreshold);
        return ResponseEntity.created(new URI("/api/sensor-thresholds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sensor-thresholds : Updates an existing sensorThreshold.
     *
     * @param sensorThreshold the sensorThreshold to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sensorThreshold,
     * or with status 400 (Bad Request) if the sensorThreshold is not valid,
     * or with status 500 (Internal Server Error) if the sensorThreshold couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sensor-thresholds")
    @Timed
    public ResponseEntity<SensorThreshold> updateSensorThreshold(@RequestBody SensorThreshold sensorThreshold) throws URISyntaxException {
        log.debug("REST request to update SensorThreshold : {}", sensorThreshold);
        if (sensorThreshold.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SensorThreshold result = sensorThresholdService.save(sensorThreshold);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sensorThreshold.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sensor-thresholds : get all the sensorThresholds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sensorThresholds in body
     */
    @GetMapping("/sensor-thresholds")
    @Timed
    public List<SensorThreshold> getAllSensorThresholds() {
        log.debug("REST request to get all SensorThresholds");
        return sensorThresholdService.findAll();
    }

    /**
     * GET  /sensor-thresholds/:id : get the "id" sensorThreshold.
     *
     * @param id the id of the sensorThreshold to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sensorThreshold, or with status 404 (Not Found)
     */
    @GetMapping("/sensor-thresholds/{id}")
    @Timed
    public ResponseEntity<SensorThreshold> getSensorThreshold(@PathVariable Long id) {
        log.debug("REST request to get SensorThreshold : {}", id);
        Optional<SensorThreshold> sensorThreshold = sensorThresholdService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sensorThreshold);
    }

    /**
     * DELETE  /sensor-thresholds/:id : delete the "id" sensorThreshold.
     *
     * @param id the id of the sensorThreshold to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sensor-thresholds/{id}")
    @Timed
    public ResponseEntity<Void> deleteSensorThreshold(@PathVariable Long id) {
        log.debug("REST request to delete SensorThreshold : {}", id);
        sensorThresholdService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
