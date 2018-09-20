package com.sensocon.core
package domain
import scalaz._
import Scalaz._
import scala.beans.BeanProperty
import scala.collection.JavaConverters._
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.annotation.Id
import java.time.Instant
import com.fasterxml.jackson.annotation.JsonGetter


@Document
class MongoLoraPacket
{
  import MongoLoraPacket._
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
  var pressure: java.util.List[Int] = new java.util.ArrayList[Int] 
  @BeanProperty
  var raw: java.util.List[Double] = new java.util.ArrayList[Double] 
  @BeanProperty
  var rssi: Double = 0.0
  @BeanProperty
  var temperature: java.util.List[Int] = new java.util.ArrayList[Int] 
  @BeanProperty
  var humidity: java.util.List[Int] = new java.util.ArrayList[Int] 
  @BeanProperty
  var battery: java.util.List[Int] = new java.util.ArrayList[Int] 
  @BeanProperty
  var timestamp: Instant  = Instant.now 
  
  @JsonGetter
  def temperatureFarenheit = toDouble(temperature)
  
  @JsonGetter
  def humidityPercent = toDouble(humidity)
  
  @JsonGetter
  def batteryPercent = toDouble(battery)
  
  @JsonGetter
  def pressurePsi = toDouble(pressure)
}

object MongoLoraPacket
{
  
  /** extract an integer at position bp from buf
   */
  def getInt(buf: List[Int]): Int =
    ((buf(3  ) & 0xff) << 24) +
    ((buf(2) & 0xff) << 16) +
    ((buf(1) & 0xff) << 8) +
     (buf(0) & 0xff)
     
  def toDouble(buf: java.util.List[Int]) = {
   
    if (buf.size() == 4 ) 
      Some(java.lang.Float.intBitsToFloat(getInt(buf.asScala.toList)).toDouble) 
    else 
      None
  }
  
}