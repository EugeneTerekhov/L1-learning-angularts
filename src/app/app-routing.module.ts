import { InjectionToken, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InfoComponent } from './page/info/info.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'page'
  },
  {
    path: 'page',
    component: InfoComponent
  }
];

@NgModule({
  providers: [
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
        const externalUrl = route.paramMap.get('externalUrl');
        window.open(externalUrl, '_self');
      }
    }
  ],
  imports: [RouterModule.forRoot(routes/*, {enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }