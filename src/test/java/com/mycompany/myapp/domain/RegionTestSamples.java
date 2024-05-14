package com.mycompany.myapp.domain;

import java.util.UUID;

public class RegionTestSamples {

    public static Region getRegionSample1() {
        return new Region().id("id1").regionName("regionName1");
    }

    public static Region getRegionSample2() {
        return new Region().id("id2").regionName("regionName2");
    }

    public static Region getRegionRandomSampleGenerator() {
        return new Region().id(UUID.randomUUID().toString()).regionName(UUID.randomUUID().toString());
    }
}
