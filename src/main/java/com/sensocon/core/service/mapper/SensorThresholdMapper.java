package com.sensocon.core.service.mapper;

import com.sensocon.core.domain.*;
import com.sensocon.core.service.dto.SensorThresholdDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SensorThreshold and its DTO SensorThresholdDTO.
 */
@Mapper(componentModel = "spring", uses = {SensorDeviceMapper.class, SensorMapper.class, SensorGroupMapper.class})
public interface SensorThresholdMapper extends EntityMapper<SensorThresholdDTO, SensorThreshold> {

    @Mapping(source = "sensorDevice.id", target = "sensorDeviceId")
    @Mapping(source = "sensor.id", target = "sensorId")
    @Mapping(source = "sensorGroup.id", target = "sensorGroupId")
    SensorThresholdDTO toDto(SensorThreshold sensorThreshold);

    @Mapping(source = "sensorDeviceId", target = "sensorDevice")
    @Mapping(source = "sensorId", target = "sensor")
    @Mapping(source = "sensorGroupId", target = "sensorGroup")
    SensorThreshold toEntity(SensorThresholdDTO sensorThresholdDTO);

    default SensorThreshold fromId(Long id) {
        if (id == null) {
            return null;
        }
        SensorThreshold sensorThreshold = new SensorThreshold();
        sensorThreshold.setId(id);
        return sensorThreshold;
    }
}
