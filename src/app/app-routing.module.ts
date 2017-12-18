import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BuilderRouteComponent} from './routes/builder/builder.route';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'builder',
    pathMatch: 'full'
  },
  {
    path: 'builder',
    component: BuilderRouteComponent
  },
  {
    path: '**',
    redirectTo: 'builder'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
