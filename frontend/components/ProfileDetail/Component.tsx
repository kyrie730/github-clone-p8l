import { EmailIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import useProfileDetailViewModel from "./ViewModel";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ProfileDetail(){

    const {data, method} = useProfileDetailViewModel()
    const router = useRouter()
    const id =  router.query.id

    useEffect(()=>{
        if(id){
            method.getUserData(id as string)
        }
    },[id])

    return<>
        <Flex alignItems={'center'} marginTop={10} direction={"column"} gap={4} p={4}>
            <Image
                borderRadius='full'
                boxSize='200px'
                src= {data.userData.image}
                alt='Dan Abramov'
            />
            <Flex direction={"column"} gap={1} alignItems={'center'}>
                <Text fontSize={'2xl'} as={'b'}>{data.userData.name}</Text>
                <Text>{data.userData.id}</Text>
            </Flex>
            <Flex direction={'column'} p={3} gap={4}>
                {data.userData.about &&
                    <>
                        <Text as={'b'}>About</Text>
                        <Text>{data.userData.about}</Text>
                    </>
                }
                <Flex direction={"column"} gap={1}>
                    {data.userData.email ?
                        <Flex alignItems={'center'} gap={3}>
                            <EmailIcon />
                            <Text>{data.userData.email}</Text>
                        </Flex> : <></>
                    }
                    <Flex alignItems={'center'} gap={3}>
                        <Icon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </Icon>
                        <Text><b>{data.userData.followers}</b> followers &bull; <b>{data.userData.following}</b> following</Text>
                    </Flex>
                </Flex>
            </Flex>
            {/*Still mock data*/}
            <Flex direction={'column'} p={3} w={'full'}>
                <Text as={'b'}>Latest Visitor</Text>
                <Flex gap={3}>
                    <Image
                        borderRadius='full'
                        boxSize='60px'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Image
                        borderRadius='full'
                        boxSize='60px'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Image
                        borderRadius='full'
                        boxSize='60px'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                </Flex>
            </Flex>
        </Flex>

    </>
}