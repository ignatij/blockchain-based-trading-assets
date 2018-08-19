import { UserResolver } from './resolvers/user.resolver';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { ItemsResolver } from './resolvers/items.resolver';
import { ItemHistoryComponent } from './history/item-history.component';


export const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        resolve: {
            user: UserResolver,
            items: ItemsResolver
        }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'history/:itemId',
        component: ItemHistoryComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
