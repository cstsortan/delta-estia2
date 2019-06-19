export interface Content {
    id?: string;
    name: string;
    description: string;
    fileLink: string;
    courseId: string;
    timestamp?: number;
    otherLink: string;
    type: string;
    isPublished?: boolean;
}
