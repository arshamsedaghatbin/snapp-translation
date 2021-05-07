package com.snapp.translation.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A DeliveryTimeSlot.
 */
@Entity
@Table(name = "delivery_time_slot")
public class DeliveryTimeSlot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "strat_time")
    private Long stratTime;

    @Column(name = "end_time")
    private Long endTime;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DeliveryTimeSlot id(Long id) {
        this.id = id;
        return this;
    }

    public Boolean getActive() {
        return this.active;
    }

    public DeliveryTimeSlot active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getStratTime() {
        return this.stratTime;
    }

    public DeliveryTimeSlot stratTime(Long stratTime) {
        this.stratTime = stratTime;
        return this;
    }

    public void setStratTime(Long stratTime) {
        this.stratTime = stratTime;
    }

    public Long getEndTime() {
        return this.endTime;
    }

    public DeliveryTimeSlot endTime(Long endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DeliveryTimeSlot)) {
            return false;
        }
        return id != null && id.equals(((DeliveryTimeSlot) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DeliveryTimeSlot{" +
            "id=" + getId() +
            ", active='" + getActive() + "'" +
            ", stratTime=" + getStratTime() +
            ", endTime=" + getEndTime() +
            "}";
    }
}
