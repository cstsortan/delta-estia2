import * as postsListActions from '../actions/posts-list-actions';
import { getType, ActionType } from 'typesafe-actions';
import { Post } from '../interfaces/Post';
import { Tag } from '../interfaces/tag';

export type PostsListAction = ActionType<typeof postsListActions>;

export class PostsState {
    posts: Post[];
    limit: number;
    query: string[]|null;
    selectedPost: Post|null;
    tags: Tag[];

    constructor() {
        this.posts = [];
        this.limit = 10;
        this.query = null;
        this.selectedPost = null;
        this.tags = [];
    }
}

const initialState = new PostsState();

export function postsListReducer(state = initialState, action: PostsListAction): PostsState  {
    switch(action.type) {
        case getType(postsListActions.updatePosts):
            return {
                ...state,
                posts: action.payload,
            } as PostsState;
        case getType(postsListActions.queryAllDiscussions):
            return {
                ...state,
                query: null,
                limit: 10,
            } as PostsState;
        case getType(postsListActions.showMorePosts):
            return {
                ...state,
                limit: state.limit += 10,
            } as PostsState;
        case getType(postsListActions.queryTag):
            return {
                ...state as PostsState,
                query: ['tag.id', '==', action.payload],
            } as PostsState;
        case getType(postsListActions.selectPost):
            return {
                ...state,
                selectedPost: action.payload,
            } as PostsState;

        case getType(postsListActions.updateTags):
            return {
                ...state,
                tags: action.payload,
            }

        default: return state;
    }
}
