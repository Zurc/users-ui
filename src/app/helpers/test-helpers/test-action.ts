import { Actions } from "@ngrx/effects";
import { EMPTY, Observable } from "rxjs";

export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }
  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getTestActions(): TestActions {
  return new TestActions();
}
