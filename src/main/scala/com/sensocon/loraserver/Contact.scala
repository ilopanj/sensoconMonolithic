package com.sensocon.loraserver

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import scala.beans.BeanProperty

@Document
class Contact {
  
  @Id
  @BeanProperty
  var emailAddress : String = ""

  @BeanProperty
  var firstName : String = ""
  
  @BeanProperty
  var lastName : String = ""
  
  @BeanProperty
  var cellPhone : String = ""

  
}