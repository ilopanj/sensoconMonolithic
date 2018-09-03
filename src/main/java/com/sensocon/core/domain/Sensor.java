package com.sensocon.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.sensocon.core.domain.enumeration.SensorStatus;

import com.sensocon.core.domain.enumeration.SensorType;

/**
 * A Sensor.
 */
@Entity
@Table(name = "sensor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Sensor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private SensorStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "sensor_type")
    private SensorType sensorType;

    @Column(name = "last_alert")
    private Instant lastAlert;

    @OneToOne
    @JoinColumn(unique = true)
    private SensorGroup sensorGroup;

    @OneToMany(mappedBy = "sensor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SensorThreshold> thresholds = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("sensors")
    private SensorDevice sensorDevice;

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

    public Sensor name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SensorStatus getStatus() {
        return status;
    }

    public Sensor status(SensorStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(SensorStatus status) {
        this.status = status;
    }

    public SensorType getSensorType() {
        return sensorType;
    }

    public Sensor sensorType(SensorType sensorType) {
        this.sensorType = sensorType;
        return this;
    }

    public void setSensorType(SensorType sensorType) {
        this.sensorType = sensorType;
    }

    public Instant getLastAlert() {
        return lastAlert;
    }

    public Sensor lastAlert(Instant lastAlert) {
        this.lastAlert = lastAlert;
        return this;
    }

    public void setLastAlert(Instant lastAlert) {
        this.lastAlert = lastAlert;
    }

    public SensorGroup getSensorGroup() {
        return sensorGroup;
    }

    public Sensor sensorGroup(SensorGroup sensorGroup) {
        this.sensorGroup = sensorGroup;
        return this;
    }

    public void setSensorGroup(SensorGroup sensorGroup) {
        this.sensorGroup = sensorGroup;
    }

    public Set<SensorThreshold> getThresholds() {
        return thresholds;
    }

    public Sensor thresholds(Set<SensorThreshold> sensorThresholds) {
        this.thresholds = sensorThresholds;
        return this;
    }

    public Sensor addThresholds(SensorThreshold sensorThreshold) {
        this.thresholds.add(sensorThreshold);
        sensorThreshold.setSensor(this);
        return this;
    }

    public Sensor removeThresholds(SensorThreshold sensorThreshold) {
        this.thresholds.remove(sensorThreshold);
        sensorThreshold.setSensor(null);
        return this;
    }

    public void setThresholds(Set<SensorThreshold> sensorThresholds) {
        this.thresholds = sensorThresholds;
    }

    public SensorDevice getSensorDevice() {
        return sensorDevice;
    }

    public Sensor sensorDevice(SensorDevice sensorDevice) {
        this.sensorDevice = sensorDevice;
        return this;
    }

    public void setSensorDevice(SensorDevice sensorDevice) {
        this.sensorDevice = sensorDevice;
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
        Sensor sensor = (Sensor) o;
        if (sensor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sensor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sensor{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", sensorType='" + getSensorType() + "'" +
            ", lastAlert='" + getLastAlert() + "'" +
            "}";
    }
}
