package com.sensocon.core
package service

import scalaz._
import Scalaz._
import scala.collection.JavaConverters._
import domain._

import org.springframework.stereotype.Service
import org.springframework.beans.factory.annotation.Autowired
import com.codahale.metrics.graphite.GraphiteSender

trait MetricsService
{
 //def extractMetrics(packet : MongoLoraPacket) : java.util.List[String]
 
 def save(packet : MongoLoraPacket) : Unit
}

@Service
class MetricsServiceImpl extends MetricsService {

  import MetricsService._
 
  @Autowired
  var graphiteSender : GraphiteSender = _
  
   def extractMetrics(packet : MongoLoraPacket) = extractMetricsHelper(packet)
   
   def save(packet : MongoLoraPacket) : Unit = {
   
    extractMetrics(packet).foreach( m => graphiteSender.send(m._1, m._2, m._3))
  }
  
  private def extractMetricsHelper(packet: MongoLoraPacket) = MetricsService.extractMetricsHelper(packet)
   
}

object MetricsService
{
  def metricsList = {
    Array(
      buildMetric("pressurePsi", (p) => p.pressurePsi ),
      buildMetric("temperatureFarenheit", (p) => p.temperatureFarenheit ),
      buildMetric("RSSI", (p) => Some(p.rssi) ),
      buildMetric("humidityPercent", (p) => p.humidityPercent ),
      buildMetric("batteryPercent", (p) => p.batteryPercent )
    ).toList
  }
 
  def extractTest(packet: MongoLoraPacket) = metricsList.map(_.apply(packet))
  
  def extractMetricsHelper(packet : MongoLoraPacket) = {
    metricsList.map(_.apply(packet)).flatten
  }

  def metricBaseName(packet: MongoLoraPacket) = Array("sensor", packet.deviceId.replaceAll("-", "")).toList.mkString(".")
  
  
  def buildMetric(name: String, extractor: (MongoLoraPacket) => Option[Double] ) = 
    (p : MongoLoraPacket) => {
 
    val metric = extractor(p)
    val metricBase = metricBaseName(p)
   val  metricName = metricBase ++ name 
   
    metric.map(metricVal => (metricBaseName(p).concat(".").concat(name), 
      metricVal.toString, p.timestamp.getEpochSecond) )
    
  }
  
  
}