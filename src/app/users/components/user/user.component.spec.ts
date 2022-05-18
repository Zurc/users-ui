import { Injector } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

import { UserComponent } from "./user.component";

describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let store: MockStore;
  const initialState = {
    users: {
      list: [{ id: 1, name: "Coco", isEditing: false }],
      loading: false,
    },
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [provideMockStore({ initialState })],
    });

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
