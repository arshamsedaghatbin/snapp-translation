package com.snapp.translation.service.impl;

import com.snapp.translation.domain.TranslationCompany;
import com.snapp.translation.repository.TranslationCompanyRepository;
import com.snapp.translation.service.TranslationCompanyService;
import com.snapp.translation.service.dto.TranslationCompanyDTO;
import com.snapp.translation.service.mapper.TranslationCompanyMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TranslationCompany}.
 */
@Service
@Transactional
public class TranslationCompanyServiceImpl implements TranslationCompanyService {

    private final Logger log = LoggerFactory.getLogger(TranslationCompanyServiceImpl.class);

    private final TranslationCompanyRepository translationCompanyRepository;

    private final TranslationCompanyMapper translationCompanyMapper;

    public TranslationCompanyServiceImpl(
        TranslationCompanyRepository translationCompanyRepository,
        TranslationCompanyMapper translationCompanyMapper
    ) {
        this.translationCompanyRepository = translationCompanyRepository;
        this.translationCompanyMapper = translationCompanyMapper;
    }

    @Override
    public TranslationCompanyDTO save(TranslationCompanyDTO translationCompanyDTO) {
        log.debug("Request to save TranslationCompany : {}", translationCompanyDTO);
        TranslationCompany translationCompany = translationCompanyMapper.toEntity(translationCompanyDTO);
        translationCompany = translationCompanyRepository.save(translationCompany);
        return translationCompanyMapper.toDto(translationCompany);
    }

    @Override
    public Optional<TranslationCompanyDTO> partialUpdate(TranslationCompanyDTO translationCompanyDTO) {
        log.debug("Request to partially update TranslationCompany : {}", translationCompanyDTO);

        return translationCompanyRepository
            .findById(translationCompanyDTO.getId())
            .map(
                existingTranslationCompany -> {
                    translationCompanyMapper.partialUpdate(existingTranslationCompany, translationCompanyDTO);
                    return existingTranslationCompany;
                }
            )
            .map(translationCompanyRepository::save)
            .map(translationCompanyMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TranslationCompanyDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TranslationCompanies");
        return translationCompanyRepository.findAll(pageable).map(translationCompanyMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TranslationCompanyDTO> findOne(Long id) {
        log.debug("Request to get TranslationCompany : {}", id);
        return translationCompanyRepository.findById(id).map(translationCompanyMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TranslationCompany : {}", id);
        translationCompanyRepository.deleteById(id);
    }
}
