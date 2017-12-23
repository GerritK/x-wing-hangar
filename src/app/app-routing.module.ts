import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BuilderRouteComponent} from './routes/builder/builder.route';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'builder/rebel',
    pathMatch: 'full'
  },
  {
    path: 'builder/:faction',
    component: BuilderRouteComponent
  },
  {
    path: '**',
    redirectTo: 'builder/rebel'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
