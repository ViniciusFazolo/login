package com.backend.security.domain;

public enum Role {

    ADMIN("admin"),
    USER("user");

    String role;

    Role(String role){
        this.role = role;
    }
}
