package com.snapp.translation.service.dto;

import com.snapp.translation.domain.enumeration.CategoryType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.snapp.translation.domain.Category} entity.
 */
public class CategoryDTO implements Serializable {

    private Long id;

    private CategoryType documentCategory;

    private DocumentDTO document;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CategoryType getDocumentCategory() {
        return documentCategory;
    }

    public void setDocumentCategory(CategoryType documentCategory) {
        this.documentCategory = documentCategory;
    }

    public DocumentDTO getDocument() {
        return document;
    }

    public void setDocument(DocumentDTO document) {
        this.document = document;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CategoryDTO)) {
            return false;
        }

        CategoryDTO categoryDTO = (CategoryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, categoryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CategoryDTO{" +
            "id=" + getId() +
            ", documentCategory='" + getDocumentCategory() + "'" +
            ", document=" + getDocument() +
            "}";
    }
}
