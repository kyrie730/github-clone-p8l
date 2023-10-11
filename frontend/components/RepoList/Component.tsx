import { Badge, Box, Card, CardBody, Flex, HStack, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import useRepoListViewModel from "./ViewModel";
import { useEffect } from "react";
import { RepositoryEntity } from "libs/GithubPublic";
import { useRouter } from "next/router";
import moment from "moment";

export default function RepoList(){
    const {method, data} = useRepoListViewModel()
    const router = useRouter()
    const id =  router.query.id as string

    useEffect(()=>{
        if(id){
            method.getRepos({limit: 6, username:id})
        }
    },[id])

    function parseDate(date:Date) {
        const now = moment();
        const inputDate = moment(date);

        const minutesAgo = now.diff(inputDate, 'minutes');
        const hoursAgo = now.diff(inputDate, 'hours');
        const daysAgo = now.diff(inputDate, 'days');
        const yearsAgo = now.diff(inputDate, 'years');

        if (minutesAgo < 10) {
            return 'just now';
          } else if (minutesAgo < 60) {
            return `${minutesAgo} minutes ago`;
          } else if (hoursAgo < 24) {
            return `${hoursAgo} hours ago`;
          } else if (daysAgo === 1) {
            return 'yesterday';
          } else if (yearsAgo >= 1) {
            return inputDate.format('MMMM D YYYY');
          } else {
            return inputDate.format('MMMM D');
          }
    }

    return <Card p={4}>
            <HStack>
                <Text fontSize='2xl' as='b'>Repository</Text>
                <Badge colorScheme="gray" borderRadius={"3xl"} padding={3} paddingTop={1} paddingBottom={1}>
                    {data.repos.totalRepo}
                </Badge>
            </HStack>
            <VStack spacing={8} marginTop={4} align={"stretch"}>    
                {data.repos.repo.map((e: RepositoryEntity) => (<>
                <Card border={'solid gray 1px'} style={{backgroundColor: '#f9fafb'}}>
                    <CardBody>
                        <Box>
                            <Flex gap={5}>
                                <Heading size='xs'>
                                    {e.name}
                                </Heading>
                                <Badge colorScheme="purple" textTransform={"lowercase"} borderRadius={"full"} paddingRight={3} paddingLeft={3}>
                                    {e.type}
                                </Badge>
                            </Flex>
                            <Text pt='2' fontSize='sm'>
                                {e.description}
                            </Text>
                        </Box>
                        <Flex gap={10} mt={4}>
                            {e.language ? 
                                <Flex gap={2}>
                                    <Icon viewBox='0 0 200 200' color='red.500'>
                                        <path
                                            fill='currentColor'
                                            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                                        />
                                    </Icon>
                                    <Text fontSize='xs' >
                                        {e.language}
                                    </Text>
                                </Flex> : <></>
                            }
                            <Text fontSize='xs'>
                                updated {parseDate(e.updatedAt)}
                            </Text>
                        </Flex>
                    </CardBody>
                </Card>
                </>))}
            </VStack>
        </Card>
}