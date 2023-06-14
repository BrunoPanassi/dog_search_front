import { IdAndName } from "./idAndName"

interface SubCategory {
    id: number
    name: string
    category: IdAndName
}

interface SubCategorySaveDTO {
    name: string
    categoryId: number
}

export type { SubCategory }
export type { SubCategorySaveDTO }