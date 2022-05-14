import { Component } from '@angular/core';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private usersService: UsersService) {}

  addUser(newUser: string): void {
    if (newUser) {
      this.usersService.addUser(newUser);
    }
  }
}
