import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import * as Components from './components';
import * as Services from './services';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { APP_STATE_KEY, AppEffects, AppFacade, appReducer } from './store';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    Components.DeviceListComponent,
    Components.ErrorMessageComponent,
    Components.LoadingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ [APP_STATE_KEY]: appReducer }, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : [],
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [
    AppFacade,
    Services.ServerConnectionService,
    { provide: Services.SERVER_URL_TOKEN, useValue: environment.serverUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
