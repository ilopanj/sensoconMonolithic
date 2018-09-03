package com.sensocon.loraserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.sensocon.core.repository.MongoLoraPacketRepository;


public class LoraserverApplication {
	
@Autowired
private MongoLoraPacketRepository loraRepository;

@Autowired
private ContactRepository contactRepo ;

	public static void main(String[] args) {
		SpringApplication.run(LoraserverApplication.class, args);
	}
}
