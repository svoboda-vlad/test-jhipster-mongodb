package com.mycompany.myapp.domain;

import java.util.UUID;

public class JobHistoryTestSamples {

    public static JobHistory getJobHistorySample1() {
        return new JobHistory().id("id1");
    }

    public static JobHistory getJobHistorySample2() {
        return new JobHistory().id("id2");
    }

    public static JobHistory getJobHistoryRandomSampleGenerator() {
        return new JobHistory().id(UUID.randomUUID().toString());
    }
}
