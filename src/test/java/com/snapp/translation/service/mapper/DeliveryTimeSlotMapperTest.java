package com.snapp.translation.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DeliveryTimeSlotMapperTest {

    private DeliveryTimeSlotMapper deliveryTimeSlotMapper;

    @BeforeEach
    public void setUp() {
        deliveryTimeSlotMapper = new DeliveryTimeSlotMapperImpl();
    }
}
