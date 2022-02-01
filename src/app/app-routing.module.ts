import {NgModule, NgModuleFactory, Type} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guard/keycloak-guard";
import {Observable} from "rxjs";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {
        path: 'my-class',
        loadChildren: (): Type<any> | NgModuleFactory<any> | Observable<Type<any>> | Promise<any> => import('./modules/my-class/my-class.module').then((module) => module.MyClassModule)
      },
      {
        path: 'home',
        loadChildren: (): Type<any> | NgModuleFactory<any> | Observable<Type<any>> | Promise<any> => import('./modules/home/home.module').then((module) => module.HomeModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
