package dev.zemco.intelligenthome.backend.auth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

@Configuration
public class WebSocketSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {

    @Override
    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
        messages
                .simpSubscribeDestMatchers("/topic/client/device/*").hasRole("USER")
                .simpSubscribeDestMatchers("/topic/client/feature/*").hasRole("USER")
                .simpDestMatchers("/app/client/feature/request-update/*").hasRole("USER")
                .anyMessage().permitAll(); // until we complete authentication of devices
    }

    @Override
    protected boolean sameOriginDisabled() {
        return true;
    }

}
