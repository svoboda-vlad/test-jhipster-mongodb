package com.mycompany.myapp.domain;

import java.util.UUID;

public class DepartmentTestSamples {

    public static Department getDepartmentSample1() {
        return new Department().id("id1").departmentName("departmentName1");
    }

    public static Department getDepartmentSample2() {
        return new Department().id("id2").departmentName("departmentName2");
    }

    public static Department getDepartmentRandomSampleGenerator() {
        return new Department().id(UUID.randomUUID().toString()).departmentName(UUID.randomUUID().toString());
    }
}
