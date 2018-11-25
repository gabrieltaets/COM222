import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';
import { CookieModule } from 'ngx-cookie';

import { AuthService } from './database';
import { SharedModule, HeaderComponent, FooterComponent} from './shared';
import { DatabaseModule } from './database/database.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './home/book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes = [
    { path: 'about', component: AboutComponent },
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'category/:id', component: HomeComponent },
    { path: 'book/:isbm', component: BookDetailsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'search/:input', component: HomeComponent },
    { path: 'search', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', canActivate: [AuthService], redirectTo: '/home', pathMatch: 'full' },
    { path: 'profile', canActivate: [AuthService], component: ProfileComponent },
    { path: 'checkout', canActivate: [AuthService], component: CheckoutComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: Error404Component },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    SidebarComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    BookComponent,
    BookDetailsComponent,
    RegisterComponent,
    CartComponent,
    ProfileComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ToasterModule.forRoot(),
    CookieModule.forRoot(),
    DatabaseModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
