package com.sensocon.core.service.mapper;

import com.sensocon.core.domain.*;
import com.sensocon.core.service.dto.SensorGroupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SensorGroup and its DTO SensorGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {CompanyMapper.class})
public interface SensorGroupMapper extends EntityMapper<SensorGroupDTO, SensorGroup> {

    @Mapping(source = "company.id", target = "companyId")
    SensorGroupDTO toDto(SensorGroup sensorGroup);

    @Mapping(target = "defaultThresholds", ignore = true)
    @Mapping(target = "sensor", ignore = true)
    @Mapping(source = "companyId", target = "company")
    SensorGroup toEntity(SensorGroupDTO sensorGroupDTO);

    default SensorGroup fromId(Long id) {
        if (id == null) {
            return null;
        }
        SensorGroup sensorGroup = new SensorGroup();
        sensorGroup.setId(id);
        return sensorGroup;
    }
}
