// import { countersReducer } from './counter-reducer';
import { combineReducers } from 'redux';
import { routerReducer } from './router-reducer';
import { layoutReducer, LayoutState } from './layout-reducer';
import { authReducer } from './auth-reducer';
import { postsListReducer, PostsState } from './posts-list-reducer';
import { Route } from '../routes';
import { AppUser } from '../interfaces/app-user';

export interface AppState {
    router: Route;
    layout: LayoutState;
    auth: AppUser | null;
    postsList: PostsState;
}
export const rootReducer = combineReducers<AppState>({
    router: routerReducer,
    layout: layoutReducer,
    auth: authReducer,
    postsList: postsListReducer,
})