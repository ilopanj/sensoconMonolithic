package com.sensocon.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Contact.
 */
@Entity
@Table(name = "contact")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Contact implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "alert_phone_number")
    private String alertPhoneNumber;

    @Column(name = "alert_email")
    private String alertEmail;

    @ManyToOne
    @JsonIgnoreProperties("contacts")
    private Company company;

    @ManyToMany(mappedBy = "contacts")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<NotificationGroup> notificationGroups = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Contact name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAlertPhoneNumber() {
        return alertPhoneNumber;
    }

    public Contact alertPhoneNumber(String alertPhoneNumber) {
        this.alertPhoneNumber = alertPhoneNumber;
        return this;
    }

    public void setAlertPhoneNumber(String alertPhoneNumber) {
        this.alertPhoneNumber = alertPhoneNumber;
    }

    public String getAlertEmail() {
        return alertEmail;
    }

    public Contact alertEmail(String alertEmail) {
        this.alertEmail = alertEmail;
        return this;
    }

    public void setAlertEmail(String alertEmail) {
        this.alertEmail = alertEmail;
    }

    public Company getCompany() {
        return company;
    }

    public Contact company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Set<NotificationGroup> getNotificationGroups() {
        return notificationGroups;
    }

    public Contact notificationGroups(Set<NotificationGroup> notificationGroups) {
        this.notificationGroups = notificationGroups;
        return this;
    }

    public Contact addNotificationGroup(NotificationGroup notificationGroup) {
        this.notificationGroups.add(notificationGroup);
        notificationGroup.getContacts().add(this);
        return this;
    }

    public Contact removeNotificationGroup(NotificationGroup notificationGroup) {
        this.notificationGroups.remove(notificationGroup);
        notificationGroup.getContacts().remove(this);
        return this;
    }

    public void setNotificationGroups(Set<NotificationGroup> notificationGroups) {
        this.notificationGroups = notificationGroups;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Contact contact = (Contact) o;
        if (contact.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contact.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Contact{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", alertPhoneNumber='" + getAlertPhoneNumber() + "'" +
            ", alertEmail='" + getAlertEmail() + "'" +
            "}";
    }
}
