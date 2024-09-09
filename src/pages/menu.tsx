import { Box, Heading, Link, List, ListItem, Flex, IconButton, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiHome, FiGrid, FiSettings, FiUser } from 'react-icons/fi';
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import styles from '../styles/menu.module.css';
import logoUp from '../assets/logoUp.png'

export default function Menu() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    // Recuperar o nome do usuário logado do local storage
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Flex>
      <Box
        as="nav"
        className={isCollapsed ? styles.expandir : ''}
        w={isCollapsed ? "100px" : "300px"}
        h="100vh"
        bg="#d3d3d3"
        color="#fff"
        boxShadow="3px 0 0 #FF0077"
        transition="0.5s"
        position="fixed"
        top="0"
        left="0"
        overflow="hidden"
      >
        <Box w="100%" p="10px">
          <IconButton
            aria-label="Expand sidebar"
            icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            onClick={toggleSidebar}
            colorScheme="none"
            color="white"
            fontSize="24px"
            _hover={{ color: '#FF0077' }}
          />
        </Box>
        <Box textAlign="center" mb="20px">
          <Image src={require('../assets/logoUp.png')} alt="" boxSize="80px" mx="auto" style={{height:'150px', width:'300px'}} />
        </Box>

        <List h="100%" spacing={5} mt="10">
          <ListItem className={styles.itemMenu}>
            <Link href="/" display="flex" alignItems="center" p="20px 4%" _hover={{ bg: '#FF0077' }} textDecoration={'none'}>
              <Box as="span" className={styles.icon}>
                <FiHome fontSize="30px" />
              </Box>
              {!isCollapsed && (
                <Box as="span" className={styles.txtLink} ml="40px" opacity={isCollapsed ? 0 : 1} transition="0.5s">
                  Home
                </Box>
              )}
            </Link>
          </ListItem>

          <ListItem className={styles.itemMenu}>
            <Link href="/atendimentos" display="flex" alignItems="center" p="20px 4%" _hover={{ bg: '#FF0077' }} textDecoration={'none'}>
              <Box as="span" className={styles.icon}>
                <FiGrid fontSize="30px" />
              </Box>
              {!isCollapsed && (
                <Box as="span" className={styles.txtLink} ml="40px" opacity={isCollapsed ? 0 : 1} transition="0.5s">
                  Atendimentos
                </Box>
              )}
            </Link>
          </ListItem>
          <ListItem className={styles.itemMenu}>
            <Link href="/relatorios" display="flex" alignItems="center" p="20px 4%" _hover={{ bg: '#FF0077' }} textDecoration={'none'}>
              <Box as="span" className={styles.icon}>
              <BsFileEarmarkSpreadsheet />
              </Box>
              {!isCollapsed && (
                <Box as="span" className={styles.txtLink} ml="40px" opacity={isCollapsed ? 0 : 1} transition="0.5s">
                  Relatorios
                </Box>
              )}
            </Link>
          </ListItem>
          <ListItem className={styles.itemMenu}>
            <Link href="/config" display="flex" alignItems="center" p="20px 4%" _hover={{ bg: '#FF0077' }} textDecoration={'none'}>
              <Box as="span" className={styles.icon}>
                <FiSettings fontSize="30px" />
              </Box>
              {!isCollapsed && (
                <Box as="span" className={styles.txtLink} ml="40px" opacity={isCollapsed ? 0 : 1} transition="0.5s">
                  Configurações
                </Box>
              )}
            </Link>
          </ListItem>

          <ListItem className={styles.itemMenu}>
            <Link href="/account" display="flex" alignItems="center" p="20px 4%" _hover={{ bg: '#FF0077' }} textDecoration={'none'}>
              <Box as="span" className={styles.icon}>
                <FiUser fontSize="30px" />
              </Box>
              {!isCollapsed && (
                <Box as="span" className={styles.txtLink} ml="40px" opacity={isCollapsed ? 0 : 1} transition="0.5s">
                  {loggedInUser ? loggedInUser : 'Conta'}
                </Box>
              )}
            </Link>
          </ListItem>
        </List>
      </Box>
    </Flex>
  );
}
