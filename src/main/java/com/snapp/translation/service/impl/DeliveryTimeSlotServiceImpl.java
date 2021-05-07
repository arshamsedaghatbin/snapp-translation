package com.snapp.translation.service.impl;

import com.snapp.translation.domain.DeliveryTimeSlot;
import com.snapp.translation.repository.DeliveryTimeSlotRepository;
import com.snapp.translation.service.DeliveryTimeSlotService;
import com.snapp.translation.service.dto.DeliveryTimeSlotDTO;
import com.snapp.translation.service.mapper.DeliveryTimeSlotMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link DeliveryTimeSlot}.
 */
@Service
@Transactional
public class DeliveryTimeSlotServiceImpl implements DeliveryTimeSlotService {

    private final Logger log = LoggerFactory.getLogger(DeliveryTimeSlotServiceImpl.class);

    private final DeliveryTimeSlotRepository deliveryTimeSlotRepository;

    private final DeliveryTimeSlotMapper deliveryTimeSlotMapper;

    public DeliveryTimeSlotServiceImpl(
        DeliveryTimeSlotRepository deliveryTimeSlotRepository,
        DeliveryTimeSlotMapper deliveryTimeSlotMapper
    ) {
        this.deliveryTimeSlotRepository = deliveryTimeSlotRepository;
        this.deliveryTimeSlotMapper = deliveryTimeSlotMapper;
    }

    @Override
    public DeliveryTimeSlotDTO save(DeliveryTimeSlotDTO deliveryTimeSlotDTO) {
        log.debug("Request to save DeliveryTimeSlot : {}", deliveryTimeSlotDTO);
        DeliveryTimeSlot deliveryTimeSlot = deliveryTimeSlotMapper.toEntity(deliveryTimeSlotDTO);
        deliveryTimeSlot = deliveryTimeSlotRepository.save(deliveryTimeSlot);
        return deliveryTimeSlotMapper.toDto(deliveryTimeSlot);
    }

    @Override
    public Optional<DeliveryTimeSlotDTO> partialUpdate(DeliveryTimeSlotDTO deliveryTimeSlotDTO) {
        log.debug("Request to partially update DeliveryTimeSlot : {}", deliveryTimeSlotDTO);

        return deliveryTimeSlotRepository
            .findById(deliveryTimeSlotDTO.getId())
            .map(
                existingDeliveryTimeSlot -> {
                    deliveryTimeSlotMapper.partialUpdate(existingDeliveryTimeSlot, deliveryTimeSlotDTO);
                    return existingDeliveryTimeSlot;
                }
            )
            .map(deliveryTimeSlotRepository::save)
            .map(deliveryTimeSlotMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DeliveryTimeSlotDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DeliveryTimeSlots");
        return deliveryTimeSlotRepository.findAll(pageable).map(deliveryTimeSlotMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DeliveryTimeSlotDTO> findOne(Long id) {
        log.debug("Request to get DeliveryTimeSlot : {}", id);
        return deliveryTimeSlotRepository.findById(id).map(deliveryTimeSlotMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete DeliveryTimeSlot : {}", id);
        deliveryTimeSlotRepository.deleteById(id);
    }
}
