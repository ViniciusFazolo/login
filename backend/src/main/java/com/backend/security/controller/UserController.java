package com.backend.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.security.domain.Usuario;
import com.backend.security.exceptions.PadraoException;
import com.backend.security.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
public class UserController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<Usuario>> getUsuarios(){
        return ResponseEntity.ok().body(usuarioRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable String id){
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new PadraoException("Usuário não encontrado"));
        
        return ResponseEntity.ok().body(usuario);
    }
}
