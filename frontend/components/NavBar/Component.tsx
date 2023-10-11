'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Props {
  children: React.ReactNode
}

const NavLink = (props: Props) => {
  const { children } = props
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function WithAction({children}:Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const session = useSession()
  const router = useRouter()

  return (
    <>
      <Box bg={'white'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>
          <Flex alignItems={'center'}>
            <div className='md:block hidden'>
              {session.status !== 'authenticated' &&
                <Button
                  variant={'solid'}
                  colorScheme={'teal'}
                  size={'sm'}
                  mr={4}
                  onClick={()=>signIn()}>
                  Login with Github
                </Button>
              }
            </div>
            <Menu>
              {session.status == 'authenticated' &&
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={session?.data?.user?.image || ''}
                  />
                </MenuButton>
              }
              <MenuList>
                <MenuItem>
                    <Flex gap={2} alignItems={'center'}>
                      <Avatar
                        size={'sm'}
                        src={session?.data?.user?.image || ''}
                      />
                      <Flex direction={'column'}>
                          <Text as={'b'} fontSize={'sm'}>{session.data?.user.name}</Text>
                          <Text fontSize={'sm'} color={'gray'}>{session.data?.user?.email}</Text>
                      </Flex>
                    </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem>View Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={()=>signOut()}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          {session.status !== 'authenticated' &&
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          }
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLink>
                <Button
                  variant={'solid'}
                  colorScheme={'teal'}
                  size={'sm'}
                  mr={4}
                  width='100%'
                  onClick={()=>signIn()}
                >
                  Login with Github
                </Button>
              </NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box>{children}</Box>
    </>
  )
}