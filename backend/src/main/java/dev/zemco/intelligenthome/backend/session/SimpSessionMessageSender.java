package dev.zemco.intelligenthome.backend.session;

public interface SimpSessionMessageSender {
    void convertAndSendToSession(String sessionId, String destination, Object payload);
}
