package com.snapp.translation.repository;

import com.snapp.translation.domain.TranslationCompany;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TranslationCompany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TranslationCompanyRepository extends JpaRepository<TranslationCompany, Long> {}
