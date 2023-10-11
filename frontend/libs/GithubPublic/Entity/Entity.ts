export interface RepositoryEntity{
    name: string
    description: string
    type: 'public' | 'private'
    language: string
    updatedAt: Date
}

export interface RepositoriesEntity{
    repo: RepositoryEntity[],
    totalRepo: number
}

export interface UserEntity{
    image: string
    name: string
    id: string
    about?: string
    email?: string
    followers: number
    following: number
}