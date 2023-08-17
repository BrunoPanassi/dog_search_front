interface AnnouncementSaveDTO {
    title: string,
    text: string,
    personId: number,
    subCategoryId: number,
    images: Array<String>
}

interface Announcement {
    title: string,
    text: string,
    person: string,
    subCategory: string
}

export type { AnnouncementSaveDTO }
export type { Announcement }