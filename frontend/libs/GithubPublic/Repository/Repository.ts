import { GetRepositoriesDto, RepositoriesEntity, UserEntity } from "../Entity";

export interface RemoteRepository{
    GetRepositories(payload: GetRepositoriesDto):Promise<RepositoriesEntity>
    GetUserData(id: string): Promise<UserEntity>
}