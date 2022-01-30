import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
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
  appReducer, AuthEffects,
  DEVICE_STATE_KEY,
  DeviceEffects,
  DeviceFacade,
  deviceReducer,
  FEATURE_STATE_KEY,
  FeatureEffects,
  FeatureFacade,
  featureReducer,
  LOGIN_STATE_KEY, LoginEffects,
  LoginFacade,
  loginReducer
} from './store';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PRODUCTION_TOKEN } from './production.token';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    Components.BooleanFeatureComponent,
    Components.ButtonFeatureComponent,
    Components.DeviceComponent,
    Components.DeviceListComponent,
    Components.DeviceManagementComponent,
    Components.DropdownFeatureComponent,
    Components.ErrorMessageComponent,
    Components.FeatureComponent,
    Components.FeatureListComponent,
    Components.HomeComponent,
    Components.LoadingIndicatorComponent,
    Components.LoginComponent,
    Components.NavbarComponent,
    Components.IntegerFeatureComponent,
    Components.TextFeatureComponent,
    Components.StringFeatureComponent,
    Components.UserManagementComponent,
    Pipes.KeysPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    StoreModule.forRoot({
      [APP_STATE_KEY]: appReducer,
      [DEVICE_STATE_KEY]: deviceReducer,
      [FEATURE_STATE_KEY]: featureReducer,
      [LOGIN_STATE_KEY]: loginReducer,
    }, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : [],
    EffectsModule.forRoot([AppEffects, AuthEffects, DeviceEffects, FeatureEffects, LoginEffects]),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppFacade,
    DeviceFacade,
    FeatureFacade,
    LoginFacade,
    Services.AuthService,
    Services.DeviceService,
    Services.FeatureService,
    Services.InitialStateService,
    Services.ServerConnectionService,
    Services.TokenStorageService,
    { provide: Services.SERVER_URL_TOKEN, useValue: environment.serverUrl },
    { provide: Services.WS_SERVER_URL_TOKEN, useValue: environment.wsServerUrl },
    { provide: PRODUCTION_TOKEN, useValue: environment.production },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
