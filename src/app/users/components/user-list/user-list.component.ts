import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsersService } from 'src/app/users/services/users.service';
import { UserInterface } from 'src/app/users/types/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  users$: Observable<UserInterface[]>;
  noUsers$: Observable<boolean>;

  constructor(private usersService: UsersService) {
    this.noUsers$ = this.usersService.users$.pipe(map(users => users.length === 0));
    this.users$ = this.usersService.users$;
  }

  editAll(): void {
    this.usersService.editAll();
  }

  deleteAll(): void {
    this.usersService.deleteAll();
  }
}
