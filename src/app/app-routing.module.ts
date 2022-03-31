import {NgModule, NgModuleFactory, Type} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guard/keycloak-guard";
import {Observable} from "rxjs";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],  children: [
      {
        path: 'my-class',
        loadChildren: (): Type<any> | NgModuleFactory<any> | Observable<Type<any>> | Promise<any> => import('./modules/my-class/my-class.module').then((module) => module.MyClassModule)
      },
      {
        path: 'home',
        loadChildren: (): Type<any> | NgModuleFactory<any> | Observable<Type<any>> | Promise<any> => import('./modules/home/home.module').then((module) => module.HomeModule)
      },
      {
        path: 'my-exercises',
        loadChildren: (): Type<any> | NgModuleFactory<any> | Observable<Type<any>> | Promise<any> => import('./modules/my-exercises/my-exercises.module').then((module) => module.MyExercisesModule)
      },
      {
        path: 'lsu',
        loadChildren: (): Type<any> | NgModuleFactory<any> | Observable<Type<any>> | Promise<any> => import('./modules/lsu/lsu.module').then((module) => module.LsuModule)
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
