import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ShipProvider} from './providers/ship.provider';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ManeuverComponent} from './components/maneuver/maneuver.component';
import {NgPipesModule} from 'ngx-pipes';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {PilotDetailsComponent} from './components/pilot-details/pilot-details.component';
import {PilotProvider} from './providers/pilot.provider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {IconsPipe} from './pipes/icons.pipe';
import {ShipStatsComponent} from './components/ship-stats/ship-stats.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,

    ManeuverComponent,
    PilotDetailsComponent,
    ShipStatsComponent,

    // Pipes
    IconsPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgPipesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    MatSelectModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [
    ShipProvider,
    PilotProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
