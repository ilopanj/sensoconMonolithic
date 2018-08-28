package com.sensocon.loraserver

import org.springframework.data.mongodb.repository.MongoRepository

trait ContactRepository extends MongoRepository[Contact, String]{
  
}