import './components';
import { store } from './store';
import './components/auth/fb-ui-auth';
import {getAuthState} from './services/auth-service';
import { updateAuthState } from './actions/auth-actions';
import { updatePosts, updateTags } from './actions/posts-list-actions';
import { getPostsCol, getTagsCol } from './services/posts-service';
import { getState$ } from './utils/get-state';
import { switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import { PostsState } from './reducers/posts-list-reducer';

import * as equal from 'fast-deep-equal';
import { lazyLoad } from './services/firebase-service';
(window as any).__something = 'ss';
if((window as any).__posts) {
    store.dispatch(updatePosts((window as any).__posts));
}

//Hit the database to retrieve tags and posts
// getTags().then(tags => store.dispatch(updateTags(tags)));
// getPosts().then(posts => store.dispatch(updatePosts(posts)));

_initializeLiveData();

function _initializeLiveData() {
    getAuthState().subscribe(user => {
        store.dispatch(updateAuthState(user));
    });

    lazyLoad().toPromise().then(({app}) => {
        return app.auth().getRedirectResult()
    }).then(url => {
        console.log(url)
    })

    getTagsCol().subscribe(tags => store.dispatch(updateTags(tags)));

    getState$(store)
    .pipe(
        map(state => {
          const postsState = (state as any).postsList as PostsState;
          return {
              query: postsState.query,
              limit: postsState.limit,
              posts: postsState.posts,
          };
        }),
        distinctUntilChanged(equal),
        switchMap((state) => {
            return getPostsCol(state.query, state.limit);
        })
    )
    .subscribe(posts => {
        if(posts === store.getState().postsList.posts){
            return;
        }
        store.dispatch(updatePosts(posts))
    });;
}