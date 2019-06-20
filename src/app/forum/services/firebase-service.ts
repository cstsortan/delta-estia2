import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as firebase from 'firebase/app';

export function lazyLoad() {
    const app$ = of(firebase);
    
    return combineLatest(app$)
      .pipe(
        map(([firebase]) => {
          const app = firebase;
          return { app };
        })
      );
  }

