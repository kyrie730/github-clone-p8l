import axios from "axios";
import { RemoteRepository } from "./Repository";
import { GetRepositoriesDto, RepositoriesEntity, RepositoryEntity, UserEntity } from "../Entity";
import moment from "moment";

export class RemoteRepositoryImpl implements RemoteRepository {
    public GetRepositories(payload: GetRepositoriesDto): Promise<RepositoriesEntity> {
        return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/repos/${payload.username}?token=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&limit=${payload.limit}`)
        .then((result): RepositoriesEntity => {return {
            repo: result.data.data.map((e: any): RepositoryEntity=>({
                name: e.name, 
                description: e.description, 
                language: e.language, 
                type: (e.type ? 'private' : 'public'), 
                updatedAt: moment(e.updated_at).toDate()
            })),
            totalRepo: result.data.length
        }})
    }

    public GetUserData(id: string): Promise<UserEntity> {
        return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`)
        .then((result): UserEntity => ({
            image: result.data.avatar_url, 
            id: result.data.login, 
            name: result.data.name, 
            about: result.data.bio, 
            email: result.data.email,
            followers: result.data.followers,
            following: result.data.following
        }))
    }
}