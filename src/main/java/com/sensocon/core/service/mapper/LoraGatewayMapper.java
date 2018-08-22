package com.sensocon.core.service.mapper;

import com.sensocon.core.domain.*;
import com.sensocon.core.service.dto.LoraGatewayDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LoraGateway and its DTO LoraGatewayDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LoraGatewayMapper extends EntityMapper<LoraGatewayDTO, LoraGateway> {



    default LoraGateway fromId(Long id) {
        if (id == null) {
            return null;
        }
        LoraGateway loraGateway = new LoraGateway();
        loraGateway.setId(id);
        return loraGateway;
    }
}
