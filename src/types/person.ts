interface Person {
    id: number,
    name: string,
    email: string,
    city: string,
    neighbourhood: string,
    phoNumber: string
}

interface PersonStore {
    id: number,
    name: string,
    email: string
}

export type { Person }
export type { PersonStore }