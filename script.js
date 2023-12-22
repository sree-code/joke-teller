const button = document.getElementById('button');
const audioElement = document.getElementById('audio');



// Disable or Enable button 
function toggleButton(){
  button.disabled = !button.disabled;
}

// Passing joke to voiceRSS API
function tellMeJoke(joke){
 console.log('tellMeJoke', joke);
 VoiceRSS.speech({
  key: 'c50ce96ccbda4f6e8b4b9cc0a4a092b1',
  src: joke,
  hl: 'en-us',
  v: 'Linda',
  r: 0, 
  c: 'mp3',
  f: '44khz_16bit_stereo',
  ssml: false
});
}

// Get Jokes from Joke Api
async function getJokes(){
	const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
    console.log(data);
    if(data.setup){
      joke = `${data.setup} ... ${data.delivery}`;
    } else{
      joke = data.joke;
    }
    console.log(joke);
    // textToSpeech
    tellMeJoke(joke);
		toggleButton();
	}
	catch(err){
		console.log('fetch error', err)
	}
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)