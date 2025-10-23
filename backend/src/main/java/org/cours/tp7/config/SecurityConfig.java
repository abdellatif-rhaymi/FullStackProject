package org.cours.tp7.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // désactive CSRF pour permettre les requêtes POST/DELETE
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // toutes les routes accessibles sans login
                );
        return http.build();
    }
}
