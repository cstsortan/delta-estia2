import { createStandardAction } from "typesafe-actions";
import { Tag } from "../interfaces/tag";
import { Post } from "../interfaces/post";

export const navigate = createStandardAction('router/NAVIGATE')<Tag|string>();
export const openPost = createStandardAction('router/OPEN_POST')<Post>();