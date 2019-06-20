import { AppUser } from "./app-user";
import { Tag } from "./tag";

export interface Post {
    id?: string;
    text: string;
    title: string;
    tag?: Tag;
    author?: AppUser;
    timestamp?: any;
    responses?: number;
}