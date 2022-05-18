import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

import { StoreModule } from "@ngrx/store";

// Add the imported module to the imports array in beforeEach
beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [StoreModule.forRoot({}), RouterTestingModule],
    declarations: [AppComponent],
  }).compileComponents();
}));

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
