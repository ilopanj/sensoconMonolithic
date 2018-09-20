package com.sensocon.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.codahale.metrics.graphite.Graphite;
import com.codahale.metrics.graphite.GraphiteSender;

@Configuration
public class GraphiteConfig {

	@Bean
	public GraphiteSender graphiteSender() {
	
		return new Graphite("localhost", 2003);
	}
}
