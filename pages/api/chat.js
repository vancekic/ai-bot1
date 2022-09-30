import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.assert(process.env.OPENAI_API_KEY, 'The OPENAI_API_KEY environment variable must be set');

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: req.body.prompt,
    temperature: 0.7,
    max_tokens: 40,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["You:"],
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

// async function generateAI(prompt) {
//   // const completion = await openai.createCompletion({
//   //     model: "text-davinci-002",
//   //     prompt: prompt,
//   //     temperature: 0.7,
//   //     max_tokens: 40,
//   //     top_p: 1,
//   //     frequency_penalty: 0,
//   //     presence_penalty: 0,
//   //     stop: ["You:"],
//   // });
//   // return completion.data.choices[0].text;
//   const DEFAULT_PARAMS = {
//       model: "text-davinci-002",
//       temperature: 0.7,
//       max_tokens: 40,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       stop: ["You:"],
//   };
//   const url = 'https://api.openai.com/v1/completions';
//   const params = {
//       ...DEFAULT_PARAMS,
//       prompt: prompt,
//   };
//   const requestOptions = {
//       method: 'POST',
//       headers: {
//           'Content-Type': application/json,
//           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify(params),
//   };

//   console.log(requestOptions);

//   try {
//       const response = await fetch(url, requestOptions);
//       const data = await response.json();
//       return `${data.choices[0].text}`;
//       //return data.choices[0].text;
//   } catch (err) {
//       return err;
//   }
// }

// export default async function (req, res) {
//   const completion = await openai.createCompletion({
//     model: "text-davinci-002",
//     prompt: generatePrompt(req.body.animal),
//     temperature: 0.6,
//   });
//   res.status(200).json({ result: completion.data.choices[0].text });
// }

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }
