package com.snapp.translation.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.snapp.translation.domain.enumeration.CategoryType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_category")
    private CategoryType documentCategory;

    @OneToMany(mappedBy = "category")
    @JsonIgnoreProperties(value = { "category" }, allowSetters = true)
    private Set<SubCategory> subCategories = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "categories", "order", "invoice" }, allowSetters = true)
    private Document document;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category id(Long id) {
        this.id = id;
        return this;
    }

    public CategoryType getDocumentCategory() {
        return this.documentCategory;
    }

    public Category documentCategory(CategoryType documentCategory) {
        this.documentCategory = documentCategory;
        return this;
    }

    public void setDocumentCategory(CategoryType documentCategory) {
        this.documentCategory = documentCategory;
    }

    public Set<SubCategory> getSubCategories() {
        return this.subCategories;
    }

    public Category subCategories(Set<SubCategory> subCategories) {
        this.setSubCategories(subCategories);
        return this;
    }

    public Category addSubCategory(SubCategory subCategory) {
        this.subCategories.add(subCategory);
        subCategory.setCategory(this);
        return this;
    }

    public Category removeSubCategory(SubCategory subCategory) {
        this.subCategories.remove(subCategory);
        subCategory.setCategory(null);
        return this;
    }

    public void setSubCategories(Set<SubCategory> subCategories) {
        if (this.subCategories != null) {
            this.subCategories.forEach(i -> i.setCategory(null));
        }
        if (subCategories != null) {
            subCategories.forEach(i -> i.setCategory(this));
        }
        this.subCategories = subCategories;
    }

    public Document getDocument() {
        return this.document;
    }

    public Category document(Document document) {
        this.setDocument(document);
        return this;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", documentCategory='" + getDocumentCategory() + "'" +
            "}";
    }
}
