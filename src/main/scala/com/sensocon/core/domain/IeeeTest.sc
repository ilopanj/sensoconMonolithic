package com.sensocon.core
package domain

import scala.collection.JavaConverters._
import  service._
import  com.fasterxml.jackson.core
import com.fasterxml.jackson.databind.{DeserializationFeature, ObjectMapper}
import com.fasterxml.jackson.module.scala.experimental.ScalaObjectMapper
import com.fasterxml.jackson.module.scala.DefaultScalaModule


object IeeeTest {
  println("Welcome to the Scala worksheet")       //> Welcome to the Scala worksheet
  
  import MongoLoraPacket._
  
   
  val tempbuf = Array( 198, 237, 124, 66 ).toList.asJava
                                                  //> tempbuf  : java.util.List[Int] = [198, 237, 124, 66]
  val tempbuf2 = Array( 150, 200, 100, 66 ).toList.asJava
                                                  //> tempbuf2  : java.util.List[Int] = [150, 200, 100, 66]
  val tempbuf3 = Array( 199, 250, 100, 6 ).toList.asJava
                                                  //> tempbuf3  : java.util.List[Int] = [199, 250, 100, 6]
  val emptybuf = Array.empty[Int].toList.asJava   //> emptybuf  : java.util.List[Int] = []
  
   
  val floattemp = toDouble(tempbuf)               //> floattemp  : Option[Double] = Some(63.232200622558594)
  
  
	val  testPacket = new MongoLoraPacket{
  messageId = "msgid"
  deviceId = "abc123"
  applicationId= "xyz"
  dataRate= "fast"
  frequency= 915.0
  gatewayId= "gw"
  pressure= tempbuf2
  raw= new java.util.ArrayList[Double]
  rssi= -78.0
  temperature = tempbuf3
	 	
	}                                         //> testPacket  : com.sensocon.core.domain.MongoLoraPacket = com.sensocon.core.d
                                                  //| omain.IeeeTest$$anon$1@7a1ebcd8
	
 val mlist = MetricsService.extractTest(testPacket)
                                                  //> mlist  : List[Option[String]] = List(Some(sensor.abc123.pressurePsi 57.1958
                                                  //| 84704589844 1537387467
                                                  //| ), Some(sensor.abc123.temperatureFarenheit 4.3066276012304763E-35 153738746
                                                  //| 7
                                                  //| ), Some(sensor.abc123.RSSI -78.0 1537387467
                                                  //| ), None, None)
   
 val  metricsService = new MetricsServiceImpl     //> metricsService  : com.sensocon.core.service.MetricsServiceImpl = com.sensoc
                                                  //| on.core.service.MetricsServiceImpl@38bc8ab5
 val metrics = metricsService.extractMetrics(testPacket)
                                                  //> metrics  : java.util.List[String] = [sensor.abc123.pressurePsi 57.195884704
                                                  //| 589844 1537387467
                                                  //| , sensor.abc123.temperatureFarenheit 4.3066276012304763E-35 1537387467
                                                  //| , sensor.abc123.RSSI -78.0 1537387467
                                                  //| ]
}