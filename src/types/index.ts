

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


export type StepsCompletion = {
    [key: number]: boolean;
    // 1: boolean
    // 2: boolean
    // 3: boolean
    // 4: boolean
}