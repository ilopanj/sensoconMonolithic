package com.sensocon.core.domain

import scala.beans.BeanProperty
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.annotation.Id
import java.time.Instant


@Document
class MongoLoraPacket
{
    @Id
  @BeanProperty
  var messageId: String = ""
  @BeanProperty
  var deviceId: String = ""
  @BeanProperty
  var applicationId: String  = ""
  @BeanProperty
  var dataRate: String = "" 
  @BeanProperty
  var frequency: Double = 0.0
  @BeanProperty
  var gatewayId: String = ""
  @BeanProperty
  var pressure: java.util.List[Double] = new java.util.ArrayList[Double] 
  @BeanProperty
  var raw: java.util.List[Double] = new java.util.ArrayList[Double] 
  @BeanProperty
  var rssi: Double = 0.0
  @BeanProperty
  var temperature: java.util.List[Double] = new java.util.ArrayList[Double] 
  @BeanProperty
  var timestamp: Instant  = Instant.now 
} 