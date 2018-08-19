import { ItemHistoryComponent } from './history/item-history.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { UserResolver } from './resolvers/user.resolver';
import { UserComponent } from './home/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { RedirectService } from './services/redirect.service';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './routes';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ItemService } from './services/item.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ItemsResolver } from './resolvers/items.resolver';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    LoaderComponent,
    ItemHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES, {useHash: true}),
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [
    UserService,
    ItemService,
    RedirectService,
    AuthService,
    AuthGuard,
    UserResolver,
    ItemsResolver,
    LoaderService
  ],
  exports: [
    UserComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
