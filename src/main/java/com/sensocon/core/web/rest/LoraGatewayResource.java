package com.sensocon.core.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sensocon.core.domain.LoraGateway;
import com.sensocon.core.service.LoraGatewayService;
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
 * REST controller for managing LoraGateway.
 */
@RestController
@RequestMapping("/api")
public class LoraGatewayResource {

    private final Logger log = LoggerFactory.getLogger(LoraGatewayResource.class);

    private static final String ENTITY_NAME = "loraGateway";

    private final LoraGatewayService loraGatewayService;

    public LoraGatewayResource(LoraGatewayService loraGatewayService) {
        this.loraGatewayService = loraGatewayService;
    }

    /**
     * POST  /lora-gateways : Create a new loraGateway.
     *
     * @param loraGateway the loraGateway to create
     * @return the ResponseEntity with status 201 (Created) and with body the new loraGateway, or with status 400 (Bad Request) if the loraGateway has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lora-gateways")
    @Timed
    public ResponseEntity<LoraGateway> createLoraGateway(@RequestBody LoraGateway loraGateway) throws URISyntaxException {
        log.debug("REST request to save LoraGateway : {}", loraGateway);
        if (loraGateway.getId() != null) {
            throw new BadRequestAlertException("A new loraGateway cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LoraGateway result = loraGatewayService.save(loraGateway);
        return ResponseEntity.created(new URI("/api/lora-gateways/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lora-gateways : Updates an existing loraGateway.
     *
     * @param loraGateway the loraGateway to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated loraGateway,
     * or with status 400 (Bad Request) if the loraGateway is not valid,
     * or with status 500 (Internal Server Error) if the loraGateway couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lora-gateways")
    @Timed
    public ResponseEntity<LoraGateway> updateLoraGateway(@RequestBody LoraGateway loraGateway) throws URISyntaxException {
        log.debug("REST request to update LoraGateway : {}", loraGateway);
        if (loraGateway.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LoraGateway result = loraGatewayService.save(loraGateway);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, loraGateway.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lora-gateways : get all the loraGateways.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of loraGateways in body
     */
    @GetMapping("/lora-gateways")
    @Timed
    public List<LoraGateway> getAllLoraGateways() {
        log.debug("REST request to get all LoraGateways");
        return loraGatewayService.findAll();
    }

    /**
     * GET  /lora-gateways/:id : get the "id" loraGateway.
     *
     * @param id the id of the loraGateway to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the loraGateway, or with status 404 (Not Found)
     */
    @GetMapping("/lora-gateways/{id}")
    @Timed
    public ResponseEntity<LoraGateway> getLoraGateway(@PathVariable Long id) {
        log.debug("REST request to get LoraGateway : {}", id);
        Optional<LoraGateway> loraGateway = loraGatewayService.findOne(id);
        return ResponseUtil.wrapOrNotFound(loraGateway);
    }

    /**
     * DELETE  /lora-gateways/:id : delete the "id" loraGateway.
     *
     * @param id the id of the loraGateway to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lora-gateways/{id}")
    @Timed
    public ResponseEntity<Void> deleteLoraGateway(@PathVariable Long id) {
        log.debug("REST request to delete LoraGateway : {}", id);
        loraGatewayService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
