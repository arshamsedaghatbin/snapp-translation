package com.snapp.translation.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;

/**
 * A Delivery.
 */
@Entity
@Table(name = "delivery")
public class Delivery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "price", precision = 21, scale = 2)
    private BigDecimal price;

    @OneToOne
    @JoinColumn(unique = true)
    private Location origin;

    @OneToOne
    @JoinColumn(unique = true)
    private Location destination;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Delivery id(Long id) {
        this.id = id;
        return this;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public Delivery price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Location getOrigin() {
        return this.origin;
    }

    public Delivery origin(Location location) {
        this.setOrigin(location);
        return this;
    }

    public void setOrigin(Location location) {
        this.origin = location;
    }

    public Location getDestination() {
        return this.destination;
    }

    public Delivery destination(Location location) {
        this.setDestination(location);
        return this;
    }

    public void setDestination(Location location) {
        this.destination = location;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Delivery)) {
            return false;
        }
        return id != null && id.equals(((Delivery) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Delivery{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            "}";
    }
}
