package com.sensocon.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "state_province")
    private String stateProvince;

    @Column(name = "default_timeout_seconds")
    private Long defaultTimeoutSeconds;

    @Column(name = "default_suppression_seconds")
    private Long defaultSuppressionSeconds;

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Location> locations = new HashSet<>();

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SensorGroup> sensorGroups = new HashSet<>();

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contact> contacts = new HashSet<>();

    @OneToMany(mappedBy = "company")
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

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public Company streetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        return this;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Company postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public Company city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public Company stateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
        return this;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public Long getDefaultTimeoutSeconds() {
        return defaultTimeoutSeconds;
    }

    public Company defaultTimeoutSeconds(Long defaultTimeoutSeconds) {
        this.defaultTimeoutSeconds = defaultTimeoutSeconds;
        return this;
    }

    public void setDefaultTimeoutSeconds(Long defaultTimeoutSeconds) {
        this.defaultTimeoutSeconds = defaultTimeoutSeconds;
    }

    public Long getDefaultSuppressionSeconds() {
        return defaultSuppressionSeconds;
    }

    public Company defaultSuppressionSeconds(Long defaultSuppressionSeconds) {
        this.defaultSuppressionSeconds = defaultSuppressionSeconds;
        return this;
    }

    public void setDefaultSuppressionSeconds(Long defaultSuppressionSeconds) {
        this.defaultSuppressionSeconds = defaultSuppressionSeconds;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public Company locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Company addLocation(Location location) {
        this.locations.add(location);
        location.setCompany(this);
        return this;
    }

    public Company removeLocation(Location location) {
        this.locations.remove(location);
        location.setCompany(null);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Set<SensorGroup> getSensorGroups() {
        return sensorGroups;
    }

    public Company sensorGroups(Set<SensorGroup> sensorGroups) {
        this.sensorGroups = sensorGroups;
        return this;
    }

    public Company addSensorGroup(SensorGroup sensorGroup) {
        this.sensorGroups.add(sensorGroup);
        sensorGroup.setCompany(this);
        return this;
    }

    public Company removeSensorGroup(SensorGroup sensorGroup) {
        this.sensorGroups.remove(sensorGroup);
        sensorGroup.setCompany(null);
        return this;
    }

    public void setSensorGroups(Set<SensorGroup> sensorGroups) {
        this.sensorGroups = sensorGroups;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public Company contacts(Set<Contact> contacts) {
        this.contacts = contacts;
        return this;
    }

    public Company addContact(Contact contact) {
        this.contacts.add(contact);
        contact.setCompany(this);
        return this;
    }

    public Company removeContact(Contact contact) {
        this.contacts.remove(contact);
        contact.setCompany(null);
        return this;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }

    public Set<NotificationGroup> getNotificationGroups() {
        return notificationGroups;
    }

    public Company notificationGroups(Set<NotificationGroup> notificationGroups) {
        this.notificationGroups = notificationGroups;
        return this;
    }

    public Company addNotificationGroup(NotificationGroup notificationGroup) {
        this.notificationGroups.add(notificationGroup);
        notificationGroup.setCompany(this);
        return this;
    }

    public Company removeNotificationGroup(NotificationGroup notificationGroup) {
        this.notificationGroups.remove(notificationGroup);
        notificationGroup.setCompany(null);
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
        Company company = (Company) o;
        if (company.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), company.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", stateProvince='" + getStateProvince() + "'" +
            ", defaultTimeoutSeconds=" + getDefaultTimeoutSeconds() +
            ", defaultSuppressionSeconds=" + getDefaultSuppressionSeconds() +
            "}";
    }
}
