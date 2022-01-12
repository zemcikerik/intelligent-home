import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import * as Components from './components';
import * as Pipes from './pipes';
import * as Services from './services';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {
  APP_STATE_KEY,
  AppEffects,
  AppFacade,
  appReducer,
  DEVICE_STATE_KEY, DeviceEffects,
  DeviceFacade,
  deviceReducer, FEATURE_STATE_KEY, FeatureEffects, FeatureFacade, featureReducer
} from './store';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PRODUCTION_TOKEN } from './production.token';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Components.BooleanFeatureComponent,
    Components.DeviceComponent,
    Components.DeviceListComponent,
    Components.DropdownFeatureComponent,
    Components.ErrorMessageComponent,
    Components.FeatureComponent,
    Components.FeatureListComponent,
    Components.HomeComponent,
    Components.LoadingIndicatorComponent,
    Components.NavbarComponent,
    Components.IntegerFeatureComponent,
    Components.TextFeatureComponent,
    Pipes.KeysPipe,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      [APP_STATE_KEY]: appReducer,
      [DEVICE_STATE_KEY]: deviceReducer,
      [FEATURE_STATE_KEY]: featureReducer
    }, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : [],
    EffectsModule.forRoot([AppEffects, DeviceEffects, FeatureEffects]),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AppFacade,
    DeviceFacade,
    FeatureFacade,
    Services.DeviceService,
    Services.FeatureService,
    Services.InitialStateService,
    Services.ServerConnectionService,
    { provide: Services.SERVER_URL_TOKEN, useValue: environment.serverUrl },
    { provide: Services.WS_SERVER_URL_TOKEN, useValue: environment.wsServerUrl },
    { provide: PRODUCTION_TOKEN, useValue: environment.production }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
