package com.sensocon.loraserver

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.sensocon.core.repository.MongoLoraPacketRepository;
import com.sensocon.core.domain.LoraPacket

trait xLoraPacketRepository extends MongoRepository[LoraPacket, String]
{
   
  def findByDeviceId(deviceId : String) : java.util.List[LoraPacket]

}

