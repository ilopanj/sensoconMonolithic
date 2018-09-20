package com.sensocon.core.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.core.SimpleMongoDbFactory
import org.springframework.stereotype.Service

import com.mongodb.MongoClient
import com.sensocon.core.domain.MongoLoraPacket
import com.sensocon.core.repository.MongoLoraPacketRepository
import org.springframework.data.domain.PageRequest

@Configuration
class MongoConfig {
  val client = new MongoClient("test.sensocon.com")
 
  @Bean
  def myDb = client 
  
  @Bean
  def mongoDbFactory() = new SimpleMongoDbFactory(client, "sensocon_dev")
}


trait LoraHelper
{
  def findAll(pageable: Pageable) : Page[MongoLoraPacket]
  def findAll: java.util.List[MongoLoraPacket]
}


@Service
class LoraHelperImpl extends LoraHelper
{
  @Autowired
  var repo : MongoLoraPacketRepository = null
  
  def findAll(pageable: Pageable) = repo.findAll(pageable)
  def findAll = repo.findAll(PageRequest.of(0, 50) ).getContent
  def findByDeviceId(deviceId : String) = repo.findByDeviceId(deviceId, PageRequest.of(0, 50)).getContent
 
}
