import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import { FaHome, FaBell, FaEnvelope, FaCog } from 'react-icons/fa';

const DashboardBottomNavBar = () => {
    return (
        <Flex
            zIndex='9'
            className="dashboard-bottom-navbar"
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            justifyContent="space-around"
            alignItems="center"
            bg="#0b0e13"
            p={2}
        >
            <Link to="/dashboard">
                <Box
                    as={FaHome}
                    size="48px"
                    color={window.location.pathname === '/dashboard' ? 'blue.500' : 'gray.500'}
                    borderRadius="full"
                    p={2}
                    _hover={{ color: 'blue.500' }}
                />
            </Link>
            <Link to="/dashboard/especialistas">
                <Box
                    as={FaBell}
                    size="48px"
                    color={window.location.pathname === '/dashboard/especialistas' ? 'blue.500' : 'gray.500'}
                    borderRadius="full"
                    p={2}
                    _hover={{ color: 'blue.500' }}
                />
            </Link>
            <Link to="/messages">
                <Box
                    as={FaEnvelope}
                    size="48px"
                    color={window.location.pathname === '/messages' ? 'blue.500' : 'gray.500'}
                    borderRadius="full"
                    p={2}
                    _hover={{ color: 'blue.500' }}
                />
            </Link>
            <Link to="/settings">
                <Box
                    as={FaCog}
                    size="48px"
                    color={window.location.pathname === '/settings' ? 'blue.500' : 'gray.500'}
                    borderRadius="full"
                    p={2}
                    _hover={{ color: 'blue.500' }}
                />
            </Link>
        </Flex>
    );
};

export default DashboardBottomNavBar;
