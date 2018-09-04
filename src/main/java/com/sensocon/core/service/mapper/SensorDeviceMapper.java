package com.sensocon.core.service.mapper;

import com.sensocon.core.domain.*;
import com.sensocon.core.service.dto.SensorDeviceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SensorDevice and its DTO SensorDeviceDTO.
 */
@Mapper(componentModel = "spring", uses = {NotificationGroupMapper.class, LocationMapper.class})
public interface SensorDeviceMapper extends EntityMapper<SensorDeviceDTO, SensorDevice> {

    @Mapping(source = "notificationGroup.id", target = "notificationGroupId")
    @Mapping(source = "location.id", target = "locationId")
    SensorDeviceDTO toDto(SensorDevice sensorDevice);

    @Mapping(target = "sensors", ignore = true)
    @Mapping(target = "thresholds", ignore = true)
    @Mapping(target = "packets", ignore = true)
    @Mapping(source = "notificationGroupId", target = "notificationGroup")
    @Mapping(source = "locationId", target = "location")
    SensorDevice toEntity(SensorDeviceDTO sensorDeviceDTO);

    default SensorDevice fromId(Long id) {
        if (id == null) {
            return null;
        }
        SensorDevice sensorDevice = new SensorDevice();
        sensorDevice.setId(id);
        return sensorDevice;
    }
}
