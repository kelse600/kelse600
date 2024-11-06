// Lista de palavras para o jogo
const words = ["javascript", "forca", "programacao", "desenvolvimento", "html", "css"];

// Variáveis para armazenar o estado do jogo
let selectedWord = "";        // Palavra escolhida aleatoriamente
let displayedWord = [];       // Palavra com as letras ocultas
let wrongGuesses = 0;         // Número de erros
let guessedLetters = [];     // Letras já adivinhadas
let maxWrongGuesses = 6;      // Máximo de erros permitidos

// Função para inicializar o jogo
function initGame() {
    // Escolher uma palavra aleatória da lista
    selectedWord = words[Math.floor(Math.random() * words.length)];
    
    // Inicializar a palavra oculta com underscores (_)
    displayedWord = Array(selectedWord.length).fill("_");
    
    // Resetar o contador de erros e as letras adivinhadas
    wrongGuesses = 0;
    guessedLetters = [];

    // Atualizar o display da palavra com os espaços em branco
    document.getElementById("message").textContent = "";
    document.getElementById("word").textContent = displayedWord.join(" ");
    
    // Atualizar a imagem da forca
    updateHangmanImage();
    
    // Criar o teclado
    createKeyboard();
}

// Função para atualizar a imagem da forca com base no número de erros
function updateHangmanImage() {
    const images = [
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Hangman-0.png", // 0 erro
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Hangman-1.png", // 1 erro
        "https://upload.wikimedia.org/wikipedia/commons/3/3d/Hangman-2.png", // 2 erro
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Hangman-3.png", // 3 erro
        "https://upload.wikimedia.org/wikipedia/commons/e/ed/Hangman-4.png", // 4 erro
        "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hangman-5.png", // 5 erro
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/Hangman-6.png"  // 6 erro
    ];
    
    // Atualizar a imagem com base no número de erros
    document.getElementById("forca").src = images[wrongGuesses];
}

// Função para criar os botões do teclado
function createKeyboard() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");  // Alfabeto de a a z
    const keyboardDiv = document.getElementById("keyboard");
    keyboardDiv.innerHTML = "";  // Limpar teclado existente

    // Criar botões para cada letra do alfabeto
    alphabet.forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.onclick = () => handleGuess(letter);  // Definir o que acontece quando a letra é clicada
        keyboardDiv.appendChild(button);
    });
}

// Função que trata o palpite do jogador
function handleGuess(letter) {
    // Não faz nada se a letra já foi adivinhada
    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);  // Adicionar a letra à lista de adivinhações

    let correctGuess = false;

    // Verificar se a letra está na palavra
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            displayedWord[i] = letter;  // Substituir o espaço da palavra oculta pela letra correta
            correctGuess = true;
        }
    }

    // Atualizar a palavra exibida
    document.getElementById("word").textContent = displayedWord.join(" ");
    
    // Se o chute foi correto, checar vitória
    if (correctGuess) {
        checkWin();
    } else {
        // Se o chute foi incorreto, incrementar o número de erros
        wrongGuesses++;
        updateHangmanImage();
        checkLose();
    }
}

// Função para checar se o jogador venceu (adivinhou toda a palavra)
function checkWin() {
    if (displayedWord.join("") === selectedWord) {
        document.getElementById("message").textContent = "Você venceu! A palavra é: " + selectedWord;
    }
}

// Função para checar se o jogador perdeu (fez 6 erros)
function checkLose() {
    if (wrongGuesses === maxWrongGuesses) {
        document.getElementById("message").textContent = "Você perdeu! A palavra era: " + selectedWord;
    }
}

// Iniciar o jogo ao carregar a página
initGame();
