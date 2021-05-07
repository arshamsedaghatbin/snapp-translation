package com.snapp.translation.service;

import com.snapp.translation.service.dto.DeliveryTimeSlotDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.snapp.translation.domain.DeliveryTimeSlot}.
 */
public interface DeliveryTimeSlotService {
    /**
     * Save a deliveryTimeSlot.
     *
     * @param deliveryTimeSlotDTO the entity to save.
     * @return the persisted entity.
     */
    DeliveryTimeSlotDTO save(DeliveryTimeSlotDTO deliveryTimeSlotDTO);

    /**
     * Partially updates a deliveryTimeSlot.
     *
     * @param deliveryTimeSlotDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DeliveryTimeSlotDTO> partialUpdate(DeliveryTimeSlotDTO deliveryTimeSlotDTO);

    /**
     * Get all the deliveryTimeSlots.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DeliveryTimeSlotDTO> findAll(Pageable pageable);

    /**
     * Get the "id" deliveryTimeSlot.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DeliveryTimeSlotDTO> findOne(Long id);

    /**
     * Delete the "id" deliveryTimeSlot.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
