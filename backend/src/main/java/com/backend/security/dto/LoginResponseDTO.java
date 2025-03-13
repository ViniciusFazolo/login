package com.backend.security.dto;

import com.backend.security.domain.Role;

public record LoginResponseDTO(
    String token,
    String name,
    Role role
) {
    
}
