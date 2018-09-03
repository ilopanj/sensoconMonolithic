package com.sensocon.core.service.mapper;

import com.sensocon.core.domain.*;
import com.sensocon.core.service.dto.CompanyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Company and its DTO CompanyDTO.
 */
@Mapper(componentModel = "spring", uses = {CompanySettingsMapper.class})
public interface CompanyMapper extends EntityMapper<CompanyDTO, Company> {

    @Mapping(source = "companySettings.id", target = "companySettingsId")
    CompanyDTO toDto(Company company);

    @Mapping(source = "companySettingsId", target = "companySettings")
    @Mapping(target = "locations", ignore = true)
    @Mapping(target = "sensorGroups", ignore = true)
    @Mapping(target = "contacts", ignore = true)
    @Mapping(target = "notificationGroups", ignore = true)
    Company toEntity(CompanyDTO companyDTO);

    default Company fromId(Long id) {
        if (id == null) {
            return null;
        }
        Company company = new Company();
        company.setId(id);
        return company;
    }
}
