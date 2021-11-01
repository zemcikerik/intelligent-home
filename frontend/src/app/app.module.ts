import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { APP_STATE_KEY, AppEffects, AppFacade, appReducer } from './store';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceListComponent,
    ErrorMessageComponent,
    LoadingIndicatorComponent
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
    AppFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
