import React, { useState } from 'react';
import styles from './enterprompt.module.css';
//import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

class EnterPrompt extends React.Component {
    // ctor
    constructor(props) {
        super(props);
        this.state  = { prompt: '' }
        this.textInputRef = React.createRef();
        this.resetPrompt = this.resetPrompt.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.onPressHandlerSubmit = this.onPressHandlerSubmit.bind(this);
    }
    
    
    // functions
    resetPrompt() {
        console.log("resetting text input...");
        this.setState( {prompt: '' });
        this.textInputRef.current.clear();
        this.textInputRef.current.focus();
    }
        
    changeTextHandler(e) {
        this.setState( {prompt: e.target.value} );
    }

    async onPressHandlerSubmit(event) {
        event.preventDefault();
        console.log("submitting prompt in text input: " + this.state.prompt);
        
        // process the submitted prompt
        this.props.submitHandler(this.state.prompt);
        
        // clear prompt
        //this.resetPrompt();
        this.setState({prompt: ''});
        
        // request data from server
        const prompt ="\nYou: " + this.state.prompt + "\nJohn: ";
        
        // let server handle the request for us
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt }),
        });
        console.log("generating AI text with following prompt : " + prompt);
        const data = await response.json();
        const textFromAi = data.result;
        console.log("AI answers: " + textFromAi);
        
        console.log(this.props);

        // and provide the ai answer with it
        this.props.subAIHandler(textFromAi);
    }
    
    // rendering component
    render() {
        return (
            <div className={styles.prompt}>
                <form onSubmit={this.onPressHandlerSubmit}>
                    <input
                        type='text'
                        size="150"
                        ref={this.textInputRef}
                        className={styles.input}
                        placeholder="be descriptive, don't hesitate to write long sentences..."
                        onChange={this.changeTextHandler}
                    />
                    <div className={styles.button}>
                    <input type='submit' className={styles.buttonText} value="Enter Prompt" />
                    </div>
                </form>
            </div>
        );
    }
}

// const styles = StyleSheet.create({
//     prompt: {
//         padding: 2,
//         backgroundColor: '#ddd',
//         flexDirection: 'row',
//         padding: 15,
//         margin: 15,
//     },
//     input: {
//         height: 32,
//         width: 500,
//         marginBottom: 10,
//         paddingHorizontal: 8,
//         paddingVertical: 6,
//         textAlign: 'left',
//         borderBottomColor: '#333',
//         borderBottomWidth: 1,
//     },
//     button: {
//         paddingHorizontal: 5,
//         marginLeft: 10,
//         height: 30,
//         width: 120,
//         fontSize: 20,
//         color: '#aaa',
//         fontWeight: 'bold',
//         borderColor: '#222',
//         borderWidth: 2,
//         justifyContent: 'center',
//         backgroundColor: 'coral',
//     },
//     buttonText: {
//         textAlign: 'center',
//         fontWeight: 'bold',
//         color: 'white',
//     }
// });

export default EnterPrompt;