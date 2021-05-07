package com.snapp.translation.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.snapp.translation.domain.enumeration.DeliveryType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "hand_over_type")
    private DeliveryType handOverType;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_type")
    private DeliveryType deliveryType;

    @JsonIgnoreProperties(value = { "origin", "destination" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Delivery delivery;

    @JsonIgnoreProperties(value = { "origin", "destination" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Delivery handOver;

    @JsonIgnoreProperties(value = { "location" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private TranslationCompany translationCompany;

    @OneToOne
    @JoinColumn(unique = true)
    private DeliveryTimeSlot deliveryTimeSlot;

    @OneToMany(mappedBy = "order")
    @JsonIgnoreProperties(value = { "categories", "order", "invoice" }, allowSetters = true)
    private Set<Document> documents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order id(Long id) {
        this.id = id;
        return this;
    }

    public DeliveryType getHandOverType() {
        return this.handOverType;
    }

    public Order handOverType(DeliveryType handOverType) {
        this.handOverType = handOverType;
        return this;
    }

    public void setHandOverType(DeliveryType handOverType) {
        this.handOverType = handOverType;
    }

    public DeliveryType getDeliveryType() {
        return this.deliveryType;
    }

    public Order deliveryType(DeliveryType deliveryType) {
        this.deliveryType = deliveryType;
        return this;
    }

    public void setDeliveryType(DeliveryType deliveryType) {
        this.deliveryType = deliveryType;
    }

    public Delivery getDelivery() {
        return this.delivery;
    }

    public Order delivery(Delivery delivery) {
        this.setDelivery(delivery);
        return this;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public Delivery getHandOver() {
        return this.handOver;
    }

    public Order handOver(Delivery delivery) {
        this.setHandOver(delivery);
        return this;
    }

    public void setHandOver(Delivery delivery) {
        this.handOver = delivery;
    }

    public TranslationCompany getTranslationCompany() {
        return this.translationCompany;
    }

    public Order translationCompany(TranslationCompany translationCompany) {
        this.setTranslationCompany(translationCompany);
        return this;
    }

    public void setTranslationCompany(TranslationCompany translationCompany) {
        this.translationCompany = translationCompany;
    }

    public DeliveryTimeSlot getDeliveryTimeSlot() {
        return this.deliveryTimeSlot;
    }

    public Order deliveryTimeSlot(DeliveryTimeSlot deliveryTimeSlot) {
        this.setDeliveryTimeSlot(deliveryTimeSlot);
        return this;
    }

    public void setDeliveryTimeSlot(DeliveryTimeSlot deliveryTimeSlot) {
        this.deliveryTimeSlot = deliveryTimeSlot;
    }

    public Set<Document> getDocuments() {
        return this.documents;
    }

    public Order documents(Set<Document> documents) {
        this.setDocuments(documents);
        return this;
    }

    public Order addDocument(Document document) {
        this.documents.add(document);
        document.setOrder(this);
        return this;
    }

    public Order removeDocument(Document document) {
        this.documents.remove(document);
        document.setOrder(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        if (this.documents != null) {
            this.documents.forEach(i -> i.setOrder(null));
        }
        if (documents != null) {
            documents.forEach(i -> i.setOrder(this));
        }
        this.documents = documents;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", handOverType='" + getHandOverType() + "'" +
            ", deliveryType='" + getDeliveryType() + "'" +
            "}";
    }
}
