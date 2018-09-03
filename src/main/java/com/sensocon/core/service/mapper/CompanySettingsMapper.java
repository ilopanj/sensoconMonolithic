package com.sensocon.core.service.mapper;

import com.sensocon.core.domain.*;
import com.sensocon.core.service.dto.CompanySettingsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CompanySettings and its DTO CompanySettingsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CompanySettingsMapper extends EntityMapper<CompanySettingsDTO, CompanySettings> {


    @Mapping(target = "company", ignore = true)
    CompanySettings toEntity(CompanySettingsDTO companySettingsDTO);

    default CompanySettings fromId(Long id) {
        if (id == null) {
            return null;
        }
        CompanySettings companySettings = new CompanySettings();
        companySettings.setId(id);
        return companySettings;
    }
}
