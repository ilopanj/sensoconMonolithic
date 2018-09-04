package com.sensocon.core.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.sensocon.core.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.sensocon.core.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Company.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Company.class.getName() + ".locations", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.CompanySettings.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Contact.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Contact.class.getName() + ".notificationGroups", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.SensorDevice.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.SensorDevice.class.getName() + ".sensors", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.SensorDevice.class.getName() + ".loraPackets", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Sensor.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.SensorThreshold.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.SensorGroup.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.NotificationGroup.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.NotificationGroup.class.getName() + ".sensorDevices", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.NotificationGroup.class.getName() + ".contacts", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.LoraGateway.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.LoraPacket.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Location.class.getName(), jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Location.class.getName() + ".sensorDevices", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Company.class.getName() + ".sensorGroups", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Company.class.getName() + ".contacts", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Company.class.getName() + ".notificationGroups", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.SensorDevice.class.getName() + ".thresholds", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Sensor.class.getName() + ".thresholds", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.SensorGroup.class.getName() + ".defaultThresholds", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.Location.class.getName() + ".gateways", jcacheConfiguration);
            cm.createCache(com.sensocon.core.domain.SensorDevice.class.getName() + ".packets", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
