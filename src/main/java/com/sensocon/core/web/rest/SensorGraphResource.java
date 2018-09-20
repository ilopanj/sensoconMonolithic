package com.sensocon.core.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * SensorGraphResource controller
 */
@RestController
@RequestMapping("/api/sensor-graph")
public class SensorGraphResource {

    private final Logger log = LoggerFactory.getLogger(SensorGraphResource.class);

    /**
    * GET viewDevice
    */
    @GetMapping("/view-device")
    public String viewDevice() {
        return "viewDevice";
    }

}
