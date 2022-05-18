import { TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./components/header/header.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserComponent } from "./components/user/user.component";
import { UsersComponent } from "./components/users/users.component";
import { UsersService } from "./services/users.service";
import { UsersModule } from "./users.module";

describe(`UsersModule.forFeature()`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        UserListComponent,
        UserComponent,
        UsersComponent,
      ],
      imports: [UsersModule],
    });
  });

  it(`should provide 'UsersService' service`, () => {
    expect(() => TestBed.get(UsersModule)).toBeTruthy();
  });
});

// describe(`UsersModule`, () => {
//   let usersModule: UsersModule;

//   beforeEach(() => {
//     usersModule = new UsersModule();
//   });

//   it(`should create an instance`, () => {
//     expect(usersModule).toBeTruthy();
//   });
// });
