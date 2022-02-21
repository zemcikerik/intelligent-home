package dev.zemco.intelligenthome.backend;

import dev.zemco.intelligenthome.backend.device.Device;
import dev.zemco.intelligenthome.backend.device.DeviceService;
import dev.zemco.intelligenthome.backend.device.impl.MockDevice;
import dev.zemco.intelligenthome.backend.feature.*;
import dev.zemco.intelligenthome.backend.feature.impl.MockFeature;
import dev.zemco.intelligenthome.backend.feature.state.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.*;
import java.util.function.Consumer;

@Component
@RequiredArgsConstructor
@EnableScheduling
public class MockRunner implements CommandLineRunner {

    private final DeviceService deviceService;
    private final FeatureService featureService;
    private final FeatureStateFactory featureStateFactory;
    private final FeatureUpdateHandlerClassProvider featureUpdateHandlerClassProvider;
    private final Random rng = new Random();

    private Feature temperatureFeature;

    @Override
    @Transactional
    public void run(String... args) {
        Device thermometer = this.createDevice("Thermometer", "Measures temperature");
        this.temperatureFeature = this.createFeature(thermometer, "Living Room", FeatureType.TEXT);
        String temperature = String.format("%.2f°C", rng.nextFloat(20, 30));
        Consumer<TextFeatureState> initialThermometerState = state -> state.setText(temperature);
        this.createFeature(thermometer, "Kitchen", FeatureType.TEXT, initialThermometerState);
        this.createFeature(thermometer, "Bedroom", FeatureType.TEXT, initialThermometerState);
        this.createFeature(thermometer, "Bathroom", FeatureType.TEXT, initialThermometerState);

        Device rgb = this.createDevice("RGB Lights", "Lights under the bed");
        this.createFeature(rgb, "On/Off", FeatureType.BOOLEAN);
        List<String> rgbChoices = List.of("Flow", "Sway", "Blink");
        Consumer<DropdownFeatureState> rgbState = state -> state.setChoices(rgbChoices);
        this.createFeature(rgb, "Mode", FeatureType.DROPDOWN, rgbState);

        Device ac = this.createDevice("AC", "Proivdes cooling and heating");
        this.createFeature(ac, "On/Off", FeatureType.BOOLEAN);
        Consumer<IntegerFeatureState> acState = state -> state.setValue(18);
        this.createFeature(ac, "Temperature", FeatureType.INTEGER, acState);

        Device shopSign = this.createDevice("Shop Sign", "Small neon sign");
        Consumer<StringFeatureState> initialShopSignState = state -> state.setText("Sale! 50%");
        this.createFeature(shopSign, "Text", FeatureType.STRING, initialShopSignState);

        this.updateTemperature();
    }

    @Scheduled(initialDelay = 1000L, fixedRate = 1000L)
    public void updateTemperature() {
        TextFeatureState state = (TextFeatureState) this.temperatureFeature.getState();
        float temperature = rng.nextFloat(20, 30);
        state.setText(String.format("%.2f°C", temperature));
        this.featureService.updateFeature(this.temperatureFeature);
    }

    private Device createDevice(String name, String shortDescription) {
        Device device = new MockDevice(UUID.randomUUID(), name, shortDescription);
        this.deviceService.registerDevice(device);
        return device;
    }

    private Feature createFeature(Device device, String name, FeatureType type) {
        return this.createFeature(device, name, type, null);
    }

    private <T extends FeatureState> Feature createFeature(
            Device device,
            String name,
            FeatureType type,
            Consumer<T> stateConsumer
    ) {
        Class<? extends FeatureUpdateHandler> handlerClass = this.featureUpdateHandlerClassProvider.getFeatureUpdateHandlerClass(type);
        FeatureState state = this.featureStateFactory.createFeatureState(type);

        if (stateConsumer != null) {
            //noinspection unchecked
            stateConsumer.accept((T) state);
        }

        Feature feature = new MockFeature(UUID.randomUUID(), device.getId(), name, type, state, handlerClass);
        this.featureService.registerFeature(feature);
        return feature;
    }

}
