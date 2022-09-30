import React from 'react';
import styles from './header.module.css';
//import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <p className={styles.title}>Conversation with John</p>
    );
}

// const styles = StyleSheet.create({
//     header: {
//         height:50,
//         padding: 10,
//         backgroundColor: 'coral',
//     },
//     title: {
//         textAlign: 'center',
//         fontSize: 20,
//         color: '#eee',
//         fontWeight: 'bold',
//     }
// })