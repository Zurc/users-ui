import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { FilterEnum } from 'src/app/users/types/filter.enum';
import { UserInterface } from 'src/app/users/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users$ = new BehaviorSubject<UserInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.editAll);

  addUser(name: string) {
    const newUser: UserInterface = {
      name,
      isEditing: false,
      id: Math.random().toString(16)
    }
    const updatedUsers = [...this.users$.getValue(), newUser];
    this.users$.next(updatedUsers);
  }

  editAll() {
    const editedUsers = this.users$.getValue().map((user) => {

      return {
        ...user,
        isEditing: true
      }
    })
    console.log(editedUsers);
    
    this.users$.next(editedUsers)
  }

  deleteAll() {
    this.users$.next([]);
  }

  deleteUserById(id: string) {
    const newUsers = this.users$.getValue().filter(user => user.id !== id);
    this.users$.next(newUsers);
  }

  editUserById(id: string) {
    const newUserIndex = this.users$.getValue().findIndex(user => user.id === id);
    
    if(newUserIndex > -1) {
      const changedUser = {
        ...this.users$.getValue()[newUserIndex],
        isEditing: true
      }
      const newUsers = [
        ...this.users$.getValue().slice(0, newUserIndex),
        changedUser,
        ...this.users$.getValue().slice(newUserIndex + 1),
      ]
      
      return this.users$.next(newUsers);
    }
    return;
  }

  saveUser(newUser: UserInterface) {
    const newUsers = this.users$.getValue().map((user) => user.id === newUser.id ? newUser : user)
    return this.users$.next(newUsers);
  }
}
