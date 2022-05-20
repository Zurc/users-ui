import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

import { createComponentFactory, Spectator } from "@ngneat/spectator/jest";

describe("AppComponent", () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule],
  });

  let spectator: Spectator<AppComponent>;

  beforeEach(() => (spectator = createComponent()));

  it("should create the app", () => {
    const app = spectator.component;
    expect(app).toBeTruthy();
  });
});
