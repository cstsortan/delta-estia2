import { createStandardAction } from "typesafe-actions";
import { Post } from "../interfaces/Post";
import { Tag } from "../interfaces/tag";

export const updatePosts 
    = createStandardAction('posts-list/UPDATE_POSTS')<Post[]>();

export const queryAllDiscussions
    =createStandardAction('posts-list/QUERY_ALL')();

export const showMorePosts
    =createStandardAction('posts-list/RAISE_LIMIT')();

export const queryTag
    =createStandardAction('posts-list/QUERY_TAG')<string>();

export const selectPost
    =createStandardAction('posts-list/SELECT_POST')<Post>();

export const updateTags
    =createStandardAction('posts-list/UPDATE_TAGS')<Tag[]>();