package com.backend.security.dto;

public record LoginRequestDTO(
    String email,
    String password
) {
    
}
