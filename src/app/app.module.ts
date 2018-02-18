import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';

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
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {IconsPipe} from './pipes/icons.pipe';
import {ShipStatsComponent} from './components/ship-stats/ship-stats.component';
import {ActionBarComponent} from './components/action-bar/action-bar.component';
import {AppRoutingModule} from './app-routing.module';
import {BuilderRouteComponent} from './routes/builder/builder.route';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ShipSelectorComponent} from './components/ship-selector/ship-selector.component';
import {PilotSelectorComponent} from './components/pilot-selector/pilot-selector.component';
import {FormsModule} from '@angular/forms';
import {PilotNameComponent} from './components/pilot-name/pilot-name.component';
import {ShipNameComponent} from './components/ship-name/ship-name.component';
import {UpgradeSelectorComponent} from './components/upgrade-selector/upgrade-selector.component';
import {UpgradeProvider} from './providers/upgrade.provider';
import {ExpansionProvider} from './providers/expansion.provider';
import {ConditionProvider} from './providers/condition.provider';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function InitDataFactory(shipProv: ShipProvider,
                                pilotProv: PilotProvider,
                                upgradeProv: UpgradeProvider,
                                conditionProv: ConditionProvider,
                                expansionProv: ExpansionProvider) {
  console.log('start loading data...');

  return () => {
    return new Promise((resolve, reject) => {
      return shipProv.load()
        .flatMap(() => pilotProv.load())
        .flatMap(() => upgradeProv.load())
        .flatMap(() => conditionProv.load())
        .flatMap(() => expansionProv.load())
        .subscribe(() => {
          console.log('successfully loaded data');

          resolve();
        }, (err) => {
          reject(err);
        });
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,

    // Routes
    BuilderRouteComponent,

    // Components
    PilotNameComponent,
    ShipNameComponent,
    ShipSelectorComponent,
    PilotSelectorComponent,
    UpgradeSelectorComponent,
    ManeuverComponent,
    PilotDetailsComponent,
    ShipStatsComponent,
    ActionBarComponent,

    // Pipes
    IconsPipe
  ],
  entryComponents: [],
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
    MatRadioModule,
    MatTabsModule,
    MatInputModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: InitDataFactory,
      deps: [ShipProvider, PilotProvider, UpgradeProvider, ConditionProvider, ExpansionProvider],
      multi: true
    },

    ShipProvider,
    PilotProvider,
    UpgradeProvider,
    ConditionProvider,
    ExpansionProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
