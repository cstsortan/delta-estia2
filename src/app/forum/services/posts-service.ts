import { Post } from "../interfaces/post";
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Tag } from "../interfaces/tag";
import { lazyLoad } from "./firebase-service";
import { AppUser } from "../interfaces/app-user";
import { PostResponse } from "../interfaces/post-response";
import { docData, collectionData } from 'rxfire/firestore';

// export async function getDummyPosts() : Promise<Post[]> {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//     const fetchedPosts: any[] = await response.json();
//     return fetchedPosts.map(fetchedPost => ({
//         id: fetchedPost.id,
//         authorUid: fetchedPost.userId,
//         text: fetchedPost.title,
//         title: fetchedPost.userId
//     } as Post))
// }


// export async function getPosts() : Promise<Post[]> {
//     const response = await fetch('https://dev-forum-45f8b.firebaseapp.com/api/posts');
//     const fetchedPosts: any[] = await response.json();
//     return fetchedPosts as Post[];
// }

// export async function getTags(): Promise<Tag[]> {
//     const response = await fetch('https://dev-forum-45f8b.firebaseapp.com/api/tags');
//     const fetchedTags = await response.json();
//     return fetchedTags as Tag[];
// }

export function getPostDoc(postId: string): Observable<Post> {
    return lazyLoad().pipe(
        switchMap(({app}) => {
            return docData(app.firestore().doc(`forum-posts/${postId}`), 'id');
        }),
        map(posts => posts as Post)
    );
}


export function getPostsCol(query: string[]|null, limit: number = 10): Observable<Post[]> {
    return lazyLoad().pipe(
        switchMap(({app}) => {
            const postsCol = app.firestore().collection('forum-posts');
            if(query) {
                return collectionData<Post>(
                        postsCol
                        .where(query[0], query[1] as any, query[2])
                        .orderBy('timestamp', 'desc')
                        .limit(limit), 'id'
                );
            }
            return collectionData<Post>(postsCol.orderBy('timestamp', 'desc').limit(limit), 'id')
        })
    );
}

export function getTagsCol(): Observable<Tag[]> {
    return lazyLoad().pipe(
        switchMap(({app}) => {
            return collectionData<Tag>(app.firestore()
                .collection('tags').orderBy('name'), 'id')
        })
    );
}

export function addPost(post: Post) {
    return Promise.all([lazyLoad().toPromise(), import('firebase/app')])
    .then(([{app}, firebase]) => {
        app.firestore().collection('forum-posts').add({
            ...post, 
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    });
}

export function addPostResponse(post: Post, response: string, user: AppUser) {
    return Promise.all([lazyLoad().toPromise(), import('firebase/app')])
    .then(([{app}, firebase]) => {
        return app.firestore().collection('post-responses').add({
            text: response,
            author: user,
            rootPost: post,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        } as PostResponse).then(() => {
            return {app, firebase, postId: post.id};
        });
    }).then(({app, firebase, postId}) => {
        return app.firestore().collection('forum-posts').doc(post.id).update({
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    });
}
export function getPostResponses(postId: string): Observable<PostResponse[]> {
    return lazyLoad().pipe(switchMap(({app}) => {
        const responsesCol = app.firestore().collection('post-responses');
        return collectionData<PostResponse>(
            responsesCol.where('rootPost.id', '==', postId).orderBy('timestamp'),
            'id'
        );
    }));
}