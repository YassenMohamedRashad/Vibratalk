const texts = document.querySelector( '.texts' );
const startBtn = document.getElementById( 'startBtn' );
const checkBtn = document.getElementById( 'checkBtn' );
const endBtn = document.getElementById( 'endBtn' );

// morse code for each letter
const cipher = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
  'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..'
};

const charVibrate = {
  ".": 200,
  "-": 500
};

// alphapets uppercase
const uppercaseAlphabets = [];
for ( let i = 65; i <= 90; i++ )
{
  uppercaseAlphabets.push( String.fromCharCode( i ) );
}

// will contain the final morse code for the recognised text, and " " for the space between talking
const answer = [];

// the final text for the user will be here
let finalResult = "";

// recognition process
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement( 'p' );

recognition.addEventListener( 'result', ( e ) =>
{
  texts.appendChild( p );
  const text = Array.from( e.results )
    .map( result => result[ 0 ] )
    .map( result => result.transcript )
    .join( '' );

  p.innerText = text;
  finalResult = text;
} );

recognition.addEventListener( 'end', () =>
{
  recognition.stop();
  for ( let i = 0; i < finalResult.length; i++ )
  {
    if ( uppercaseAlphabets.includes( finalResult[ i ].toUpperCase() ) )
    {
      if ( cipher[ finalResult[ i ].toUpperCase() ] === undefined )
      {
        answer.push( " " );
      } else
      {
        answer.push( cipher[ finalResult[ i ].toUpperCase() ] );
      }
    }
  }
  console.log( answer );

  // Function to vibrate a single character in Morse code
  function vibrateMorseCode ( char )
  {
    const charArr = char.split( "" );
    charArr.forEach( ( symbol, index ) =>
    {
      setTimeout( () =>
      {
        if ( symbol === "-" )
        {
          navigator.vibrate( charVibrate[ "-" ] );
        } else if ( symbol === "." )
        {
          navigator.vibrate( charVibrate[ "." ] );
        }
      }, index * ( charVibrate[ "-" ] + charVibrate[ "." ] ) );
    } );
  }

  // Loop through each Morse code sequence and vibrate
  answer.forEach( ( e ) =>
  {
    vibrateMorseCode( e );
  } );
} );

startBtn.addEventListener( 'click', () =>
{
  recognition.start();
} );

checkBtn.addEventListener( 'click', () =>
{
  navigator.vibrate( 500 );
} );
