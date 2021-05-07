package com.snapp.translation.service.mapper;

import com.snapp.translation.domain.*;
import com.snapp.translation.service.dto.DocumentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Document} and its DTO {@link DocumentDTO}.
 */
@Mapper(componentModel = "spring", uses = { OrderMapper.class, InvoiceMapper.class })
public interface DocumentMapper extends EntityMapper<DocumentDTO, Document> {
    @Mapping(target = "order", source = "order", qualifiedByName = "id")
    @Mapping(target = "invoice", source = "invoice", qualifiedByName = "id")
    DocumentDTO toDto(Document s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DocumentDTO toDtoId(Document document);
}
