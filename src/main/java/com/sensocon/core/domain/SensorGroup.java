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

import com.sensocon.core.domain.enumeration.SensorType;

/**
 * A SensorGroup.
 */
@Entity
@Table(name = "sensor_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SensorGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "sensor_type")
    private SensorType sensorType;

    @OneToMany(mappedBy = "sensorGroup")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SensorThreshold> defaultThresholds = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("sensorGroups")
    private Company company;

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

    public SensorGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SensorType getSensorType() {
        return sensorType;
    }

    public SensorGroup sensorType(SensorType sensorType) {
        this.sensorType = sensorType;
        return this;
    }

    public void setSensorType(SensorType sensorType) {
        this.sensorType = sensorType;
    }

    public Set<SensorThreshold> getDefaultThresholds() {
        return defaultThresholds;
    }

    public SensorGroup defaultThresholds(Set<SensorThreshold> sensorThresholds) {
        this.defaultThresholds = sensorThresholds;
        return this;
    }

    public SensorGroup addDefaultThresholds(SensorThreshold sensorThreshold) {
        this.defaultThresholds.add(sensorThreshold);
        sensorThreshold.setSensorGroup(this);
        return this;
    }

    public SensorGroup removeDefaultThresholds(SensorThreshold sensorThreshold) {
        this.defaultThresholds.remove(sensorThreshold);
        sensorThreshold.setSensorGroup(null);
        return this;
    }

    public void setDefaultThresholds(Set<SensorThreshold> sensorThresholds) {
        this.defaultThresholds = sensorThresholds;
    }

    public Company getCompany() {
        return company;
    }

    public SensorGroup company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
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
        SensorGroup sensorGroup = (SensorGroup) o;
        if (sensorGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sensorGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SensorGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", sensorType='" + getSensorType() + "'" +
            "}";
    }
}
