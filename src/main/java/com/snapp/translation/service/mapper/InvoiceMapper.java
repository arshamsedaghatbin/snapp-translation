package com.snapp.translation.service.mapper;

import com.snapp.translation.domain.*;
import com.snapp.translation.service.dto.InvoiceDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Invoice} and its DTO {@link InvoiceDTO}.
 */
@Mapper(componentModel = "spring", uses = { DeliveryMapper.class })
public interface InvoiceMapper extends EntityMapper<InvoiceDTO, Invoice> {
    @Mapping(target = "handOver", source = "handOver", qualifiedByName = "id")
    @Mapping(target = "delivery", source = "delivery", qualifiedByName = "id")
    InvoiceDTO toDto(Invoice s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    InvoiceDTO toDtoId(Invoice invoice);
}
