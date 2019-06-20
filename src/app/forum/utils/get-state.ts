import { Store } from "redux";
import { Observable } from "rxjs";

export function getState$(store: Store) {
    return new Observable((observer) => {
      // emit the current state as first value:
      observer.next(store.getState());
      const unsubscribe = store.subscribe(function () {
        // emit on every new state changes
        observer.next(store.getState());
      });
      // let's return the function that will be called
      // when the Observable is unsubscribed
      return unsubscribe;
    });
  }