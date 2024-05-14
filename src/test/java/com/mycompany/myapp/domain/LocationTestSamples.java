package com.mycompany.myapp.domain;

import java.util.UUID;

public class LocationTestSamples {

    public static Location getLocationSample1() {
        return new Location()
            .id("id1")
            .streetAddress("streetAddress1")
            .postalCode("postalCode1")
            .city("city1")
            .stateProvince("stateProvince1");
    }

    public static Location getLocationSample2() {
        return new Location()
            .id("id2")
            .streetAddress("streetAddress2")
            .postalCode("postalCode2")
            .city("city2")
            .stateProvince("stateProvince2");
    }

    public static Location getLocationRandomSampleGenerator() {
        return new Location()
            .id(UUID.randomUUID().toString())
            .streetAddress(UUID.randomUUID().toString())
            .postalCode(UUID.randomUUID().toString())
            .city(UUID.randomUUID().toString())
            .stateProvince(UUID.randomUUID().toString());
    }
}
