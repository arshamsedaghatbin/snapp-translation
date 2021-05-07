package com.snapp.translation.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.snapp.translation.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DeliveryTimeSlotDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryTimeSlotDTO.class);
        DeliveryTimeSlotDTO deliveryTimeSlotDTO1 = new DeliveryTimeSlotDTO();
        deliveryTimeSlotDTO1.setId(1L);
        DeliveryTimeSlotDTO deliveryTimeSlotDTO2 = new DeliveryTimeSlotDTO();
        assertThat(deliveryTimeSlotDTO1).isNotEqualTo(deliveryTimeSlotDTO2);
        deliveryTimeSlotDTO2.setId(deliveryTimeSlotDTO1.getId());
        assertThat(deliveryTimeSlotDTO1).isEqualTo(deliveryTimeSlotDTO2);
        deliveryTimeSlotDTO2.setId(2L);
        assertThat(deliveryTimeSlotDTO1).isNotEqualTo(deliveryTimeSlotDTO2);
        deliveryTimeSlotDTO1.setId(null);
        assertThat(deliveryTimeSlotDTO1).isNotEqualTo(deliveryTimeSlotDTO2);
    }
}
