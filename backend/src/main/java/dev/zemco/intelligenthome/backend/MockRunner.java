package dev.zemco.intelligenthome.backend;

import dev.zemco.intelligenthome.backend.device.Device;
import dev.zemco.intelligenthome.backend.device.DeviceService;
import dev.zemco.intelligenthome.backend.device.impl.MockDevice;
import dev.zemco.intelligenthome.backend.feature.*;
import dev.zemco.intelligenthome.backend.feature.impl.MockFeature;
import dev.zemco.intelligenthome.backend.feature.state.DropdownFeatureState;
import dev.zemco.intelligenthome.backend.feature.state.FeatureState;
import dev.zemco.intelligenthome.backend.feature.state.FeatureStateFactory;
import dev.zemco.intelligenthome.backend.feature.state.TextFeatureState;
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
@EnableScheduling
public class MockRunner implements CommandLineRunner {

    private final DeviceService deviceService;
    private final FeatureService featureService;
    private final FeatureStateFactory featureStateFactory;
    private final FeatureUpdateHandlerClassProvider featureUpdateHandlerClassProvider;
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
            this.createAndRegisterMockFeature(device.getId());
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
        this.createAndRegisterMockFeature(deviceId);
    }

    private void createAndRegisterMockFeature(UUID deviceId) {
        UUID id = UUID.randomUUID();
        FeatureType type = this.pickRandom(FeatureType.values());
        FeatureState state = this.featureStateFactory.createFeatureState(type);
        Class<? extends FeatureUpdateHandler> updateHandler = this.featureUpdateHandlerClassProvider.getFeatureUpdateHandlerClass(type);

        if (type == FeatureType.DROPDOWN) {
            DropdownFeatureState dropdownState = (DropdownFeatureState) state;
            dropdownState.setChoices(List.of("First", "Second", "Third"));
            dropdownState.setSelected("First");
        } else if (type == FeatureType.TEXT) {
            TextFeatureState textState = (TextFeatureState) state;
            textState.setText("Hello, World!");
        }

        Feature feature = new MockFeature(id, deviceId, "Test Feature", type, state, updateHandler);
        this.featureService.registerFeature(feature);
    }

    private <T> T pickRandom(List<T> choices) {
        return choices.get(rng.nextInt(choices.size()));
    }

    private <T> T pickRandom(T[] choices) {
        return choices[rng.nextInt(choices.length)];
    }

}
