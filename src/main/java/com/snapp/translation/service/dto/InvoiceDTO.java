package com.snapp.translation.service.dto;

import com.snapp.translation.domain.enumeration.InvoiceStatus;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link com.snapp.translation.domain.Invoice} entity.
 */
public class InvoiceDTO implements Serializable {

    private Long id;

    private BigDecimal customerPrice;

    private BigDecimal totalPrice;

    private BigDecimal taxPrice;

    private InvoiceStatus invoiceStatus;

    private DeliveryDTO handOver;

    private DeliveryDTO delivery;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getCustomerPrice() {
        return customerPrice;
    }

    public void setCustomerPrice(BigDecimal customerPrice) {
        this.customerPrice = customerPrice;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal getTaxPrice() {
        return taxPrice;
    }

    public void setTaxPrice(BigDecimal taxPrice) {
        this.taxPrice = taxPrice;
    }

    public InvoiceStatus getInvoiceStatus() {
        return invoiceStatus;
    }

    public void setInvoiceStatus(InvoiceStatus invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
    }

    public DeliveryDTO getHandOver() {
        return handOver;
    }

    public void setHandOver(DeliveryDTO handOver) {
        this.handOver = handOver;
    }

    public DeliveryDTO getDelivery() {
        return delivery;
    }

    public void setDelivery(DeliveryDTO delivery) {
        this.delivery = delivery;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InvoiceDTO)) {
            return false;
        }

        InvoiceDTO invoiceDTO = (InvoiceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, invoiceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InvoiceDTO{" +
            "id=" + getId() +
            ", customerPrice=" + getCustomerPrice() +
            ", totalPrice=" + getTotalPrice() +
            ", taxPrice=" + getTaxPrice() +
            ", invoiceStatus='" + getInvoiceStatus() + "'" +
            ", handOver=" + getHandOver() +
            ", delivery=" + getDelivery() +
            "}";
    }
}
