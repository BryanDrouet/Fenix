let categories = [
    { name: 'Histoire', questions: [{ type: 'vrai_faux', question: 'La Révolution Française a eu lieu en 1789.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: 'oui_non', question: 'Napoléon Bonaparte est né en Corse.', answers: ['Oui', 'Non'], correct: 'Oui' }] },
    { name: 'Théâtre', questions: [{ type: 'vrai_faux', question: 'Molière a écrit "Le Cid".', answers: ['Vrai', 'Faux'], correct: 'Faux' }, { type: '2_4', question: 'Qui est l\'auteur de "Le Misanthrope"?', answers: ['Molière', 'Racine', 'Corneille', 'Victor Hugo'], correct: 'Molière' }] },
    { name: 'Photo', questions: [{ type: 'vrai_faux', question: 'Le daguerréotype est une technique photographique.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: 'oui_non', question: 'Les photographies en noir et blanc étaient plus populaires au début du 20e siècle.', answers: ['Oui', 'Non'], correct: 'Oui' }] },
    { name: 'Jardinage', questions: [{ type: 'vrai_faux', question: 'Le cactus est une plante aquatique.', answers: ['Vrai', 'Faux'], correct: 'Faux' }, { type: '2_4', question: 'Quelles sont des plantes adaptées pour un jardin de rocaille?', answers: ['Cactus', 'Lavande', 'Rose', 'Fougère'], correct: 'Cactus, Lavande' }] },
    { name: 'Radio', questions: [{ type: 'vrai_faux', question: 'France Inter est une station privée.', answers: ['Vrai', 'Faux'], correct: 'Faux' }, { type: 'oui_non', question: 'La radio FM est plus récente que la radio AM.', answers: ['Oui', 'Non'], correct: 'Non' }] },
    { name: 'Thème Mystère', questions: [{ type: 'vrai_faux', question: 'Le Caméléon change de couleur pour se camoufler.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: '2_4', question: 'Combien de pattes a un insecte?', answers: ['6', '8', '10', '12'], correct: '6' }] },
    { name: 'Jeux Vidéos', questions: [{ type: 'vrai_faux', question: 'Le premier jeu vidéo a été créé en 1958.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: 'oui_non', question: 'Mario est un personnage de Sega.', answers: ['Oui', 'Non'], correct: 'Non' }] },
    { name: 'Politique', questions: [{ type: 'vrai_faux', question: 'Emmanuel Macron a été élu en 2017.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: '2_4', question: 'Qui a fondé le Parti Socialiste en France?', answers: ['Jaurès', 'Mitterrand', 'Hollande', 'Valls'], correct: 'Jaurès' }] },
    { name: 'International', questions: [{ type: 'vrai_faux', question: 'Le Vatican est un pays.', answers: ['Vrai', 'Faux'], correct: 'Vrai' }, { type: '2_4', question: 'Quels pays sont dans l\'Union Européenne?', answers: ['France', 'Suisse', 'Espagne', 'Norvège'], correct: 'France, Espagne' }] }
];

let score = 0;
let currentCategoryIndex = -1;
let currentQuestionIndex = -1;

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
    } else if (currentCategoryIndex < categories.length - 1) {
        currentCategoryIndex++;
        currentQuestionIndex = 0;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('score').textContent = 'Score final : ' + score;
    document.getElementById('score-container').classList.remove('hidden');
}

displayCategories();
