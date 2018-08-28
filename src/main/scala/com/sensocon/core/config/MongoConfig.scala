package com.sensocon.core.config

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Bean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import com.mongodb.MongoClient
import org.springframework.data.mongodb.core.SimpleMongoDbFactory
import com.sensocon.core.domain.MongoLoraPacket
import com.sensocon.core.repository.MongoLoraPacketRepository

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
  def findAll : java.util.List[MongoLoraPacket]
}


@Service
class LoraHelperImpl extends LoraHelper
{
  @Autowired
  var repo : MongoLoraPacketRepository = null
  
 
  def findAll = repo.findAll 
  
}
