package com.sensocon.core.service.mapper;

import com.sensocon.core.domain.*;
import com.sensocon.core.service.dto.NotificationGroupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity NotificationGroup and its DTO NotificationGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {ContactMapper.class, CompanyMapper.class})
public interface NotificationGroupMapper extends EntityMapper<NotificationGroupDTO, NotificationGroup> {

    @Mapping(source = "company.id", target = "companyId")
    NotificationGroupDTO toDto(NotificationGroup notificationGroup);

    @Mapping(target = "sensorDevices", ignore = true)
    @Mapping(source = "companyId", target = "company")
    NotificationGroup toEntity(NotificationGroupDTO notificationGroupDTO);

    default NotificationGroup fromId(Long id) {
        if (id == null) {
            return null;
        }
        NotificationGroup notificationGroup = new NotificationGroup();
        notificationGroup.setId(id);
        return notificationGroup;
    }
}
