package com.snapp.translation.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.snapp.translation.domain.enumeration.PricingStrategy;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A SubCategory.
 */
@Entity
@Table(name = "sub_category")
public class SubCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "pricing")
    private PricingStrategy pricing;

    @ManyToOne
    @JsonIgnoreProperties(value = { "subCategories", "document" }, allowSetters = true)
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SubCategory id(Long id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return this.title;
    }

    public SubCategory title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public PricingStrategy getPricing() {
        return this.pricing;
    }

    public SubCategory pricing(PricingStrategy pricing) {
        this.pricing = pricing;
        return this;
    }

    public void setPricing(PricingStrategy pricing) {
        this.pricing = pricing;
    }

    public Category getCategory() {
        return this.category;
    }

    public SubCategory category(Category category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubCategory)) {
            return false;
        }
        return id != null && id.equals(((SubCategory) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubCategory{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", pricing='" + getPricing() + "'" +
            "}";
    }
}
