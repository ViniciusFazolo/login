package com.backend.security.dto;

import com.backend.security.domain.Role;

public record RegisterResponseDTO(
    String id,
    String name,
    String email,
    Role role
) { }
