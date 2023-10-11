import { GetRepositoriesDto, RemoteRepositoryImpl, RepositoriesEntity, RepositoryEntity } from "libs/GithubPublic"
import { useCallback, useState } from "react"

interface Return{
    data:{
        repos: RepositoriesEntity
    },
    method:{
        getRepos(payload: GetRepositoriesDto): void
    }
}

export default function useRepoListViewModel(): Return {
    const [repos, setRepos] = useState<RepositoriesEntity>({repo: [], totalRepo: 0})
    const RemoteRepository = new RemoteRepositoryImpl()
    const getRepos = useCallback((payload: GetRepositoriesDto)=>{
        RemoteRepository.GetRepositories(payload)
            .then(setRepos)
            .catch(console.log)
    },[])

    return {
        data:{repos},
        method:{getRepos}
    }
}