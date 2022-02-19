import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from './material.module';
import * as Facade from './state/facade';
import * as Service from './services';
import * as Components from './components';
import { HttpClientModule } from '@angular/common/http';
import {
  AppEffects,
  HOME_FEATURE_KEY,
  HomeEffects,
  homeReducer,
  WIFI_FEATURE_KEY,
  WifiEffects,
  wifiReducer
} from './state';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeStatePipe } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    Components.WifiComponent,
    Components.WifiConnectDialogComponent,
    Components.WifiListComponent,
    Components.WifiInfoComponent,
    Components.HomeComponent,
    Components.HomeStatusComponent,
    Components.HomeServerInfoComponent,
    Components.HomeConnectDialogComponent,
    HomeStatePipe,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      [HOME_FEATURE_KEY]: homeReducer,
      [WIFI_FEATURE_KEY]: wifiReducer,
    }, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : [],
    EffectsModule.forRoot([AppEffects, HomeEffects, WifiEffects]),
  ],
  providers: [
    Facade.HomeFacade,
    Facade.WifiFacade,
    Service.HomeService,
    Service.WifiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
