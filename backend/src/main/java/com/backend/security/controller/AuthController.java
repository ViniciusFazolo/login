package com.backend.security.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.security.domain.Usuario;
import com.backend.security.dto.LoginRequestDTO;
import com.backend.security.dto.LoginResponseDTO;
import com.backend.security.dto.RegisterRequestDTO;
import com.backend.security.dto.RegisterResponseDTO;
import com.backend.security.exceptions.PadraoException;
import com.backend.security.repository.UsuarioRepository;
import com.backend.security.services.TokenService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO credentials){
        Usuario usuario = usuarioRepository.findByEmail(credentials.email())
                            .orElseThrow(() -> new PadraoException("Usuário não encontrado"));
        
        if(passwordEncoder.matches(credentials.password(), usuario.getPassword())){
            String token = this.tokenService.generateToken(usuario);
            return ResponseEntity.ok().body(new LoginResponseDTO(token, usuario.getName(), usuario.getRole()));
        }

        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequestDTO credentials){
        Optional<Usuario> usuario = usuarioRepository.findByEmail(credentials.email());

        if(usuario.isEmpty()){
            Usuario newUser = new Usuario();
            newUser.setPassword(passwordEncoder.encode(credentials.password()));
            newUser.setEmail(credentials.email());
            newUser.setName(credentials.name());
            newUser.setRole(credentials.role());
            newUser = this.usuarioRepository.save(newUser);
            
            return ResponseEntity.ok(new RegisterResponseDTO(newUser.getId(), newUser.getName(), newUser.getEmail(), newUser.getRole()));
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/validate/{token}")
    public boolean validateToken(@PathVariable String token){
        return !tokenService.validateToken(token).isEmpty();
    }
}
