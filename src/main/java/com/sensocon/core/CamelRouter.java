/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.sensocon.core;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.websocket.WebsocketComponent;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mongodb.MongoClient;
import com.sensocon.core.config.LoraHelper;
import com.sensocon.core.domain.MongoLoraPacket;
import com.sensocon.core.repository.MongoLoraPacketRepository;
import com.sensocon.core.service.MetricsService;

/**
 */
@Component
public class CamelRouter extends RouteBuilder {

    private int port = 9999;
    
    @Autowired
    private MongoLoraPacketRepository loraRepo;

   
    @Autowired
    private MongoClient myDb;
  
    @Autowired 
    private LoraHelper helper;
    
    @Autowired
    private MetricsService metricsService;
    
    @Override
    public void configure() throws Exception {

        // @formatter:off
		//
        WebsocketComponent wc = getContext().getComponent("websocket", WebsocketComponent.class);
		wc.setStaticResources("classpath:.");
		wc.setPort(port);
		
		this.getContext().setStreamCaching(true);
	

        // this can also be configured in application.properties
        restConfiguration()
            .component("servlet")
            .port(8080)
           ;


        rest("/lora").description("LoRa data service")
			.post("/packet").description("Post MEMS data")
				.to("direct:loraPacket")
			.get()
				.to("direct:loraPacket_all")
        		.get("/{id}").description("Get packets by MOTE id")
        			.to("direct:loraPacket_find");
        			
		
        from("direct:loraPacket")
        		.unmarshal().json(JsonLibrary.Jackson, MongoLoraPacket.class)
        		.multicast().parallelProcessing()
        			.to("direct:loraPacket_persistenceMongo")
        			.to("direct:loraPacket_persistenceGraphite")
        			.to("direct:loraPacket_websocket");
       
        from("direct:loraPacket_websocket")
        		.marshal().json(JsonLibrary.Jackson)
        		.to("websocket://lora?sendToAll=true");
        
        from("direct:loraPacket_persistenceMongo")
        		.bean(loraRepo, "save");
        
        from("direct:loraPacket_persistenceGraphite")
        		.bean(metricsService, "save");
       
        from("direct:loraPacket_find").bean(loraRepo, "findByDeviceId(${header.id})")
        		.marshal().json(JsonLibrary.Jackson);
        
        from("direct:loraPacket_all").bean(helper, "findAll")
        		.marshal().json(JsonLibrary.Jackson);
        	
        // @formatter:on
    }

}
