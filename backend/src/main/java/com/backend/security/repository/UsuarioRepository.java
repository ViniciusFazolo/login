package com.backend.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.security.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String>{
    Optional<Usuario> findByEmail(String email);
}
