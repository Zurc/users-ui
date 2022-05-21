import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store, StoreModule } from "@ngrx/store";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersService } from "./services/users.service";

import { UsersComponent } from "./components/users/users.component";
import { HeaderComponent } from "./components/header/header.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserComponent } from "./components/user/user.component";
import { reducer } from "src/app/users/store/users.reducer";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "./store/users.effects";

@NgModule({
  declarations: [
    UsersComponent,
    HeaderComponent,
    UserListComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature("users", reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [UsersService, Store],
})
export class UsersModule {}
