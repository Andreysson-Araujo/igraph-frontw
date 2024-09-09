import { useState } from 'react';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import Menu from '@/pages/menu';
import Link from 'next/link';
import { FaTent } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";


export default function Configuracoes() {
  return (
    <Box display="flex" height="100vh">
      {/* Menu Lateral */}
      <Box
        w="20%"
        bg="#f4f4f4"
        p={5}
        boxShadow="2px 0 5px rgba(0, 0, 0, 0.1)"
      >
        <Menu />
      </Box>

      {/* Conteúdo Principal */}
      <Box flex="1" p={8}>
        <Heading as="h1" mb={8}>
          Configurações
        </Heading>

        {/* Container Centralizado */}
        <Box display="flex" justifyContent="center" alignItems="center" height="calc(100% - 300px)">
          <Stack spacing={5} width="100%" maxWidth="300px">
            <Link href="/config/servicos" passHref>
              <Button
                width={'400px'}
                height={'80px'}
                size="md"
                colorScheme="blue"
                fontSize={'30px'}
                leftIcon={<FaHandHoldingHeart />}
                _hover={{ transform: 'scale(1.05)', transition: '0.2s' , cursor: 'pointer'}}
              >
                Serviços
              </Button>
            </Link>
            <Link href="/config/unidades" passHref>
              <Button
                width={'400px'}
                height={'80px'}
                size="md"
                colorScheme="blue"
                fontSize={'30px'}
                leftIcon={<FaTent />}
                _hover={{ transform: 'scale(1.05)', transition: '0.2s', cursor: 'pointer' }}
              >
                Unidades
              </Button>
            </Link>
            <Link href="/config/users" passHref>
              <Button
                width={'400px'}
                height={'80px'}
                size="md"
                colorScheme="blue"
                fontSize={'30px'}
                leftIcon={<FaUsersCog />}
                _hover={{ transform: 'scale(1.05)', transition: '0.2s' , cursor: 'pointer'}}
              >
                Usuários
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}