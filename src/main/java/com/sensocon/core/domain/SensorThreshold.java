package com.sensocon.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.sensocon.core.domain.enumeration.ThresholdType;

/**
 * A SensorThreshold.
 */
@Entity
@Table(name = "sensor_threshold")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SensorThreshold implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private ThresholdType type;

    @Column(name = "jhi_value")
    private Double value;

    @ManyToOne
    @JsonIgnoreProperties("thresholds")
    private SensorDevice sensorDevice;

    @ManyToOne
    @JsonIgnoreProperties("thresholds")
    private Sensor sensor;

    @ManyToOne
    @JsonIgnoreProperties("defaultThresholds")
    private SensorGroup sensorGroup;

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

    public SensorThreshold name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ThresholdType getType() {
        return type;
    }

    public SensorThreshold type(ThresholdType type) {
        this.type = type;
        return this;
    }

    public void setType(ThresholdType type) {
        this.type = type;
    }

    public Double getValue() {
        return value;
    }

    public SensorThreshold value(Double value) {
        this.value = value;
        return this;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public SensorDevice getSensorDevice() {
        return sensorDevice;
    }

    public SensorThreshold sensorDevice(SensorDevice sensorDevice) {
        this.sensorDevice = sensorDevice;
        return this;
    }

    public void setSensorDevice(SensorDevice sensorDevice) {
        this.sensorDevice = sensorDevice;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public SensorThreshold sensor(Sensor sensor) {
        this.sensor = sensor;
        return this;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public SensorGroup getSensorGroup() {
        return sensorGroup;
    }

    public SensorThreshold sensorGroup(SensorGroup sensorGroup) {
        this.sensorGroup = sensorGroup;
        return this;
    }

    public void setSensorGroup(SensorGroup sensorGroup) {
        this.sensorGroup = sensorGroup;
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
        SensorThreshold sensorThreshold = (SensorThreshold) o;
        if (sensorThreshold.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sensorThreshold.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SensorThreshold{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", value=" + getValue() +
            "}";
    }
}
