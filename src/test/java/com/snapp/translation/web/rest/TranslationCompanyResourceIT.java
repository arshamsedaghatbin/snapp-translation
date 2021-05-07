package com.snapp.translation.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.snapp.translation.IntegrationTest;
import com.snapp.translation.domain.TranslationCompany;
import com.snapp.translation.repository.TranslationCompanyRepository;
import com.snapp.translation.service.dto.TranslationCompanyDTO;
import com.snapp.translation.service.mapper.TranslationCompanyMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TranslationCompanyResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TranslationCompanyResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_SECOND_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SECOND_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/translation-companies";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TranslationCompanyRepository translationCompanyRepository;

    @Autowired
    private TranslationCompanyMapper translationCompanyMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTranslationCompanyMockMvc;

    private TranslationCompany translationCompany;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TranslationCompany createEntity(EntityManager em) {
        TranslationCompany translationCompany = new TranslationCompany()
            .name(DEFAULT_NAME)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .secondPhoneNumber(DEFAULT_SECOND_PHONE_NUMBER);
        return translationCompany;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TranslationCompany createUpdatedEntity(EntityManager em) {
        TranslationCompany translationCompany = new TranslationCompany()
            .name(UPDATED_NAME)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .secondPhoneNumber(UPDATED_SECOND_PHONE_NUMBER);
        return translationCompany;
    }

    @BeforeEach
    public void initTest() {
        translationCompany = createEntity(em);
    }

    @Test
    @Transactional
    void createTranslationCompany() throws Exception {
        int databaseSizeBeforeCreate = translationCompanyRepository.findAll().size();
        // Create the TranslationCompany
        TranslationCompanyDTO translationCompanyDTO = translationCompanyMapper.toDto(translationCompany);
        restTranslationCompanyMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(translationCompanyDTO))
            )
            .andExpect(status().isCreated());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeCreate + 1);
        TranslationCompany testTranslationCompany = translationCompanyList.get(translationCompanyList.size() - 1);
        assertThat(testTranslationCompany.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTranslationCompany.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testTranslationCompany.getSecondPhoneNumber()).isEqualTo(DEFAULT_SECOND_PHONE_NUMBER);
    }

    @Test
    @Transactional
    void createTranslationCompanyWithExistingId() throws Exception {
        // Create the TranslationCompany with an existing ID
        translationCompany.setId(1L);
        TranslationCompanyDTO translationCompanyDTO = translationCompanyMapper.toDto(translationCompany);

        int databaseSizeBeforeCreate = translationCompanyRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTranslationCompanyMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(translationCompanyDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTranslationCompanies() throws Exception {
        // Initialize the database
        translationCompanyRepository.saveAndFlush(translationCompany);

        // Get all the translationCompanyList
        restTranslationCompanyMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(translationCompany.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].secondPhoneNumber").value(hasItem(DEFAULT_SECOND_PHONE_NUMBER)));
    }

    @Test
    @Transactional
    void getTranslationCompany() throws Exception {
        // Initialize the database
        translationCompanyRepository.saveAndFlush(translationCompany);

        // Get the translationCompany
        restTranslationCompanyMockMvc
            .perform(get(ENTITY_API_URL_ID, translationCompany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(translationCompany.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.secondPhoneNumber").value(DEFAULT_SECOND_PHONE_NUMBER));
    }

    @Test
    @Transactional
    void getNonExistingTranslationCompany() throws Exception {
        // Get the translationCompany
        restTranslationCompanyMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTranslationCompany() throws Exception {
        // Initialize the database
        translationCompanyRepository.saveAndFlush(translationCompany);

        int databaseSizeBeforeUpdate = translationCompanyRepository.findAll().size();

        // Update the translationCompany
        TranslationCompany updatedTranslationCompany = translationCompanyRepository.findById(translationCompany.getId()).get();
        // Disconnect from session so that the updates on updatedTranslationCompany are not directly saved in db
        em.detach(updatedTranslationCompany);
        updatedTranslationCompany.name(UPDATED_NAME).phoneNumber(UPDATED_PHONE_NUMBER).secondPhoneNumber(UPDATED_SECOND_PHONE_NUMBER);
        TranslationCompanyDTO translationCompanyDTO = translationCompanyMapper.toDto(updatedTranslationCompany);

        restTranslationCompanyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, translationCompanyDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(translationCompanyDTO))
            )
            .andExpect(status().isOk());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeUpdate);
        TranslationCompany testTranslationCompany = translationCompanyList.get(translationCompanyList.size() - 1);
        assertThat(testTranslationCompany.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTranslationCompany.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testTranslationCompany.getSecondPhoneNumber()).isEqualTo(UPDATED_SECOND_PHONE_NUMBER);
    }

    @Test
    @Transactional
    void putNonExistingTranslationCompany() throws Exception {
        int databaseSizeBeforeUpdate = translationCompanyRepository.findAll().size();
        translationCompany.setId(count.incrementAndGet());

        // Create the TranslationCompany
        TranslationCompanyDTO translationCompanyDTO = translationCompanyMapper.toDto(translationCompany);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTranslationCompanyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, translationCompanyDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(translationCompanyDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTranslationCompany() throws Exception {
        int databaseSizeBeforeUpdate = translationCompanyRepository.findAll().size();
        translationCompany.setId(count.incrementAndGet());

        // Create the TranslationCompany
        TranslationCompanyDTO translationCompanyDTO = translationCompanyMapper.toDto(translationCompany);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTranslationCompanyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(translationCompanyDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTranslationCompany() throws Exception {
        int databaseSizeBeforeUpdate = translationCompanyRepository.findAll().size();
        translationCompany.setId(count.incrementAndGet());

        // Create the TranslationCompany
        TranslationCompanyDTO translationCompanyDTO = translationCompanyMapper.toDto(translationCompany);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTranslationCompanyMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(translationCompanyDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTranslationCompanyWithPatch() throws Exception {
        // Initialize the database
        translationCompanyRepository.saveAndFlush(translationCompany);

        int databaseSizeBeforeUpdate = translationCompanyRepository.findAll().size();

        // Update the translationCompany using partial update
        TranslationCompany partialUpdatedTranslationCompany = new TranslationCompany();
        partialUpdatedTranslationCompany.setId(translationCompany.getId());

        partialUpdatedTranslationCompany.phoneNumber(UPDATED_PHONE_NUMBER).secondPhoneNumber(UPDATED_SECOND_PHONE_NUMBER);

        restTranslationCompanyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTranslationCompany.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTranslationCompany))
            )
            .andExpect(status().isOk());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeUpdate);
        TranslationCompany testTranslationCompany = translationCompanyList.get(translationCompanyList.size() - 1);
        assertThat(testTranslationCompany.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTranslationCompany.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testTranslationCompany.getSecondPhoneNumber()).isEqualTo(UPDATED_SECOND_PHONE_NUMBER);
    }

    @Test
    @Transactional
    void fullUpdateTranslationCompanyWithPatch() throws Exception {
        // Initialize the database
        translationCompanyRepository.saveAndFlush(translationCompany);

        int databaseSizeBeforeUpdate = translationCompanyRepository.findAll().size();

        // Update the translationCompany using partial update
        TranslationCompany partialUpdatedTranslationCompany = new TranslationCompany();
        partialUpdatedTranslationCompany.setId(translationCompany.getId());

        partialUpdatedTranslationCompany
            .name(UPDATED_NAME)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .secondPhoneNumber(UPDATED_SECOND_PHONE_NUMBER);

        restTranslationCompanyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTranslationCompany.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTranslationCompany))
            )
            .andExpect(status().isOk());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeUpdate);
        TranslationCompany testTranslationCompany = translationCompanyList.get(translationCompanyList.size() - 1);
        assertThat(testTranslationCompany.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTranslationCompany.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testTranslationCompany.getSecondPhoneNumber()).isEqualTo(UPDATED_SECOND_PHONE_NUMBER);
    }

    @Test
    @Transactional
    void patchNonExistingTranslationCompany() throws Exception {
        int databaseSizeBeforeUpdate = translationCompanyRepository.findAll().size();
        translationCompany.setId(count.incrementAndGet());

        // Create the TranslationCompany
        TranslationCompanyDTO translationCompanyDTO = translationCompanyMapper.toDto(translationCompany);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTranslationCompanyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, translationCompanyDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(translationCompanyDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTranslationCompany() throws Exception {
        int databaseSizeBeforeUpdate = translationCompanyRepository.findAll().size();
        translationCompany.setId(count.incrementAndGet());

        // Create the TranslationCompany
        TranslationCompanyDTO translationCompanyDTO = translationCompanyMapper.toDto(translationCompany);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTranslationCompanyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(translationCompanyDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTranslationCompany() throws Exception {
        int databaseSizeBeforeUpdate = translationCompanyRepository.findAll().size();
        translationCompany.setId(count.incrementAndGet());

        // Create the TranslationCompany
        TranslationCompanyDTO translationCompanyDTO = translationCompanyMapper.toDto(translationCompany);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTranslationCompanyMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(translationCompanyDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TranslationCompany in the database
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTranslationCompany() throws Exception {
        // Initialize the database
        translationCompanyRepository.saveAndFlush(translationCompany);

        int databaseSizeBeforeDelete = translationCompanyRepository.findAll().size();

        // Delete the translationCompany
        restTranslationCompanyMockMvc
            .perform(delete(ENTITY_API_URL_ID, translationCompany.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TranslationCompany> translationCompanyList = translationCompanyRepository.findAll();
        assertThat(translationCompanyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
