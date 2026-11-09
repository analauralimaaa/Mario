const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startButton = document.querySelector('#restart');
const scoreElement = document.querySelector('#score');

let score = 0;
let gameOver = false;

// PULO DO MARIO
const jump = () => {
    if (gameOver) return;

    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

// BOTÃO REINICIAR
startButton.addEventListener('click', () => {
    window.location.reload();
});

// PONTUAÇÃO: 1 PONTO A CADA MILISSEGUNDO
const scoreInterval = setInterval(() => {
    if (!gameOver) {
        score++;
        scoreElement.textContent = score;
    }
}, 1);

// MOVIMENTO E COLISÃO
const loop = setInterval(() => {

    if (gameOver) return;

    const pipePosition = pipe.offsetLeft;

    const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        gameOver = true;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './imagens/game-over.png';
        mario.style.width = '115px';
        mario.style.marginLeft = '20px';

        startButton.style.visibility = "visible";
        clearInterval(loop);
        clearInterval(scoreInterval);
    }

}, 10);

// TECLADO
document.addEventListener('keydown', jump);