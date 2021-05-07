package com.snapp.translation.service;

import com.snapp.translation.service.dto.TranslationCompanyDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.snapp.translation.domain.TranslationCompany}.
 */
public interface TranslationCompanyService {
    /**
     * Save a translationCompany.
     *
     * @param translationCompanyDTO the entity to save.
     * @return the persisted entity.
     */
    TranslationCompanyDTO save(TranslationCompanyDTO translationCompanyDTO);

    /**
     * Partially updates a translationCompany.
     *
     * @param translationCompanyDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TranslationCompanyDTO> partialUpdate(TranslationCompanyDTO translationCompanyDTO);

    /**
     * Get all the translationCompanies.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TranslationCompanyDTO> findAll(Pageable pageable);

    /**
     * Get the "id" translationCompany.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TranslationCompanyDTO> findOne(Long id);

    /**
     * Delete the "id" translationCompany.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
