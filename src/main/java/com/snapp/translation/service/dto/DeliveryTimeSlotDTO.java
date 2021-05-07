package com.snapp.translation.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.snapp.translation.domain.DeliveryTimeSlot} entity.
 */
public class DeliveryTimeSlotDTO implements Serializable {

    private Long id;

    private Boolean active;

    private Long stratTime;

    private Long endTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getStratTime() {
        return stratTime;
    }

    public void setStratTime(Long stratTime) {
        this.stratTime = stratTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DeliveryTimeSlotDTO)) {
            return false;
        }

        DeliveryTimeSlotDTO deliveryTimeSlotDTO = (DeliveryTimeSlotDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, deliveryTimeSlotDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DeliveryTimeSlotDTO{" +
            "id=" + getId() +
            ", active='" + getActive() + "'" +
            ", stratTime=" + getStratTime() +
            ", endTime=" + getEndTime() +
            "}";
    }
}
