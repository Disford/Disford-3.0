const urlParams = new URLSearchParams(window.location.search);
const loadValue = urlParams.get('load');
const titleValue = urlParams.get('title');

const load = document.createElement('iframe');
load.style.width = '100%';
load.style.height = '100%';
load.src = loadValue;

document.getElementById('Container').appendChild(load);
document.getElementById('Title').innerHTML = titleValue;