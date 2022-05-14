import { Component, Input } from '@angular/core';
import { UsersService } from 'src/app/users/services/users.service';
import { UserInterface } from 'src/app/users/types/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input('user') userProps!: UserInterface;
  name: string = '';

  constructor(private usersService: UsersService) { }

  onUserChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.name = target.value;
  }

  onSave(user: UserInterface) {
    const nameValue = this.name ? this.name : user.name;
    const updatedUser = {
      ...user,
      name: nameValue,
      isEditing: false
    }
    this.usersService.saveUser(updatedUser);
  }

  onEdit(id: string) {
    this.usersService.editUserById(id)
  }

  onDelete(id: string) {
    this.usersService.deleteUserById(id);
  }
}
