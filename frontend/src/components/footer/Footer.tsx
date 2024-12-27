import React from 'react';
import { Text } from '@geist-ui/core';

const Footer: React.FC = () => {
    return (
        <footer>
            <Text p mb={0}>Copyright &copy; {new Date().getFullYear()} | Sumana Ghosh | All rights reserved.</Text>
        </footer>
    );
};

export default Footer;