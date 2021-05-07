package com.snapp.translation.service.dto;

import com.snapp.translation.domain.enumeration.DeliveryType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.snapp.translation.domain.Order} entity.
 */
public class OrderDTO implements Serializable {

    private Long id;

    private DeliveryType handOverType;

    private DeliveryType deliveryType;

    private DeliveryDTO delivery;

    private DeliveryDTO handOver;

    private TranslationCompanyDTO translationCompany;

    private DeliveryTimeSlotDTO deliveryTimeSlot;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DeliveryType getHandOverType() {
        return handOverType;
    }

    public void setHandOverType(DeliveryType handOverType) {
        this.handOverType = handOverType;
    }

    public DeliveryType getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(DeliveryType deliveryType) {
        this.deliveryType = deliveryType;
    }

    public DeliveryDTO getDelivery() {
        return delivery;
    }

    public void setDelivery(DeliveryDTO delivery) {
        this.delivery = delivery;
    }

    public DeliveryDTO getHandOver() {
        return handOver;
    }

    public void setHandOver(DeliveryDTO handOver) {
        this.handOver = handOver;
    }

    public TranslationCompanyDTO getTranslationCompany() {
        return translationCompany;
    }

    public void setTranslationCompany(TranslationCompanyDTO translationCompany) {
        this.translationCompany = translationCompany;
    }

    public DeliveryTimeSlotDTO getDeliveryTimeSlot() {
        return deliveryTimeSlot;
    }

    public void setDeliveryTimeSlot(DeliveryTimeSlotDTO deliveryTimeSlot) {
        this.deliveryTimeSlot = deliveryTimeSlot;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderDTO)) {
            return false;
        }

        OrderDTO orderDTO = (OrderDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, orderDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderDTO{" +
            "id=" + getId() +
            ", handOverType='" + getHandOverType() + "'" +
            ", deliveryType='" + getDeliveryType() + "'" +
            ", delivery=" + getDelivery() +
            ", handOver=" + getHandOver() +
            ", translationCompany=" + getTranslationCompany() +
            ", deliveryTimeSlot=" + getDeliveryTimeSlot() +
            "}";
    }
}
