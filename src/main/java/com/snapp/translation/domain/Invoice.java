package com.snapp.translation.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.snapp.translation.domain.enumeration.InvoiceStatus;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Invoice.
 */
@Entity
@Table(name = "invoice")
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "customer_price", precision = 21, scale = 2)
    private BigDecimal customerPrice;

    @Column(name = "total_price", precision = 21, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "tax_price", precision = 21, scale = 2)
    private BigDecimal taxPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "invoice_status")
    private InvoiceStatus invoiceStatus;

    @JsonIgnoreProperties(value = { "origin", "destination" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Delivery handOver;

    @JsonIgnoreProperties(value = { "origin", "destination" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Delivery delivery;

    @OneToMany(mappedBy = "invoice")
    @JsonIgnoreProperties(value = { "categories", "order", "invoice" }, allowSetters = true)
    private Set<Document> documents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Invoice id(Long id) {
        this.id = id;
        return this;
    }

    public BigDecimal getCustomerPrice() {
        return this.customerPrice;
    }

    public Invoice customerPrice(BigDecimal customerPrice) {
        this.customerPrice = customerPrice;
        return this;
    }

    public void setCustomerPrice(BigDecimal customerPrice) {
        this.customerPrice = customerPrice;
    }

    public BigDecimal getTotalPrice() {
        return this.totalPrice;
    }

    public Invoice totalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal getTaxPrice() {
        return this.taxPrice;
    }

    public Invoice taxPrice(BigDecimal taxPrice) {
        this.taxPrice = taxPrice;
        return this;
    }

    public void setTaxPrice(BigDecimal taxPrice) {
        this.taxPrice = taxPrice;
    }

    public InvoiceStatus getInvoiceStatus() {
        return this.invoiceStatus;
    }

    public Invoice invoiceStatus(InvoiceStatus invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
        return this;
    }

    public void setInvoiceStatus(InvoiceStatus invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
    }

    public Delivery getHandOver() {
        return this.handOver;
    }

    public Invoice handOver(Delivery delivery) {
        this.setHandOver(delivery);
        return this;
    }

    public void setHandOver(Delivery delivery) {
        this.handOver = delivery;
    }

    public Delivery getDelivery() {
        return this.delivery;
    }

    public Invoice delivery(Delivery delivery) {
        this.setDelivery(delivery);
        return this;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public Set<Document> getDocuments() {
        return this.documents;
    }

    public Invoice documents(Set<Document> documents) {
        this.setDocuments(documents);
        return this;
    }

    public Invoice addDocument(Document document) {
        this.documents.add(document);
        document.setInvoice(this);
        return this;
    }

    public Invoice removeDocument(Document document) {
        this.documents.remove(document);
        document.setInvoice(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        if (this.documents != null) {
            this.documents.forEach(i -> i.setInvoice(null));
        }
        if (documents != null) {
            documents.forEach(i -> i.setInvoice(this));
        }
        this.documents = documents;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invoice)) {
            return false;
        }
        return id != null && id.equals(((Invoice) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Invoice{" +
            "id=" + getId() +
            ", customerPrice=" + getCustomerPrice() +
            ", totalPrice=" + getTotalPrice() +
            ", taxPrice=" + getTaxPrice() +
            ", invoiceStatus='" + getInvoiceStatus() + "'" +
            "}";
    }
}
