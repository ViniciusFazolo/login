package com.backend.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.security.domain.Usuario;
import com.backend.security.dto.UsuarioResponseDTO;
import com.backend.security.exceptions.PadraoException;
import com.backend.security.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
public class UserController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<Page<UsuarioResponseDTO>> getUsuarios(@RequestParam int pagina, @RequestParam int itens){
        Page<Usuario> usuarios = usuarioRepository.findAll(PageRequest.of(pagina, itens));
        return ResponseEntity.ok(usuarios.map(usuario -> new UsuarioResponseDTO(usuario.getId(), usuario.getName(), usuario.getEmail(), usuario.getRole())));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable String id){
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new PadraoException("Usuário não encontrado"));
        
        return ResponseEntity.ok().body(usuario);
    }
}
