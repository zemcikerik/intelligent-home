package dev.zemco.intelligenthome.backend;

import dev.zemco.intelligenthome.backend.device.Device;
import dev.zemco.intelligenthome.backend.device.DeviceService;
import dev.zemco.intelligenthome.backend.device.impl.MockDevice;
import dev.zemco.intelligenthome.backend.feature.*;
import dev.zemco.intelligenthome.backend.feature.impl.MockBooleanFeatureUpdateRequestHandler;
import dev.zemco.intelligenthome.backend.feature.impl.MockFeature;
import dev.zemco.intelligenthome.backend.feature.state.impl.BooleanFeatureStateImpl;
import dev.zemco.intelligenthome.backend.feature.state.FeatureState;
import dev.zemco.intelligenthome.backend.feature.state.impl.ValueFeatureStateImpl;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@Component
@AllArgsConstructor
@EnableScheduling
public class MockRunner implements CommandLineRunner {

    private final DeviceService deviceService;
    private final FeatureService featureService;
    private final FeatureUpdateRequestService featureUpdateRequestService;

    @Override
    public void run(String... args) {
        this.featureUpdateRequestService.registerHandler(MockBooleanFeatureUpdateRequestHandler.class);
        this.createAndRegisterMockDevice();
    }

    @Scheduled(fixedRate = 2000L, initialDelay = 2000L)
    public void scheduledAdd() {
        if (this.randomBoolean()) {
            List<Device> devices = this.deviceService.getActiveDevices();
            Device device = this.pickRandom(devices);
            this.featureService.registerFeature(this.createMockFeature(device.getId()));
        } else {
            this.createAndRegisterMockDevice();
        }
    }

    @Scheduled(fixedRate = 5000L, initialDelay = 5000L)
    public void scheduledRemove() {
        List<Device> devices = this.deviceService.getActiveDevices();
        Device device = this.pickRandom(devices);

        List<Feature> features = this.featureService.getFeaturesForDevice(device.getId());
        Feature feature = this.pickRandom(features);
        this.featureService.unregisterFeature(feature);

        if (features.size() == 1) {
            this.deviceService.unregisterDevice(device);
        }
    }

    private void createAndRegisterMockDevice() {
        UUID deviceId = UUID.randomUUID();
        this.deviceService.registerDevice(new MockDevice(deviceId, "Test Device"));
        this.featureService.registerFeature(this.createMockFeature(deviceId));
    }

    private Feature createMockFeature(UUID deviceId) {
        boolean booleanType = this.randomBoolean();
        FeatureType type = booleanType ? FeatureType.BOOLEAN : FeatureType.VALUE;
        FeatureState state = booleanType ? new BooleanFeatureStateImpl() : new ValueFeatureStateImpl();
        Class<? extends FeatureUpdateRequestHandler> handlerClass = booleanType ? MockBooleanFeatureUpdateRequestHandler.class : null;
        return new MockFeature(UUID.randomUUID(), deviceId, "Test Feature", type, state, handlerClass);
    }

    private <T> T pickRandom(List<T> choices) {
        Random rng = new Random();
        return choices.get(rng.nextInt(choices.size()));
    }

    private boolean randomBoolean() {
        return new Random().nextBoolean();
    }

}
