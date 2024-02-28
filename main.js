const texts = document.querySelector( '.texts' );
const startBtn = document.getElementById( 'startBtn' );
const endBtn = document.getElementById( 'endBtn' );

// morse code for each letter
var cipher = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
  'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..'
};

var charVibrate = {
  ".": 200,
  "-": 500
};

// alphapets uppercase
var uppercaseAlphabets = [ " " ];
for ( var i = 65; i <= 90; i++ )
{
  uppercaseAlphabets.push( String.fromCharCode( i ) );
}

// will contain the final morse code for the recognised text, and " " for the space between talking
var answer = [];

// the final text for the user will be here
let finalResult = "";

// recognition process
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement( 'p' );


const vibrateFun = async ( char ) =>
{
  if ( char == "-" )
  {
    navigator.vibrate( charVibrate[ "-" ] );
    console.log(500)
    await new Promise( ( resolve ) => setTimeout( resolve, charVibrate[ "-" ] ) );
  } else if ( char == "." )
  {
    navigator.vibrate( charVibrate[ "." ] );
    console.log(200)
    await new Promise( ( resolve ) => setTimeout( resolve, charVibrate[ "." ] ) );
  }
};


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
      if ( cipher[ finalResult[ i ].toUpperCase() ] == undefined )
      {
        answer.push( " " );
      } else
      {
        answer.push( cipher[ finalResult[ i ].toUpperCase() ] );
      }
    }
  }
  console.log( answer );
  answer.forEach( ( e ) =>
  {
    var charArr = e.split( "" );
    charArr.forEach( ( char ) =>
    {
      vibrateFun( char );
    } );
  } );
} );

startBtn.addEventListener( 'click', () =>
{
  recognition.start();
} );



// Object.keys(cipher).forEach(function(key) {
//   var value = cipher[key];
//   console.log("Key:", key, "Value:", value);
// });