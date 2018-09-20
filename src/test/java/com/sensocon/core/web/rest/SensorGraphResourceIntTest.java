package com.sensocon.core.web.rest;

import com.sensocon.core.SensoconMonolithicApp;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the SensorGraphResource REST controller.
 *
 * @see SensorGraphResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SensoconMonolithicApp.class)
public class SensorGraphResourceIntTest {

    private MockMvc restMockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        SensorGraphResource sensorGraphResource = new SensorGraphResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(sensorGraphResource)
            .build();
    }

    /**
    * Test viewDevice
    */
    @Test
    public void testViewDevice() throws Exception {
        restMockMvc.perform(get("/api/sensor-graph/view-device"))
            .andExpect(status().isOk());
    }

}
