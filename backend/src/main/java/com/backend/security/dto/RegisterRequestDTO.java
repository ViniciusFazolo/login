package com.backend.security.dto;

import com.backend.security.domain.Role;

public record RegisterRequestDTO(
    String name,
    String email,
    String password,
    Role role
) {
    
}
