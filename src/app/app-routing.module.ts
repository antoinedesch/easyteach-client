import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guard/keycloak-guard";
import {TestComponent} from "./test/test.component";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: '', component: TestComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
