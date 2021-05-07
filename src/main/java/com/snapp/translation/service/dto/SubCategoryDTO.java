package com.snapp.translation.service.dto;

import com.snapp.translation.domain.enumeration.PricingStrategy;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.snapp.translation.domain.SubCategory} entity.
 */
public class SubCategoryDTO implements Serializable {

    private Long id;

    private String title;

    private PricingStrategy pricing;

    private CategoryDTO category;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public PricingStrategy getPricing() {
        return pricing;
    }

    public void setPricing(PricingStrategy pricing) {
        this.pricing = pricing;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubCategoryDTO)) {
            return false;
        }

        SubCategoryDTO subCategoryDTO = (SubCategoryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, subCategoryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubCategoryDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", pricing='" + getPricing() + "'" +
            ", category=" + getCategory() +
            "}";
    }
}
