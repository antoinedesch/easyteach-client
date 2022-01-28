import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guard/keycloak-guard";
import {MyClassComponent} from "./my-class/my-class.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: 'my-class', component: MyClassComponent},
      {path: 'home', component: HomeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
