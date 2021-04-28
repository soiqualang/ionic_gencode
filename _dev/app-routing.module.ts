import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },  
  { path: 'hinhanh-congtrinh/:tbl_name/:id_congtrinh', loadChildren: './pages/hinhanh-congtrinh/hinhanh-congtrinh.module#HinhanhCongtrinhPageModule' },
  { path: 'map-modal', loadChildren: './map-modal/map-modal.module#MapModalPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },  
  { path: 'list-bieughi-n1', loadChildren: './pages/list-bieughi-n1/list-bieughi-n1.module#ListBieughiN1PageModule' },
  { path: 'list-bieughi-n1/:maso', loadChildren: './pages/view-bieughi-n1/view-bieughi-n1.module#ViewBieughiN1PageModule' },
  { path: 'add-bieughi-n1', loadChildren: './pages/add-bieughi-n1/add-bieughi-n1.module#AddBieughiN1PageModule' },
  { path: 'list-bieughi-n2', loadChildren: './pages/list-bieughi-n2/list-bieughi-n2.module#ListBieughiN2PageModule' },
  { path: 'view-bieughi-n2', loadChildren: './pages/view-bieughi-n2/view-bieughi-n2.module#ViewBieughiN2PageModule' },
  { path: 'add-bieughi-n2', loadChildren: './pages/add-bieughi-n2/add-bieughi-n2.module#AddBieughiN2PageModule' }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
