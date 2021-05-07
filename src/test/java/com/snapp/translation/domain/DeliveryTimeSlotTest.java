package com.snapp.translation.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.snapp.translation.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DeliveryTimeSlotTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryTimeSlot.class);
        DeliveryTimeSlot deliveryTimeSlot1 = new DeliveryTimeSlot();
        deliveryTimeSlot1.setId(1L);
        DeliveryTimeSlot deliveryTimeSlot2 = new DeliveryTimeSlot();
        deliveryTimeSlot2.setId(deliveryTimeSlot1.getId());
        assertThat(deliveryTimeSlot1).isEqualTo(deliveryTimeSlot2);
        deliveryTimeSlot2.setId(2L);
        assertThat(deliveryTimeSlot1).isNotEqualTo(deliveryTimeSlot2);
        deliveryTimeSlot1.setId(null);
        assertThat(deliveryTimeSlot1).isNotEqualTo(deliveryTimeSlot2);
    }
}
