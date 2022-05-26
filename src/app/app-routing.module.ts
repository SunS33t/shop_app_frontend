import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ClientComponent } from './data-tables/client/client.component';
import { AdressComponent } from './data-tables/adress/adress.component';
import { ColorComponent } from './data-tables/color/color.component';
import { ManufacturerComponent } from './data-tables/manufacturer/manufacturer.component';
import { ProductComponent } from './data-tables/product/product.component';
import { ShopComponent } from './data-tables/shop/shop.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CustomerCartComponent } from './customer-cart/customer-cart.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CustomerOrdersPageComponent } from './customer-orders-page/customer-orders-page.component';
import { OrderComponent } from './data-tables/order/order.component';

const routes: Routes = [
  {path:'', redirectTo: '/user/login', pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      {path: 'registration', component: RegistrationComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
  {path:'home', component:HomeComponent, canActivate:[AuthGuard],
    children: [
      {path:'admin-panel', component:AdminPanelComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin']}, 
        children: [
          {path:'addresses', component:AdressComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin']}},
          {path:'orders', component:OrderComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin']}},
          {path:'colors', component:ColorComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin']}},
          {path:'manufacturers', component:ManufacturerComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin']}},
          {path:'products', component:ProductComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin']}},
          {path:'shops', component:ShopComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin']}}
        ]},
      {path:'catalog', component:CatalogComponent, canActivate:[AuthGuard], data: {permittedRoles:['Customer']}},
      {path:'cart', component:CustomerCartComponent, canActivate:[AuthGuard], data: {permittedRoles:['Customer']}},
      {path:'order',component:OrderPageComponent, canActivate:[AuthGuard],data:{permittedRoles:['Customer']}},
      {path:'product-details/:id', component:ProductPageComponent, canActivate:[AuthGuard], data: {permittedRoles:['Customer']},pathMatch: 'full'},
      {path:'order-list', component:CustomerOrdersPageComponent, canActivate:[AuthGuard], data: {permittedRoles:['Customer']}},
    ]},
  {path:'forbidden', component:ForbiddenComponent},
  {path:'order-success',component:OrderSuccessComponent, canActivate:[AuthGuard],data:{permittedRoles:['Customer']}}
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
