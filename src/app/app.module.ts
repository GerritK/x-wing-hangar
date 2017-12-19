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
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatRadioModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {IconsPipe} from './pipes/icons.pipe';
import {ShipStatsComponent} from './components/ship-stats/ship-stats.component';
import {ActionBarComponent} from './components/action-bar/action-bar.component';
import {AppRoutingModule} from './app-routing.module';
import {BuilderRouteComponent} from './routes/builder/builder.route';
import {PilotSelectDialogComponent} from './dialogs/pilot-select/pilot-select.dialog';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ShipSelectorComponent} from './components/ship-selector/ship-selector.component';
import {PilotSelectorComponent} from './components/pilot-selector/pilot-selector.component';
import {FormsModule} from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,

    // Routes
    BuilderRouteComponent,

    // Dialogs
    PilotSelectDialogComponent,

    // Components
    ShipSelectorComponent,
    PilotSelectorComponent,
    ManeuverComponent,
    PilotDetailsComponent,
    ShipStatsComponent,
    ActionBarComponent,

    // Pipes
    IconsPipe
  ],
  entryComponents: [
    // Dialogs
    PilotSelectDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgPipesModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    AppRoutingModule,

    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule
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
