package com.sensocon.core.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the LoraPacket entity.
 */
public class LoraPacketDTO implements Serializable {

    private Long id;

    private String gatewayId;

    private Double rssi;

    private Instant timestamp;

    private Double temperatureFarenheit;

    private Double pressurePsi;

    private Long sensorDeviceId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGatewayId() {
        return gatewayId;
    }

    public void setGatewayId(String gatewayId) {
        this.gatewayId = gatewayId;
    }

    public Double getRssi() {
        return rssi;
    }

    public void setRssi(Double rssi) {
        this.rssi = rssi;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Double getTemperatureFarenheit() {
        return temperatureFarenheit;
    }

    public void setTemperatureFarenheit(Double temperatureFarenheit) {
        this.temperatureFarenheit = temperatureFarenheit;
    }

    public Double getPressurePsi() {
        return pressurePsi;
    }

    public void setPressurePsi(Double pressurePsi) {
        this.pressurePsi = pressurePsi;
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

        LoraPacketDTO loraPacketDTO = (LoraPacketDTO) o;
        if (loraPacketDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), loraPacketDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LoraPacketDTO{" +
            "id=" + getId() +
            ", gatewayId='" + getGatewayId() + "'" +
            ", rssi=" + getRssi() +
            ", timestamp='" + getTimestamp() + "'" +
            ", temperatureFarenheit=" + getTemperatureFarenheit() +
            ", pressurePsi=" + getPressurePsi() +
            ", sensorDevice=" + getSensorDeviceId() +
            "}";
    }
}
