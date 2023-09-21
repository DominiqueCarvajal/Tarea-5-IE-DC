let worms = [];
let newWormInterval = 120; // Intervalo para crear un nuevo gusano desde el centro

function setup() {
  createCanvas(windowWidth, windowHeight); // Hacer que el canvas coincida con el tamaño de la ventana
  background(255, 240, 200);
  noStroke();

  // Crear gusanos iniciales desde el centro
  for (let i = 0; i < 5; i++) {
    worms.push(new Worm(width / 2, height / 2, true, "black"));
  }
}

function draw() {
  background(255, 240, 200);

  // Dibuja y actualiza todos los gusanos
  for (let i = worms.length - 1; i >= 0; i--) {
    worms[i].move();
    worms[i].display();

    if (worms[i].isOffScreen()) {
      if (worms[i].isFromCenter) {
        worms.push(new Worm(width / 2, height / 2, true, "black"));
      }
      worms.splice(i, 1);
    }
  }

  // Crea un nuevo gusano desde el centro a intervalos regulares
  if (frameCount % newWormInterval === 0) {
    worms.push(new Worm(width / 2, height / 2, true, "black"));
  }
}

class Worm {
  constructor(x, y, isFromCenter = false, color) {
    this.body = [];
    this.segmentLength = 20;
    this.x = x;
    this.y = y;
    this.speed = random(1, 3);
    this.angle = random(TWO_PI);
    this.isFromCenter = isFromCenter;
    this.eyeSize = 5; // Tamaño de los ojos
    this.eyeOffset = this.segmentLength * 0.6; // Distancia desde el extremo del gusano
    this.color = color; // Color del gusano (cadena de texto)
  }

  move() {
    const deltaX = cos(this.angle) * this.speed;
    const deltaY = sin(this.angle) * this.speed;
    this.x += deltaX;
    this.y += deltaY;

    this.body.push([this.x, this.y]);

    if (this.body.length > 20) {
      this.body.shift();
    }

    if (random(1) < 0.1) {
      this.angle += random(-PI / 4, PI / 4);
    }
  }

  display() {
    fill(this.color); // Establece el color del gusano
    for (let i = 0; i < this.body.length; i++) {
      const segment = this.body[i];
      ellipse(segment[0], segment[1], this.segmentLength, this.segmentLength / 2);
    }

    // Calcular las coordenadas de los ojos más cerca del extremo del gusano
    const eyeX = this.body[this.body.length - 1][0];
    const eyeY = this.body[this.body.length - 1][1];

    // Dibujar los ojos en el extremo del gusano, POR DENTRO
    fill(255); // Ojos blancos
    ellipse(eyeX, eyeY, this.eyeSize * 2, this.eyeSize * 2); // Ojo izquierdo
    ellipse(eyeX + 10, eyeY, this.eyeSize * 2, this.eyeSize * 2); // Ojo derecho

    // Dibujar las pupilas negras
    fill(0); // Pupilas negras
    ellipse(eyeX, eyeY, this.eyeSize, this.eyeSize); // Pupila izquierda
    ellipse(eyeX + 10, eyeY, this.eyeSize, this.eyeSize); // Pupila derecha
  }

  isOffScreen() {
    return (
      this.x < -this.segmentLength ||
      this.x > width + this.segmentLength ||
      this.y < -this.segmentLength ||
      this.y > height + this.segmentLength
    );
  }
}

function mouseClicked() {
  const randomX = mouseX;
  const randomY = mouseY;
  const randomColor = getRandomColor(); // Generar un color aleatorio
  worms.push(new Worm(randomX, randomY, false, randomColor));
}

// Función para generar un color aleatorio en formato CSS
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ajustar el tamaño del canvas cuando la ventana cambia de tamaño
}
