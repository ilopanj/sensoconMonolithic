package com.sensocon.core.service.mapper;

import com.sensocon.core.domain.*;
import com.sensocon.core.service.dto.SensorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Sensor and its DTO SensorDTO.
 */
@Mapper(componentModel = "spring", uses = {SensorGroupMapper.class, SensorDeviceMapper.class})
public interface SensorMapper extends EntityMapper<SensorDTO, Sensor> {

    @Mapping(source = "sensorGroup.id", target = "sensorGroupId")
    @Mapping(source = "sensorDevice.id", target = "sensorDeviceId")
    SensorDTO toDto(Sensor sensor);

    @Mapping(source = "sensorGroupId", target = "sensorGroup")
    @Mapping(target = "thresholds", ignore = true)
    @Mapping(source = "sensorDeviceId", target = "sensorDevice")
    Sensor toEntity(SensorDTO sensorDTO);

    default Sensor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Sensor sensor = new Sensor();
        sensor.setId(id);
        return sensor;
    }
}
