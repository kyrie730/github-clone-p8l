import { GetRepositoriesDto, RemoteRepositoryImpl, RepositoriesEntity, RepositoryEntity, UserEntity } from "libs/GithubPublic"
import { useCallback, useState } from "react"

interface Return{
    data:{
        userData: UserEntity
    },
    method:{
        getUserData(id: string): void
    }
}

export default function useProfileDetailViewModel(): Return {
    const [userData, setUserData] = useState<UserEntity>({id: '', image: '', name: '', followers: 0, following: 0})
    const RemoteRepository = new RemoteRepositoryImpl()
    const getUserData = useCallback((id: string)=>{
        RemoteRepository.GetUserData(id)
            .then(setUserData)
            .catch(console.log)
    },[])

    return {
        data:{userData},
        method:{getUserData}
    }
}