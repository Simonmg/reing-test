import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "all", loadChildren: () => import("./pages/all/all.module").then(m => m.AllModule) },
  { path: "fav", loadChildren: () => import("./pages/fav/fav.module").then(m => m.FavModule) },
  { path: "", redirectTo: "all", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
