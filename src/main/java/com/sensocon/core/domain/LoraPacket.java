package com.sensocon.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A LoraPacket.
 */
@Entity
@Table(name = "lora_packet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LoraPacket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gateway_id")
    private String gatewayId;

    @Column(name = "rssi")
    private Double rssi;

    @Column(name = "jhi_timestamp")
    private Instant timestamp;

    @Column(name = "temperature_farenheit")
    private Double temperatureFarenheit;

    @Column(name = "pressure_psi")
    private Double pressurePsi;

    @ManyToOne
    @JsonIgnoreProperties("loraPackets")
    private SensorDevice sensorDevice;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGatewayId() {
        return gatewayId;
    }

    public LoraPacket gatewayId(String gatewayId) {
        this.gatewayId = gatewayId;
        return this;
    }

    public void setGatewayId(String gatewayId) {
        this.gatewayId = gatewayId;
    }

    public Double getRssi() {
        return rssi;
    }

    public LoraPacket rssi(Double rssi) {
        this.rssi = rssi;
        return this;
    }

    public void setRssi(Double rssi) {
        this.rssi = rssi;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public LoraPacket timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Double getTemperatureFarenheit() {
        return temperatureFarenheit;
    }

    public LoraPacket temperatureFarenheit(Double temperatureFarenheit) {
        this.temperatureFarenheit = temperatureFarenheit;
        return this;
    }

    public void setTemperatureFarenheit(Double temperatureFarenheit) {
        this.temperatureFarenheit = temperatureFarenheit;
    }

    public Double getPressurePsi() {
        return pressurePsi;
    }

    public LoraPacket pressurePsi(Double pressurePsi) {
        this.pressurePsi = pressurePsi;
        return this;
    }

    public void setPressurePsi(Double pressurePsi) {
        this.pressurePsi = pressurePsi;
    }

    public SensorDevice getSensorDevice() {
        return sensorDevice;
    }

    public LoraPacket sensorDevice(SensorDevice sensorDevice) {
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
        LoraPacket loraPacket = (LoraPacket) o;
        if (loraPacket.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), loraPacket.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LoraPacket{" +
            "id=" + getId() +
            ", gatewayId='" + getGatewayId() + "'" +
            ", rssi=" + getRssi() +
            ", timestamp='" + getTimestamp() + "'" +
            ", temperatureFarenheit=" + getTemperatureFarenheit() +
            ", pressurePsi=" + getPressurePsi() +
            "}";
    }
}
