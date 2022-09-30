import React from 'react';
import styles from './lineitem.module.css';
//import { Text, StyleSheet } from 'react-native';

export default function LineItem({line}) {
    if (line.isHuman) {
        return (
            <li className={styles.dialogLineYou}>You: {line.sentence}</li>
        );
    } else {
        return (
            <li className={styles.dialogLine}>John: {line.sentence}</li>
        );
    };
}

// const styles = StyleSheet.create({
//     dialogLineYou: {
//         margin: 5,
//         paddingHorizontal: 10,
//         paddingVertical: 0.5,
//         fontSize: 16,
//         fontStyle: 'italic',
//         backgroundColor: '#ace',
//     },
//     dialogLine: {
//         margin: 5,
//         paddingHorizontal: 10,
//         paddingVertical: 0.5,
//         fontSize: 16,
//         fontStyle: 'italic',
//         backgroundColor: '#ccc',
//     }
// })