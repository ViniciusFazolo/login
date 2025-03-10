package com.backend.security.dto;

public record RegisterRequestDTO(
    String name,
    String email,
    String password
) {
    
}
