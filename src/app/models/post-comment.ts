export interface PostComment {
    id?: string;
    authorName: string;
    photoUrl: string;
    text: string;
    timestamp?: number;
    userUid: string;
}
