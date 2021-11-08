package dev.zemco.intelligenthome.backend;

import dev.zemco.intelligenthome.backend.device.Device;
import dev.zemco.intelligenthome.backend.device.DeviceService;
import dev.zemco.intelligenthome.backend.device.MockDevice;
import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureType;
import dev.zemco.intelligenthome.backend.feature.MockFeature;
import dev.zemco.intelligenthome.backend.feature.state.ValueFeatureStateImpl;
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

    @Override
    public void run(String... args) {
        this.createAndRegisterMockDevice();
    }

    @Scheduled(fixedRate = 2000L, initialDelay = 2000L)
    public void scheduledAdd() {
        if (this.shouldAddOnlyFeature()) {
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
        return new MockFeature(UUID.randomUUID(), deviceId, "Test Feature", FeatureType.VALUE, new ValueFeatureStateImpl());
    }

    private <T> T pickRandom(List<T> choices) {
        Random rng = new Random();
        return choices.get(rng.nextInt(choices.size()));
    }

    private boolean shouldAddOnlyFeature() {
        return new Random().nextBoolean();
    }

}
