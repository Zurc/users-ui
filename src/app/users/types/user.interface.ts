export interface UserInterface {
  id: string;
  name: string;
  isEditing: boolean;
}

export interface UsersStateInterface {
  list: UserInterface[];
}
