import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import{HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker';


import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './shared/user.service';
import { HomeComponent } from './home/home.component';
import { AuthIntercepter } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { ManufacturerComponent } from './data-tables/manufacturer/manufacturer.component';
import { ProductComponent } from './data-tables/product/product.component';
import { ColorComponent } from './data-tables/color/color.component';
import { AdressComponent } from './data-tables/adress/adress.component';
import { ShopComponent } from './data-tables/shop/shop.component';
import { ClientComponent } from './data-tables/client/client.component';
import { ManufacturerAddEditComponent } from './data-tables/manufacturer/manufacturer-add-edit/manufacturer-add-edit.component';
import { ColorAddEditComponent } from './data-tables/color/color-add-edit/color-add-edit.component';
import { ProductAddEditComponent } from './data-tables/product/product-add-edit/product-add-edit.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { ProductPageComponent } from './product-page/product-page.component';
import { CustomerCartComponent } from './customer-cart/customer-cart.component';
import { CommentsComponent } from './product-page/comments/comments.component';
import { AdressAddEditComponent } from './data-tables/adress/adress-add-edit/adress-add-edit.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ShopAddEditComponent } from './data-tables/shop/shop-add-edit/shop-add-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    CatalogComponent,
    ProductCardComponent,
    ManufacturerComponent,
    ProductComponent,
    ColorComponent,
    AdressComponent,
    ShopComponent,
    ClientComponent,
    ManufacturerAddEditComponent,
    ColorAddEditComponent,
    ProductAddEditComponent,
    ProductPageComponent,
    CustomerCartComponent,
    CommentsComponent,
    AdressAddEditComponent,
    ShopAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass:  AuthIntercepter,
    multi: true
  },MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
