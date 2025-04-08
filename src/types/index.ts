

export type FileType = {
    bucket: string
    key: string
    original_filename: string
    content_type: string
}


export interface Step {
    id: number;
    label: string;
}