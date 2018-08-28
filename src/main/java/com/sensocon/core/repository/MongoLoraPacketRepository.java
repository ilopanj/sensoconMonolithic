package com.sensocon.core.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sensocon.core.domain.MongoLoraPacket;

public interface MongoLoraPacketRepository extends MongoRepository<MongoLoraPacket, String>
{

  public java.util.List<MongoLoraPacket> findByDeviceId(String deviceId);
}
