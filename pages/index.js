import React, { useState } from 'react';
import styles from './index.module.css';
import Header from '../components/header';
import LineItem from '../components/lineitem';
import EnterPrompt from '../components/enterprompt';

const chatPrologue = "You're looking for a few missions to make a few credits. You stop at the Boots bar on Amity, the second biggest station of Mercury II.\nYou came specifically to hang out here because it's packed with Military veterans. There might be a few business opportunities.You meet John at the bar counter. He has a certain charisma. Maybe he has some errands to run or some jobs that need to be taken care of.\nYou: (sitting next to John at the bar) How's that whiskey of yours?\nJohn: It's the best, you should try it for yourself, son.\nYou: I'll take your word for it, whiskey is my favourite. What's yours?\nJohn: Oh yeah, definitely whiskey. Always the best.";

export default function App() {
  // state datas
  const [dialogLines, setDialogLines] = useState([
    { sentence: "Oh yeah, definitely whiskey. Always the best.", isHuman: false, key: '3' },
    { sentence: "I'll take your word for it, whiskey is my favourite. What's yours?", isHuman: true, key: '2' },
    { sentence: "It's the best, you should try it for yourself, son.", isHuman: false, key: '1' },
    { sentence: "How's that whiskey of yours?", isHuman: true, key: '0' },
    // 1, 2, 3, 4
  ]);

  const [dialogLineCount, SetDialogLineCount] = useState(dialogLines.length);

  // functions
  function DisplayChatHistory() {
    const dialogs = dialogLines.map((d) => 
      <LineItem line={d} key={d.key}/>
    );

    return (<ul>{dialogs}</ul>);
  }
    
const submitPromptHandler = (textFromHuman) => {
  // display human prompt in chat history
  SetDialogLineCount(dialogLineCount + 1);
  addLineHandler(textFromHuman, true);
}

const submitAiHandler = (textFromAi) => {
  SetDialogLineCount(dialogLineCount + 1);
  return addLineHandler(textFromAi, false);
}
  
  const addLineHandler = (val, isHuman) => {
    // debug
    let debug = "adding line #" + dialogLineCount.toString() + " for ";
    debug += {isHuman} ? "a Human" : "an AI";
    console.log(debug);
    
    setDialogLines((prevLines) => {
      return [
        {sentence: val, isHuman: isHuman, key: dialogLineCount.toString()},
        ...prevLines
      ]
    });
  }
  
  // rendering functional component
  return (
    <div className={styles.header}>
      <Header />
        <p className={styles.textInputLabel}>What do you say to John?</p>

        <EnterPrompt
          submitHandler={submitPromptHandler} subAIHandler={submitAiHandler}
        />

        <div className={styles.chatHistory}>Chat History
          {DisplayChatHistory()}
        </div>
    </div>
  );
}

// const styles = StyleSheet.create({
  //   header: {
    //     flex: 1,
    //     height: 20,
    //     backgroundColor: '#999',
    //   },
    //   dialog: {
      //     padding: 5,
      //     backgroundColor: '#bbb',
      //   },
      //   textInputLabel: {
        //     paddingTop: 10,
//     paddingBottom: 15,
//     paddingLeft: 10,
//     marginLeft: 5,
//     color: '#333',
//     fontStyle: 'italic',
//   },
//   chatHistory: {
//     margin: 15,
//     paddingHorizontal: 10,
//     paddingTop: 5,
//     paddingBottom: 5,
//     backgroundColor: '#ddd',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });


// export default function Home() {
//   const [animalInput, setAnimalInput] = useState("");
//   const [result, setResult] = useState();

//   async function onSubmit(event) {
//     event.preventDefault();
//     const response = await fetch("/api/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ animal: animalInput }),
//     });
//     const data = await response.json();
//     setResult(data.result);
//     setAnimalInput("");
//   }

//   return (
//     <div>
//       <Head>
//         <title>OpenAI Quickstart</title>
//         <link rel="icon" href="/chat.png" />
//       </Head>

//       <main className={styles.main}>
//         <img src="/chat.png" className={styles.icon} />
//         <h3>Name my pet</h3>
//         <form onSubmit={onSubmit}>
//           <input
//             type="text"
//             name="animal"
//             placeholder="Enter an animal"
//             value={animalInput}
//             onChange={(e) => setAnimalInput(e.target.value)}
//           />
//           <input type="submit" value="Generate names" />
//         </form>
//         <div className={styles.result}>{result}</div>
//       </main>
//     </div>
//   );
// }
