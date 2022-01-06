package dev.zemco.intelligenthome.backend.session;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SimpSessionMessageSenderImpl implements SimpSessionMessageSender {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public void convertAndSendToSession(String sessionId, String destination, Object payload) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);

        MessageHeaders headers = headerAccessor.getMessageHeaders();
        this.simpMessagingTemplate.convertAndSendToUser(sessionId, destination, payload, headers);
    }

}
