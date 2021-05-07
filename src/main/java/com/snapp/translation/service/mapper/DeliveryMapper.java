package com.snapp.translation.service.mapper;

import com.snapp.translation.domain.*;
import com.snapp.translation.service.dto.DeliveryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Delivery} and its DTO {@link DeliveryDTO}.
 */
@Mapper(componentModel = "spring", uses = { LocationMapper.class })
public interface DeliveryMapper extends EntityMapper<DeliveryDTO, Delivery> {
    @Mapping(target = "origin", source = "origin", qualifiedByName = "id")
    @Mapping(target = "destination", source = "destination", qualifiedByName = "id")
    DeliveryDTO toDto(Delivery s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DeliveryDTO toDtoId(Delivery delivery);
}
