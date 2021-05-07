package com.snapp.translation.repository;

import com.snapp.translation.domain.DeliveryTimeSlot;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DeliveryTimeSlot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryTimeSlotRepository extends JpaRepository<DeliveryTimeSlot, Long> {}
