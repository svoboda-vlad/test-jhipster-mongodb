package com.mycompany.myapp.domain;

import java.util.UUID;

public class CountryTestSamples {

    public static Country getCountrySample1() {
        return new Country().id("id1").countryName("countryName1");
    }

    public static Country getCountrySample2() {
        return new Country().id("id2").countryName("countryName2");
    }

    public static Country getCountryRandomSampleGenerator() {
        return new Country().id(UUID.randomUUID().toString()).countryName(UUID.randomUUID().toString());
    }
}
