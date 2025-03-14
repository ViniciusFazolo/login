package com.backend.security.dto;

import com.backend.security.domain.Role;

public record UsuarioResponseDTO(
    String id,
    String nome,
    String email,
    Role role
) {
    
}
