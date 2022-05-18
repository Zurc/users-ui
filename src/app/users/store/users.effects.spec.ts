describe("usersService.getAll is successful", () => {
  // it('should return an action of type LOAD_USERS', marbles(m => {
  // }))

  it("should expect true to be true", () => {
    expect(true).toBe(true);
  });
});

// loadUsers$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(ActionTypes.LOAD_USERS),
//       switchMap(() =>
//         this.usersService.getAll().pipe(
//           map((users: UserInterface[]) =>
//             userActions.loadUsersSuccess({ list: users })
//           ),
//           catchError((error: Error) =>
//             of(userActions.loadUsersFailure({ error }))
//           )
//         )
//       )
//     )
//   );
