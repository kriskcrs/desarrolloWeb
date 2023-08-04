
let serial;
let latestData = "waiting for data";
let data = "";


function setup() {
    createCanvas(windowWidth, windowHeight);

    serial = new p5.SerialPort();

    serial.list();
    //serial.open('/dev/tty.HC-05');
    // serial.open('/dev/tty.Bluetooth-Incoming-Port');
    serial.open('/dev/tty.usbmodem1401');

    serial.on('connected', serverConnected);

    serial.on('list', gotList);

    serial.on('data', gotData);

    serial.on('error', gotError);

    serial.on('open', gotOpen);

    serial.on('close', gotClose);
}

function serverConnected() {
    print("Connected to Server");
}

function gotList(thelist) {
    print("List of Serial Ports:");

    for (let i = 0; i < thelist.length; i++) {
        print(i + " " + thelist[i]);
    }
}

function gotOpen() {
    print("Serial Port is Open");
}

function gotClose() {
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

function gotError(theerror) {
    print(theerror);
}

function gotData() {
    let currentString = serial.readLine();
    trim(currentString);
    if (!currentString) return;
    latestData = currentString;
    data = currentString;

}

const fontSizeSlider = document.getElementById('font-size-slider');
const sampleText = document.getElementById('sample-text');

fontSizeSlider.addEventListener('input', () => {
    const fontSize = fontSizeSlider.value + 'px';
    sampleText.style.fontSize = fontSize;
});