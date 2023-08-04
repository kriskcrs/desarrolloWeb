
let serial;
let latestData = "waiting for data";
let data = "";
let bgColor = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    serial = new p5.SerialPort();

    serial.list();
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

    // Convertir el valor recibido a un número entre el rango deseado (por ejemplo, 10 a 40)
    let fontValue = map(parseInt(latestData), 0, 1023, 10, 40);

    // Aplicar el tamaño de fuente al párrafo de ejemplo
    sampleText.style.fontSize = fontValue + 'px';

}

function draw() {
    let valorInicial = latestData;
    console.log(valorInicial);
    let valorMapeado = map(valorInicial, 0, 1023, 0, 255);

    // Usar las coordenadas del mouse para definir los componentes de color (rojo, verde y azul)
    let r = mouseX % 255;
    let g = mouseY % 255;
    let b = valorMapeado;

    // Cambiar el color de fondo
    background(r, g, b);
    text(valorMapeado,10,20);
    // Cambiar el color de la elipse
    fill(255 - r, 255 - g, 255 - b);
    ellipse(mouseX, mouseY, valorMapeado, valorMapeado);
}

const fontSizeSlider = document.getElementById('font-size-slider');
const sampleText = document.getElementById('sample-text');

fontSizeSlider.addEventListener('input', () => {
    const fontSize = fontSizeSlider.value + 'px';
    sampleText.style.fontSize = valorMapeado;
});