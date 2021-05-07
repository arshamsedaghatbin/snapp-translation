package com.snapp.translation.service.mapper;

import com.snapp.translation.domain.*;
import com.snapp.translation.service.dto.DeliveryTimeSlotDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DeliveryTimeSlot} and its DTO {@link DeliveryTimeSlotDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DeliveryTimeSlotMapper extends EntityMapper<DeliveryTimeSlotDTO, DeliveryTimeSlot> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DeliveryTimeSlotDTO toDtoId(DeliveryTimeSlot deliveryTimeSlot);
}
