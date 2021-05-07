package com.snapp.translation.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.snapp.translation.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TranslationCompanyTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TranslationCompany.class);
        TranslationCompany translationCompany1 = new TranslationCompany();
        translationCompany1.setId(1L);
        TranslationCompany translationCompany2 = new TranslationCompany();
        translationCompany2.setId(translationCompany1.getId());
        assertThat(translationCompany1).isEqualTo(translationCompany2);
        translationCompany2.setId(2L);
        assertThat(translationCompany1).isNotEqualTo(translationCompany2);
        translationCompany1.setId(null);
        assertThat(translationCompany1).isNotEqualTo(translationCompany2);
    }
}
