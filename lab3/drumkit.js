document.addEventListener('keydown', onKeyPress)

const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2')
}

function onKeyPress(event) {
    if (event.key ==='a'){
    const sound = KeyToSound[event.key]
    playSound(sound)
    }
    else if(event.key ==='s'){
        const sound = KeyToSound[event.key]
        playSound(sound)
    }
}
function playSound(sound) {
    sound.currentTime = 1
    sound.play()
}