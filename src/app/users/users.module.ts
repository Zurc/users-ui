import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './services/users.service';

import { UsersComponent } from './components/users/users.component';
import { HeaderComponent } from './components/header/header.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    UsersComponent,
    HeaderComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  providers: [UsersService]
})
export class UsersModule { }
