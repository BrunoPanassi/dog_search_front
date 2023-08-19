interface Authentication {
    email: string
    password: string
}

interface AuthenticationResponse {
    token: string,
    statusCode: string,
    message: string,
    personId: number,
    email: string,
    name: string
}

export type { Authentication }
export type { AuthenticationResponse }