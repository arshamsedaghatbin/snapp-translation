package com.snapp.translation.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.snapp.translation.domain.TranslationCompany} entity.
 */
public class TranslationCompanyDTO implements Serializable {

    private Long id;

    private String name;

    private String phoneNumber;

    private String secondPhoneNumber;

    private LocationDTO location;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSecondPhoneNumber() {
        return secondPhoneNumber;
    }

    public void setSecondPhoneNumber(String secondPhoneNumber) {
        this.secondPhoneNumber = secondPhoneNumber;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TranslationCompanyDTO)) {
            return false;
        }

        TranslationCompanyDTO translationCompanyDTO = (TranslationCompanyDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, translationCompanyDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TranslationCompanyDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", secondPhoneNumber='" + getSecondPhoneNumber() + "'" +
            ", location=" + getLocation() +
            "}";
    }
}
