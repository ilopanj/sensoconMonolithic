package com.sensocon.core.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.sensocon.core.domain.MongoLoraPacket;

public interface MongoLoraPacketRepository extends PagingAndSortingRepository<MongoLoraPacket, String>
{

  public Page<MongoLoraPacket> findByDeviceId(String deviceId, Pageable pageable);
}
