package com.snapp.translation.service.mapper;

import com.snapp.translation.domain.*;
import com.snapp.translation.service.dto.TranslationCompanyDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TranslationCompany} and its DTO {@link TranslationCompanyDTO}.
 */
@Mapper(componentModel = "spring", uses = { LocationMapper.class })
public interface TranslationCompanyMapper extends EntityMapper<TranslationCompanyDTO, TranslationCompany> {
    @Mapping(target = "location", source = "location", qualifiedByName = "id")
    TranslationCompanyDTO toDto(TranslationCompany s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TranslationCompanyDTO toDtoId(TranslationCompany translationCompany);
}
