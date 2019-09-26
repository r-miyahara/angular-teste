import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetalheComponent } from './user-detalhe/user-detalhe.component';
import { UserNovoComponent } from './user-novo/user-novo.component';
import { UserEditarComponent } from './user-editar/user-editar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/service/auth-guard.service';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],  
    data: { title: 'Lista de Users' }
  },
  {
    path: 'user-detalhe/:id',
    component: UserDetalheComponent,
    canActivate: [AuthGuard],  
    data: { title: 'Detalhe do User' }
  },
  {
    path: 'user-novo',
    component: UserNovoComponent,
    canActivate: [AuthGuard],  
    data: { title: 'Adicionar User' }
  },
  {
    path: 'user-editar/:id',
    component: UserEditarComponent,
    canActivate: [AuthGuard],  
    data: { title: 'Editar o User' }
  },
  {  
    path: 'login',  
    component: LoginComponent,  
    data: {  
      title: 'Login'  
    }  
  },
  {  
    path: '',  
    component: LoginComponent,  
    data: {  
      title: 'Login'  
    }  
  }  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
