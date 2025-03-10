package com.backend.security.dto;

public record LoginResponseDTO(
    String token,
    String name
) {
    
}
