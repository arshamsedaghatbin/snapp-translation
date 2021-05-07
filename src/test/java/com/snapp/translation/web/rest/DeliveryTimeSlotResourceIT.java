package com.snapp.translation.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.snapp.translation.IntegrationTest;
import com.snapp.translation.domain.DeliveryTimeSlot;
import com.snapp.translation.repository.DeliveryTimeSlotRepository;
import com.snapp.translation.service.dto.DeliveryTimeSlotDTO;
import com.snapp.translation.service.mapper.DeliveryTimeSlotMapper;
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
 * Integration tests for the {@link DeliveryTimeSlotResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DeliveryTimeSlotResourceIT {

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final Long DEFAULT_STRAT_TIME = 1L;
    private static final Long UPDATED_STRAT_TIME = 2L;

    private static final Long DEFAULT_END_TIME = 1L;
    private static final Long UPDATED_END_TIME = 2L;

    private static final String ENTITY_API_URL = "/api/delivery-time-slots";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DeliveryTimeSlotRepository deliveryTimeSlotRepository;

    @Autowired
    private DeliveryTimeSlotMapper deliveryTimeSlotMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDeliveryTimeSlotMockMvc;

    private DeliveryTimeSlot deliveryTimeSlot;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryTimeSlot createEntity(EntityManager em) {
        DeliveryTimeSlot deliveryTimeSlot = new DeliveryTimeSlot()
            .active(DEFAULT_ACTIVE)
            .stratTime(DEFAULT_STRAT_TIME)
            .endTime(DEFAULT_END_TIME);
        return deliveryTimeSlot;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryTimeSlot createUpdatedEntity(EntityManager em) {
        DeliveryTimeSlot deliveryTimeSlot = new DeliveryTimeSlot()
            .active(UPDATED_ACTIVE)
            .stratTime(UPDATED_STRAT_TIME)
            .endTime(UPDATED_END_TIME);
        return deliveryTimeSlot;
    }

    @BeforeEach
    public void initTest() {
        deliveryTimeSlot = createEntity(em);
    }

    @Test
    @Transactional
    void createDeliveryTimeSlot() throws Exception {
        int databaseSizeBeforeCreate = deliveryTimeSlotRepository.findAll().size();
        // Create the DeliveryTimeSlot
        DeliveryTimeSlotDTO deliveryTimeSlotDTO = deliveryTimeSlotMapper.toDto(deliveryTimeSlot);
        restDeliveryTimeSlotMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deliveryTimeSlotDTO))
            )
            .andExpect(status().isCreated());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryTimeSlot testDeliveryTimeSlot = deliveryTimeSlotList.get(deliveryTimeSlotList.size() - 1);
        assertThat(testDeliveryTimeSlot.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testDeliveryTimeSlot.getStratTime()).isEqualTo(DEFAULT_STRAT_TIME);
        assertThat(testDeliveryTimeSlot.getEndTime()).isEqualTo(DEFAULT_END_TIME);
    }

    @Test
    @Transactional
    void createDeliveryTimeSlotWithExistingId() throws Exception {
        // Create the DeliveryTimeSlot with an existing ID
        deliveryTimeSlot.setId(1L);
        DeliveryTimeSlotDTO deliveryTimeSlotDTO = deliveryTimeSlotMapper.toDto(deliveryTimeSlot);

        int databaseSizeBeforeCreate = deliveryTimeSlotRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryTimeSlotMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deliveryTimeSlotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDeliveryTimeSlots() throws Exception {
        // Initialize the database
        deliveryTimeSlotRepository.saveAndFlush(deliveryTimeSlot);

        // Get all the deliveryTimeSlotList
        restDeliveryTimeSlotMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryTimeSlot.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].stratTime").value(hasItem(DEFAULT_STRAT_TIME.intValue())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.intValue())));
    }

    @Test
    @Transactional
    void getDeliveryTimeSlot() throws Exception {
        // Initialize the database
        deliveryTimeSlotRepository.saveAndFlush(deliveryTimeSlot);

        // Get the deliveryTimeSlot
        restDeliveryTimeSlotMockMvc
            .perform(get(ENTITY_API_URL_ID, deliveryTimeSlot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryTimeSlot.getId().intValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.stratTime").value(DEFAULT_STRAT_TIME.intValue()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingDeliveryTimeSlot() throws Exception {
        // Get the deliveryTimeSlot
        restDeliveryTimeSlotMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDeliveryTimeSlot() throws Exception {
        // Initialize the database
        deliveryTimeSlotRepository.saveAndFlush(deliveryTimeSlot);

        int databaseSizeBeforeUpdate = deliveryTimeSlotRepository.findAll().size();

        // Update the deliveryTimeSlot
        DeliveryTimeSlot updatedDeliveryTimeSlot = deliveryTimeSlotRepository.findById(deliveryTimeSlot.getId()).get();
        // Disconnect from session so that the updates on updatedDeliveryTimeSlot are not directly saved in db
        em.detach(updatedDeliveryTimeSlot);
        updatedDeliveryTimeSlot.active(UPDATED_ACTIVE).stratTime(UPDATED_STRAT_TIME).endTime(UPDATED_END_TIME);
        DeliveryTimeSlotDTO deliveryTimeSlotDTO = deliveryTimeSlotMapper.toDto(updatedDeliveryTimeSlot);

        restDeliveryTimeSlotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, deliveryTimeSlotDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(deliveryTimeSlotDTO))
            )
            .andExpect(status().isOk());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeUpdate);
        DeliveryTimeSlot testDeliveryTimeSlot = deliveryTimeSlotList.get(deliveryTimeSlotList.size() - 1);
        assertThat(testDeliveryTimeSlot.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testDeliveryTimeSlot.getStratTime()).isEqualTo(UPDATED_STRAT_TIME);
        assertThat(testDeliveryTimeSlot.getEndTime()).isEqualTo(UPDATED_END_TIME);
    }

    @Test
    @Transactional
    void putNonExistingDeliveryTimeSlot() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTimeSlotRepository.findAll().size();
        deliveryTimeSlot.setId(count.incrementAndGet());

        // Create the DeliveryTimeSlot
        DeliveryTimeSlotDTO deliveryTimeSlotDTO = deliveryTimeSlotMapper.toDto(deliveryTimeSlot);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryTimeSlotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, deliveryTimeSlotDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(deliveryTimeSlotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDeliveryTimeSlot() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTimeSlotRepository.findAll().size();
        deliveryTimeSlot.setId(count.incrementAndGet());

        // Create the DeliveryTimeSlot
        DeliveryTimeSlotDTO deliveryTimeSlotDTO = deliveryTimeSlotMapper.toDto(deliveryTimeSlot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryTimeSlotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(deliveryTimeSlotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDeliveryTimeSlot() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTimeSlotRepository.findAll().size();
        deliveryTimeSlot.setId(count.incrementAndGet());

        // Create the DeliveryTimeSlot
        DeliveryTimeSlotDTO deliveryTimeSlotDTO = deliveryTimeSlotMapper.toDto(deliveryTimeSlot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryTimeSlotMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deliveryTimeSlotDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDeliveryTimeSlotWithPatch() throws Exception {
        // Initialize the database
        deliveryTimeSlotRepository.saveAndFlush(deliveryTimeSlot);

        int databaseSizeBeforeUpdate = deliveryTimeSlotRepository.findAll().size();

        // Update the deliveryTimeSlot using partial update
        DeliveryTimeSlot partialUpdatedDeliveryTimeSlot = new DeliveryTimeSlot();
        partialUpdatedDeliveryTimeSlot.setId(deliveryTimeSlot.getId());

        partialUpdatedDeliveryTimeSlot.active(UPDATED_ACTIVE).endTime(UPDATED_END_TIME);

        restDeliveryTimeSlotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDeliveryTimeSlot.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDeliveryTimeSlot))
            )
            .andExpect(status().isOk());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeUpdate);
        DeliveryTimeSlot testDeliveryTimeSlot = deliveryTimeSlotList.get(deliveryTimeSlotList.size() - 1);
        assertThat(testDeliveryTimeSlot.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testDeliveryTimeSlot.getStratTime()).isEqualTo(DEFAULT_STRAT_TIME);
        assertThat(testDeliveryTimeSlot.getEndTime()).isEqualTo(UPDATED_END_TIME);
    }

    @Test
    @Transactional
    void fullUpdateDeliveryTimeSlotWithPatch() throws Exception {
        // Initialize the database
        deliveryTimeSlotRepository.saveAndFlush(deliveryTimeSlot);

        int databaseSizeBeforeUpdate = deliveryTimeSlotRepository.findAll().size();

        // Update the deliveryTimeSlot using partial update
        DeliveryTimeSlot partialUpdatedDeliveryTimeSlot = new DeliveryTimeSlot();
        partialUpdatedDeliveryTimeSlot.setId(deliveryTimeSlot.getId());

        partialUpdatedDeliveryTimeSlot.active(UPDATED_ACTIVE).stratTime(UPDATED_STRAT_TIME).endTime(UPDATED_END_TIME);

        restDeliveryTimeSlotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDeliveryTimeSlot.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDeliveryTimeSlot))
            )
            .andExpect(status().isOk());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeUpdate);
        DeliveryTimeSlot testDeliveryTimeSlot = deliveryTimeSlotList.get(deliveryTimeSlotList.size() - 1);
        assertThat(testDeliveryTimeSlot.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testDeliveryTimeSlot.getStratTime()).isEqualTo(UPDATED_STRAT_TIME);
        assertThat(testDeliveryTimeSlot.getEndTime()).isEqualTo(UPDATED_END_TIME);
    }

    @Test
    @Transactional
    void patchNonExistingDeliveryTimeSlot() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTimeSlotRepository.findAll().size();
        deliveryTimeSlot.setId(count.incrementAndGet());

        // Create the DeliveryTimeSlot
        DeliveryTimeSlotDTO deliveryTimeSlotDTO = deliveryTimeSlotMapper.toDto(deliveryTimeSlot);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryTimeSlotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, deliveryTimeSlotDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(deliveryTimeSlotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDeliveryTimeSlot() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTimeSlotRepository.findAll().size();
        deliveryTimeSlot.setId(count.incrementAndGet());

        // Create the DeliveryTimeSlot
        DeliveryTimeSlotDTO deliveryTimeSlotDTO = deliveryTimeSlotMapper.toDto(deliveryTimeSlot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryTimeSlotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(deliveryTimeSlotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDeliveryTimeSlot() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTimeSlotRepository.findAll().size();
        deliveryTimeSlot.setId(count.incrementAndGet());

        // Create the DeliveryTimeSlot
        DeliveryTimeSlotDTO deliveryTimeSlotDTO = deliveryTimeSlotMapper.toDto(deliveryTimeSlot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryTimeSlotMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(deliveryTimeSlotDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DeliveryTimeSlot in the database
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDeliveryTimeSlot() throws Exception {
        // Initialize the database
        deliveryTimeSlotRepository.saveAndFlush(deliveryTimeSlot);

        int databaseSizeBeforeDelete = deliveryTimeSlotRepository.findAll().size();

        // Delete the deliveryTimeSlot
        restDeliveryTimeSlotMockMvc
            .perform(delete(ENTITY_API_URL_ID, deliveryTimeSlot.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DeliveryTimeSlot> deliveryTimeSlotList = deliveryTimeSlotRepository.findAll();
        assertThat(deliveryTimeSlotList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
