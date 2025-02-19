let categories = [
    { name: 'Histoire', questions: [{ type: 'vrai_faux', question: 'La Révolution Française a eu lieu en 1789.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: 'oui_non', question: 'Napoléon Bonaparte est né en Corse.', answers: ['Oui', 'Non'], correct: 'Oui' }] },
    { name: 'Théâtre', questions: [{ type: 'vrai_faux', question: 'Molière a écrit "Le Cid".', answers: ['Vrai', 'Faux'], correct: 'Faux' }, { type: '2_4', question: 'Qui est l\'auteur de "Le Misanthrope"?', answers: ['Molière', 'Racine', 'Corneille', 'Victor Hugo'], correct: 'Molière' }] },
    { name: 'Photo', questions: [{ type: 'vrai_faux', question: 'Le daguerréotype est une technique photographique.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: 'oui_non', question: 'Les photographies en noir et blanc étaient plus populaires au début du 20e siècle.', answers: ['Oui', 'Non'], correct: 'Oui' }] },
    { name: 'Jardinage', questions: [{ type: 'vrai_faux', question: 'Le cactus est une plante aquatique.', answers: ['Vrai', 'Faux'], correct: 'Faux' }, { type: '2_4', question: 'Quelles sont des plantes adaptées pour un jardin de rocaille?', answers: ['Cactus', 'Lavande', 'Rose', 'Fougère'], correct: 'Cactus, Lavande' }] },
    { name: 'Radio', questions: [{ type: 'vrai_faux', question: 'France Inter est une station privée.', answers: ['Vrai', 'Faux'], correct: 'Faux' }, { type: 'oui_non', question: 'La radio FM est plus récente que la radio AM.', answers: ['Oui', 'Non'], correct: 'Non' }] },
    { name: 'Thème Mystère', questions: [{ type: 'vrai_faux', question: 'Le Caméléon change de couleur pour se camoufler.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: '2_4', question: 'Combien de pattes a un insecte?', answers: ['6', '8', '10', '12'], correct: '6' }] },
    { name: 'Jeux Vidéos', questions: [{ type: 'vrai_faux', question: 'Le premier jeu vidéo a été créé en 1958.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: 'oui_non', question: 'Mario est un personnage de Sega.', answers: ['Oui', 'Non'], correct: 'Non' }] },
    { name: 'Politique', questions: [{ type: 'vrai_faux', question: 'Emmanuel Macron a été élu en 2017.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: '2_4', question: 'Qui a fondé le Parti Socialiste en France?', answers: ['Jaurès', 'Mitterrand', 'Hollande', 'Valls'], correct: 'Jaurès' }] },
    { name: 'International', questions: [{ type: 'vrai_faux', question: 'Le Vatican est un pays.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: '2_4', question: 'Quels pays sont dans l\'Union Européenne?', answers: ['France', 'Suisse', 'Espagne', 'Norvège'], correct: 'France, Espagne' }] },
    { name: 'Science', questions: [{ type: 'vrai_faux', question: 'La Terre est plate.', answers: ['Vrai', 'Faux'], correct: 'Faux' }, { type: '2_4', question: 'Quelle est la planète la plus proche du Soleil?', answers: ['Terre', 'Vénus', 'Mars', 'Mercure'], correct: 'Mercure' }] },
    { name: 'Musique', questions: [{ type: 'vrai_faux', question: 'Beethoven était sourd.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: '2_4', question: 'Qui a composé "La symphonie du Nouveau Monde"?', answers: ['Mozart', 'Beethoven', 'Dvořák', 'Chopin'], correct: 'Dvořák' }] },
    { name: 'Cinéma', questions: [{ type: 'vrai_faux', question: 'La première guerre mondiale est un sujet du film "1917".', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: '2_4', question: 'Qui a réalisé le film "Inception"?', answers: ['Christopher Nolan', 'Steven Spielberg', 'Quentin Tarantino', 'Martin Scorsese'], correct: 'Christopher Nolan' }] }
];

let players = ['Joueur 1', 'Joueur 2', 'Joueur 3'];
let currentPlayerIndex = 0;
let score = 0;
let currentCategoryIndex = -1;
let currentQuestionIndex = -1;
let categoriesPerPlayer = 4;

function displayCategories() {
    const container = document.getElementById('categories-container');
    categories.forEach((category, index) => {
        let categoryButton = document.createElement('button');
        categoryButton.textContent = category.name;
        categoryButton.addEventListener('click', () => startQuiz(index));
        container.appendChild(categoryButton);
    });
}

function startQuiz(categoryIndex) {
    if (players[currentPlayerIndex].completedCategories === categoriesPerPlayer) {
        endGame();
        return;
    }

    currentCategoryIndex = categoryIndex;
    currentQuestionIndex = 0;
    displayQuestion();
    document.getElementById('categories-container').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
}

function displayQuestion() {
    let category = categories[currentCategoryIndex];
    let question = category.questions[currentQuestionIndex];
    
    document.getElementById('question').textContent = question.question;
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = ''; // Clear previous answers

    question.answers.forEach(answer => {
        let button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(answer));
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    let category = categories[currentCategoryIndex];
    let correctAnswer = category.questions[currentQuestionIndex].correct;
    
    if (selectedAnswer === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < category.questions.length) {
        displayQuestion();
    } else {
        endCategory();
    }
}

function endCategory() {
    alert(`${players[currentPlayerIndex]} a terminé la catégorie avec un score de ${score}!`);

    players[currentPlayerIndex].completedCategories++;

    if (players[currentPlayerIndex].completedCategories === categoriesPerPlayer) {
        alert(`${players[currentPlayerIndex]} a terminé toutes ses catégories.`);
    }

    score = 0;

    // Pass to the next player if current player finished their categories
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    
    if (currentPlayerIndex === 0) {
        alert("Fin de la première phase, passage à la phase suivante !");
        // Logic for phase transition goes here
    } else {
        alert(`${players[currentPlayerIndex]}'s tour!`);
    }

    document.getElementById('categories-container').classList.remove('hidden');
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('score-container').classList.add('hidden');
}

// Initialize player objects
players = players.map(player => ({
    name: player,
    completedCategories: 0
}));

displayCategories();
