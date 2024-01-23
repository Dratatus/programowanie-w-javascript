const SoundMap = {
  a: document.getElementById('clap'),
  s: document.getElementById('hithat'),
  d: document.getElementById('kick'),
  f: document.getElementById('openhat'),
  g: document.getElementById('boom'),
  h: document.getElementById('ride'),
  j: document.getElementById('snare'),
  k: document.getElementById('tom'),
  l: document.getElementById('tink')
}

const recordingData = [
  [], 
  [], 
  [], 
  [] 
]

let activeRecordingChannel
let startTimes = [0, 0, 0, 0]

document.addEventListener('keydown', handleKeyPress)
document.addEventListener('keyup', handleKeyRelease)

function handleKeyPress(e) {
  playAndRecordSound(e.key);
}

function handleKeyRelease(e) {
  const soundElement = SoundMap[e.key];
  if (soundElement) {
    soundElement.parentElement.classList.remove('pressed')
  }
}

function playAndRecordSound(key) {
  const soundElement = SoundMap[key];
  if (soundElement) {
    soundElement.currentTime = 0;
    soundElement.play();
    soundElement.parentElement.classList.add('pressed');

    if (activeRecordingChannel !== undefined) {
      const soundTime = Date.now() - startTimes[activeRecordingChannel - 1];
      recordingData[activeRecordingChannel - 1].push({ key: key, time: soundTime });
    }
  }
}

function startRecording(channel) {
  if (recordingData[channel - 1].length > 0) {
    recordingData[channel - 1] = [];
  }
  toggleUIForRecording(channel, true);
  setRecordingChannel(channel);

  setTimeout(() => {
    endRecording(channel);
  }, 5000);
}

function setRecordingChannel(channelNumber) {
  if (channelNumber >= 1 && channelNumber <= 4) {
    activeRecordingChannel = channelNumber;
    startTimes[channelNumber - 1] = Date.now();
  } else {
    console.error('Invalid channel number');
  }
}

function endRecording(channel) {
  activeRecordingChannel = undefined;
  toggleUIForRecording(channel, false);
}

function toggleUIForRecording(channel, isRecording) {
  const playButtonId = `channel${channel}Play`;
  document.getElementById(playButtonId).classList.toggle('hidden', isRecording);

  const recButtonId = `channel${channel}Rec`;
  const recIcon = document.getElementById(recButtonId).querySelector('.icon');
  recIcon.classList.toggle('blink', isRecording);
}

function triggerChannelPlayback(channelNumber) {
  recordingData[channelNumber - 1].forEach(soundInfo => {
    setTimeout(() => {
      playSound(SoundMap[soundInfo.key]);
    }, soundInfo.time);
  });
}

function playSound(audioElement) {
  audioElement.currentTime = 0;
  audioElement.play();
}

function playAllChannelsTogether() {
  for (let i = 1; i <= 4; i++) {
    if (recordingData[i - 1].length > 0) {
      triggerChannelPlayback(i);
    }
  }
}
