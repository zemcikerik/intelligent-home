package dev.zemco.intelligenthome.backend;

import dev.zemco.intelligenthome.backend.device.Device;
import dev.zemco.intelligenthome.backend.device.DeviceService;
import dev.zemco.intelligenthome.backend.device.impl.MockDevice;
import dev.zemco.intelligenthome.backend.feature.*;
import dev.zemco.intelligenthome.backend.feature.impl.MockBooleanFeatureUpdateRequestHandler;
import dev.zemco.intelligenthome.backend.feature.impl.MockDropdownFeatureUpdateRequestHandler;
import dev.zemco.intelligenthome.backend.feature.impl.MockFeature;
import dev.zemco.intelligenthome.backend.feature.state.impl.BooleanFeatureStateImpl;
import dev.zemco.intelligenthome.backend.feature.state.FeatureState;
import dev.zemco.intelligenthome.backend.feature.state.impl.DropdownFeatureStateImpl;
import dev.zemco.intelligenthome.backend.feature.state.impl.IntegerFeatureStateImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@Component
@RequiredArgsConstructor
//@EnableScheduling
public class MockRunner implements CommandLineRunner {

    private final DeviceService deviceService;
    private final FeatureService featureService;
    private final Random rng = new Random();

    @Override
    public void run(String... args) {
        this.createAndRegisterMockDevice();
    }

    @Scheduled(fixedRate = 3000L, initialDelay = 3000L)
    public void scheduledAdd() {
        if (rng.nextBoolean()) {
            List<Device> devices = this.deviceService.getActiveDevices();
            Device device = this.pickRandom(devices);
            this.featureService.registerFeature(this.createMockFeature(device.getId()));
        } else {
            this.createAndRegisterMockDevice();
        }
    }

    @Scheduled(fixedRate = 6000L, initialDelay = 6000L)
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
        FeatureType type = this.pickRandom(FeatureType.values());

        return switch (type) {
            case BOOLEAN -> this.createMockBooleanFeature(deviceId);
            case DROPDOWN -> this.createMockDropdownFeature(deviceId);
            case INTEGER -> this.createMockIntegerFeature(deviceId);
            default -> throw new IndexOutOfBoundsException();
        };
    }

    private Feature createMockBooleanFeature(UUID deviceId) {
        return this.createMockFeature(deviceId, FeatureType.BOOLEAN, new BooleanFeatureStateImpl(), MockBooleanFeatureUpdateRequestHandler.class);
    }

    private Feature createMockDropdownFeature(UUID deviceId) {
        List<String> choices = List.of("First", "Second", "Third");
        return this.createMockFeature(deviceId, FeatureType.DROPDOWN, new DropdownFeatureStateImpl(choices), MockDropdownFeatureUpdateRequestHandler.class);
    }

    private Feature createMockIntegerFeature(UUID deviceId) {
        return this.createMockFeature(deviceId, FeatureType.INTEGER, new IntegerFeatureStateImpl(), null);
    }

    private Feature createMockFeature(UUID deviceId, FeatureType type, FeatureState state, Class<? extends FeatureUpdateRequestHandler> handlerClass) {
        return new MockFeature(UUID.randomUUID(), deviceId, "Test Feature", type, state, handlerClass);
    }

    private <T> T pickRandom(List<T> choices) {
        return choices.get(rng.nextInt(choices.size()));
    }

    private <T> T pickRandom(T[] choices) {
        return choices[rng.nextInt(choices.length)];
    }

}
