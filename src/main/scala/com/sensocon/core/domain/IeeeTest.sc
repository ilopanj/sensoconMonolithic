package com.sensocon.core.domain
import scala.collection.JavaConverters._

object IeeeTest {
  println("Welcome to the Scala worksheet")       //> Welcome to the Scala worksheet
  
  import MongoLoraPacket._
  
  
  val tempbuf = Array( 198, 237, 124, 66 ).toList.asJava
                                                  //> tempbuf  : java.util.List[Int] = [198, 237, 124, 66]
   
  val floattemp = toFloat(tempbuf)                //> floattemp  : Float = 63.2322
  

  
}