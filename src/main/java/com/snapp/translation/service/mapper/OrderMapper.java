package com.snapp.translation.service.mapper;

import com.snapp.translation.domain.*;
import com.snapp.translation.service.dto.OrderDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring", uses = { DeliveryMapper.class, TranslationCompanyMapper.class, DeliveryTimeSlotMapper.class })
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {
    @Mapping(target = "delivery", source = "delivery", qualifiedByName = "id")
    @Mapping(target = "handOver", source = "handOver", qualifiedByName = "id")
    @Mapping(target = "translationCompany", source = "translationCompany", qualifiedByName = "id")
    @Mapping(target = "deliveryTimeSlot", source = "deliveryTimeSlot", qualifiedByName = "id")
    OrderDTO toDto(Order s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OrderDTO toDtoId(Order order);
}
