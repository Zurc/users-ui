import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MockStore extends Observable<any> {
  selectors = new Map<any, BehaviorSubject<any>>();

  constructor() {
    // Required due to the way Angular's DI works
    super();
  }

  dispatch(): void {
    // Stub, no implementation needed
  }

  select(selector: any): BehaviorSubject<any> {
    if (!this.selectors.has(selector)) {
      this.selectors.set(selector, new BehaviorSubject({}));
    }

    return this.selectors.get(selector)!;
  }

  mockState(reducer: any, data: any): void {
    this.select(reducer).next(data);
  }
}
