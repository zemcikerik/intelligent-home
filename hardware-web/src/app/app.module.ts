import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { MaterialModule } from './material.module';
import * as Facade from './state/facade';
import * as Service from './services';
import * as Components from './components';
import { HttpClientModule } from '@angular/common/http';
import { AppEffects, WIFI_FEATURE_KEY, WifiEffects, wifiReducer } from './state';

@NgModule({
  declarations: [
    AppComponent,
    Components.WifiEntryComponent,
    Components.WifiComponent,
    Components.WifiListComponent,
    Components.WifiInfoComponent,
    Components.HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      [WIFI_FEATURE_KEY]: wifiReducer,
      router: routerReducer,
    }, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : [],
    EffectsModule.forRoot([AppEffects, WifiEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    Facade.WifiFacade,
    Service.HomeService,
    Service.WifiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
