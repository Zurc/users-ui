import { UserInterface } from "src/app/users/types/user.interface";
import { getUsersListSelector } from "src/app/users/store/users.selectors";

describe("User selectors", () => {
  it("should return users list", () => {
    const initialState = {
      users: {
        list: [{} as UserInterface, {} as UserInterface],
      },
    };

    const actual = getUsersListSelector(initialState);

    expect(actual).toEqual(initialState.users.list);
  });
});
