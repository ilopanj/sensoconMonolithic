package com.sensocon.core.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.sensocon.core.domain.enumeration.SensorStatus;
import com.sensocon.core.domain.enumeration.SensorType;

/**
 * A DTO for the Sensor entity.
 */
public class SensorDTO implements Serializable {

    private Long id;

    private String name;

    private SensorStatus status;

    private SensorType sensorType;

    private Instant lastAlert;

    private Long sensorGroupId;

    private Long sensorDeviceId;

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

    public SensorStatus getStatus() {
        return status;
    }

    public void setStatus(SensorStatus status) {
        this.status = status;
    }

    public SensorType getSensorType() {
        return sensorType;
    }

    public void setSensorType(SensorType sensorType) {
        this.sensorType = sensorType;
    }

    public Instant getLastAlert() {
        return lastAlert;
    }

    public void setLastAlert(Instant lastAlert) {
        this.lastAlert = lastAlert;
    }

    public Long getSensorGroupId() {
        return sensorGroupId;
    }

    public void setSensorGroupId(Long sensorGroupId) {
        this.sensorGroupId = sensorGroupId;
    }

    public Long getSensorDeviceId() {
        return sensorDeviceId;
    }

    public void setSensorDeviceId(Long sensorDeviceId) {
        this.sensorDeviceId = sensorDeviceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SensorDTO sensorDTO = (SensorDTO) o;
        if (sensorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sensorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SensorDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", sensorType='" + getSensorType() + "'" +
            ", lastAlert='" + getLastAlert() + "'" +
            ", sensorGroup=" + getSensorGroupId() +
            ", sensorDevice=" + getSensorDeviceId() +
            "}";
    }
}
