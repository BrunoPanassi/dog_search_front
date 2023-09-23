interface AnnouncementSaveDTO {
    id: number,
    title: string,
    text: string,
    personId: number,
    subCategoryId: number,
    images: File[]
}

interface Announcement {
    id: number,
    title: string,
    text: string,
    person: string,
    category: string
    subCategoryId: number,
    images: string[]
}

export type { AnnouncementSaveDTO }
export type { Announcement }