package com.snapp.translation.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TranslationCompanyMapperTest {

    private TranslationCompanyMapper translationCompanyMapper;

    @BeforeEach
    public void setUp() {
        translationCompanyMapper = new TranslationCompanyMapperImpl();
    }
}
