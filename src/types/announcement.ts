interface AnnouncementSaveDTO {
    id: number,
    title: string,
    text: string,
    personId: number,
    subCategoryId: number,
    images: any
}

interface Announcement {
    id: number,
    title: string,
    text: string,
    person: string,
    category: string
    subCategoryId: number
}

export type { AnnouncementSaveDTO }
export type { Announcement }