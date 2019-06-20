import { AppUser } from "./app-user";
import { Post } from "./Post";

export interface PostResponse {
    text: string;
    author: AppUser;
    rootPost: Post;
    timestamp: any;
    id?: string;
}