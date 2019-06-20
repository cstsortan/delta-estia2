import { Tag } from "./interfaces/tag";

export interface Route {
    tag?: Tag;
    param?: string;
    routeName?: string;
}
const allDiscTag = {
    colour: 'transparent',
    name: 'All Discussions',
    id: 'disc'
} as Tag;

const followingTag = {
    colour: 'transparent',
    name: 'Following',
    id: 'fol'
} as Tag;

const tagsLink = {
    colour: 'transparent',
    name: 'Tags',
    id: 'tags',
} as Tag;
export const routes = [allDiscTag, tagsLink];