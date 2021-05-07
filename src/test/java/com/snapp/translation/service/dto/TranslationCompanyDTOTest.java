package com.snapp.translation.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.snapp.translation.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TranslationCompanyDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TranslationCompanyDTO.class);
        TranslationCompanyDTO translationCompanyDTO1 = new TranslationCompanyDTO();
        translationCompanyDTO1.setId(1L);
        TranslationCompanyDTO translationCompanyDTO2 = new TranslationCompanyDTO();
        assertThat(translationCompanyDTO1).isNotEqualTo(translationCompanyDTO2);
        translationCompanyDTO2.setId(translationCompanyDTO1.getId());
        assertThat(translationCompanyDTO1).isEqualTo(translationCompanyDTO2);
        translationCompanyDTO2.setId(2L);
        assertThat(translationCompanyDTO1).isNotEqualTo(translationCompanyDTO2);
        translationCompanyDTO1.setId(null);
        assertThat(translationCompanyDTO1).isNotEqualTo(translationCompanyDTO2);
    }
}
