const PLAYFLAG = 'playing'; // HTML class that determines if key animation is active
const KEYBOXCLASS = 'key-info'; // HTML class for key information boxes
const AUDIOIDPREFIX = 'audio-'; // prefix for HTML ID of audio elements
const KEYBOXIDPREFIX = 'key-'; // prefix for HTML ID of key information boxes

// create HTML audio elements and add HTML id to key information box elements
function createAudioElements() {
    let keyBoxes = Array.from(document.getElementsByClassName(KEYBOXCLASS));
    keyBoxes.forEach(key => {
        let children = Array.from(key.childNodes);
        let currentKey = '';
        children.forEach(child => {
            if (child.nodeName === 'H2') {
                currentKey = child.innerHTML.toLowerCase();
                key.id = KEYBOXIDPREFIX + currentKey;
            } else {
                if (child.nodeName === 'P') {
                    let currentSound = child.innerHTML.toLowerCase();
                    let pathToAudioFile = 'sounds/' + currentSound + '.wav';
                    let audioTag = document.createElement('audio');
                    audioTag.id = AUDIOIDPREFIX + currentKey;
                    audioTag.src = pathToAudioFile;
                    let mainTag = document.getElementById('main-block');
                    mainTag.appendChild(audioTag);
                }
            }
        });
    });
}

// create event listener to remove animation for each key information box
function createAnimationEventListeners() {
    let keyBoxes = Array.from(document.getElementsByClassName(KEYBOXCLASS));
    keyBoxes.forEach(box =>
        box.addEventListener('animationend', evt =>
            evt.target.classList.remove(PLAYFLAG)
        )
    );
}

// executed when keydown event is triggered
function processKeydownEvent(evt) {
    let keyPressed = evt.key;
    let soundElement = document.getElementById(AUDIOIDPREFIX + keyPressed);
    if (soundElement !== null) {
        soundElement.currentTime = 0.0;
        soundElement.play();

        // animate corresponding key info box
        let keyBox = document.getElementById(KEYBOXIDPREFIX + keyPressed);
        if (keyBox !== null) {
            keyBox.classList.add(PLAYFLAG);
        }
    }
}

// main program
//let keyArray = createKeyArray();
createAudioElements();
createAnimationEventListeners();
document.addEventListener('keydown', processKeydownEvent);
