interface AnnouncementSaveDTO {
    id: number,
    title: string,
    text: string,
    personId: number,
    subCategoryId: number,
    images: any
}

interface Announcement {
    title: string,
    text: string,
    person: string,
    subCategory: string
}

export type { AnnouncementSaveDTO }
export type { Announcement }