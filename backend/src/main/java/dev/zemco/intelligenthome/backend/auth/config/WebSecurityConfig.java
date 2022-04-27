package dev.zemco.intelligenthome.backend.auth.config;

import dev.zemco.intelligenthome.backend.auth.JwtTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenFilter jwtTokenFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.NEVER)
                    .and()
                .addFilterAt(this.jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                    .antMatchers("/login", "/refresh", "/ws").permitAll()
                    .antMatchers("/", "/*.html", "/*.css", "/*.js").permitAll()
                    .antMatchers("/*.woff", "/*.woff2", "/*.ttf").permitAll()
                    .antMatchers("/*.txt", "/*.ico", "/assets/*.jpg", "/assets/*.png").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .httpBasic().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(this.userDetailsService)
                .passwordEncoder(this.passwordEncoder);
    }

}
