import { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3333/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Login Successful',
          description: data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Armazenar o nome do usuário no local storage
        localStorage.setItem('loggedInUser', nickname);

        // Exibir um alerta indicando que o usuário foi autorizado
        alert('Usuário autorizado! Bem-vindo!');
        // Redirecionar ou realizar outras ações após login bem-sucedido
        router.push('/menu');
      } else {
        toast({
          title: 'Login Failed',
          description: data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        alert('Usuário não autorizado. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      alert('Erro ao tentar fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="lg" textAlign="center" mb={6}>
        Igraph Web 3.0
      </Heading>
      <FormControl mb={4} textAlign="center">
        <FormLabel textAlign="center" fontSize="larger">Usuário:</FormLabel>
        <Input
          type="text"
          width="15%"
          height="30px"
          placeholder="Usuario"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4} textAlign="center">
        <FormLabel textAlign="center" fontSize="larger">Senha:</FormLabel>
        <Input
          type="password"
          width="15%"
          height="30px"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Box display="flex" justifyContent="center">
        <Button
          margin="10px"
          width="5%"
          height="40px"
          colorScheme="blue"
          backgroundColor="green"
          cursor="pointer"
          color="#fff"
          borderRadius="15px"
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </Box>
      <Box textAlign="center" mt={4}>@Detin</Box>
    </Box>
  );
}
