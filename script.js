const categories = [
	{ name: "Histoire", questions: [
		{ type: "vrai_faux", question: "La Révolution Française a eu lieu en 1789.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "oui_non", question: "Napoléon Bonaparte est né en Corse.", answers: ["Oui", "Non"], correct: "Oui" }
	]},
	{ name: "Théâtre", questions: [
		{ type: "vrai_faux", question: "Molière a écrit 'Le Cid'.", answers: ["Vrai", "Faux"], correct: "Faux" },
		{ type: "2_4", question: "Qui est l'auteur de 'Le Misanthrope'?", answers: ["Molière", "Racine", "Corneille", "Victor Hugo"], correct: "Molière" }
	]},
	{ name: "Photo", questions: [
		{ type: "vrai_faux", question: "Le daguerréotype est une technique photographique.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "oui_non", question: "Les photographies en noir et blanc étaient plus populaires au début du 20e siècle.", answers: ["Oui", "Non"], correct: "Oui" }
	]},
	{ name: "Jardinage", questions: [
		{ type: "vrai_faux", question: "Le cactus est une plante aquatique.", answers: ["Vrai", "Faux"], correct: "Faux" },
		{ type: "2_4", question: "Quelles sont des plantes adaptées pour un jardin de rocaille?", answers: ["Cactus", "Lavande", "Rose", "Fougère"], correct: "Cactus, Lavande" }
	]},
	{ name: "Radio", questions: [
		{ type: "vrai_faux", question: "France Inter est une station privée.", answers: ["Vrai", "Faux"], correct: "Faux" },
		{ type: "oui_non", question: "La radio FM est plus récente que la radio AM.", answers: ["Oui", "Non"], correct: "Non" }
	]},
	{ name: "Mystère", questions: [
		{ type: "vrai_faux", question: "Le Caméléon change de couleur pour se camoufler.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Combien de pattes a un insecte?", answers: ["6", "8", "10", "12"], correct: "6" }
	]},
	{ name: "Jeux Vidéos", questions: [
		{ type: "vrai_faux", question: "Le premier jeu vidéo a été créé en 1958.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "oui_non", question: "Mario est un personnage de Sega.", answers: ["Oui", "Non"], correct: "Non" }
	]},
	{ name: "Politique", questions: [
		{ type: "vrai_faux", question: "Emmanuel Macron a été élu en 2017.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Qui a fondé le Parti Socialiste en France?", answers: ["Jaurès", "Mitterrand", "Hollande", "Valls"], correct: "Jaurès" }
	]},
	{ name: "International", questions: [
		{ type: "vrai_faux", question: "Le Vatican est un pays.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Quels pays sont dans l'Union Européenne?", answers: ["France", "Suisse", "Espagne", "Norvège"], correct: "France, Espagne" }
	]},
	{ name: "Science", questions: [
		{ type: "vrai_faux", question: "La Terre est plate.", answers: ["Vrai", "Faux"], correct: "Faux" },
		{ type: "2_4", question: "Quelle est la planète la plus proche du Soleil?", answers: ["Terre", "Vénus", "Mars", "Mercure"], correct: "Mercure" }
	]},
	{ name: "Musique", questions: [
		{ type: "vrai_faux", question: "Beethoven était sourd.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Qui a composé 'La symphonie du Nouveau Monde'?", answers: ["Mozart", "Beethoven", "Dvořák", "Chopin"], correct: "Dvořák" }
	]},
	{ name: "Cinéma", questions: [
		{ type: "vrai_faux", question: "La première guerre mondiale est un sujet du film '1917'.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Qui a réalisé le film 'Inception'?", answers: ["Christopher Nolan", "Steven Spielberg", "Quentin Tarantino", "Martin Scorsese"], correct: "Christopher Nolan" }
	]}
];

const players = ["Matthew", "Clément", "Ethan"];
let scores = { Matthew: 0, Clément: 0, Ethan: 0 };
let currentPlayerIndex = 0;
let usedCategories = new Set();
let selectedAnswer = null;
let questionCount = 0;

const categoriesContainer = document.getElementById("categories-container");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const validateButton = document.getElementById("validate-button");
const scoreContainer = document.getElementById("score-container");
const currentPlayerText = document.getElementById("current-player");

if (questionCount >= 2) {
    questionContainer.style.display = "none"; // Cacher les questions après deux questions
    validateButton.style.display = "none";  // Cacher le bouton de validation
    // Si le compteur de questions atteint zéro, cacher les catégories
    if (questionCount === 0) {
        categoriesContainer.classList.add("hidden");
    }
}

function centerCategories() {
	categoriesContainer.style.display = "grid";
	categoriesContainer.style.justifyContent = "center";
	categoriesContainer.style.marginBottom = "30px";
	categoriesContainer.style.animation = "fadeInCategories 0.5s ease-out";
}

// Fonction pour centrer les questions
function centerQuestions() {
	questionContainer.style.display = "block";  // Afficher le conteneur des questions
	questionContainer.style.margin = "0 auto"; // Centrer horizontalement
	questionContainer.style.animation = "fadeInQuestion 0.5s ease-out";
}

// Modifier le début du jeu pour centrer les catégories
centerCategories();

// Fonction pour cacher les catégories et afficher les questions
function hideCategoriesAndShowQuestions() {
    categoriesContainer.classList.add("hidden");  // Cacher les catégories
    questionContainer.classList.remove("hidden");  // Afficher les questions
    centerQuestions();  // Centrer et afficher les questions
}

function showCategories() {
	categoriesContainer.classList.remove("hidden");
	categoriesContainer.classList.add("show");
}

function hideCategories() {
	categoriesContainer.classList.remove("show");
	categoriesContainer.classList.add("hidden");
}

function showQuestionContainer() {
	questionContainer.classList.remove("hidden");
	questionContainer.classList.add("show");
}

function hideQuestionContainer() {
	questionContainer.classList.remove("show");
	questionContainer.classList.add("hidden");
}

// Fonction pour afficher les questions et cacher les catégories
function showQuestions() {
    // Cacher les catégories
    categoriesContainer.style.display = "none";
    questionContainer.style.display = "block";  // Afficher les questions
}

// Fonction pour réafficher les catégories et cacher les questions
function showCategoriesAndHideQuestions() {
    categoriesContainer.style.display = "block";  // Réafficher les catégories
    questionContainer.style.display = "none";  // Cacher les questions

    // Réinitialiser le compteur de questions pour la prochaine série
    questionCount = 0;

    // Réinitialiser l'état de la question-container
    questionContainer.style.display = "block";  // S'assurer que le question-container est visible
    validateButton.style.display = "none";  // Cacher le bouton de validation jusqu'à la prochaine question
}

// Affiche les scores actuels
function showScores() {
	// Met à jour les scores dans l'élément HTML
	document.getElementById("score-Matthew").textContent = scores.Matthew;
	document.getElementById("score-Clément").textContent = scores.Clément;
	document.getElementById("score-Ethan").textContent = scores.Ethan;

	// Affiche la section des scores
	scoreContainer.classList.add("show-score");
}

// Initialise les boutons de catégories
categories.forEach(category => {
	const button = document.createElement("button");
	button.textContent = category.name;
	button.addEventListener("click", () => startQuestion(category, button));
	categoriesContainer.appendChild(button);
});

// Lancer une question
function startQuestion(category, button) {
    if (usedCategories.has(category.name)) return;
    usedCategories.add(category.name);

    // Cacher les catégories et afficher les questions
    hideCategoriesAndShowQuestions();

    // Désactiver le bouton de catégorie
    button.disabled = true;
    button.classList.add("disabled");

    const questionData = category.questions;
    let questionIndex = 0;

    askNextQuestion(questionData, questionIndex);
}

// Afficher la question suivante
function askNextQuestion(questionData, questionIndex) {
    if (questionIndex >= questionData.length) {
        nextPlayer();  // Passer au joueur suivant
        showCategoriesAndHideQuestions();  // Réafficher les catégories après les questions
        return;
    }

    const currentQuestion = questionData[questionIndex];
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    selectedAnswer = null;

    // Afficher les réponses possibles
    currentQuestion.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.classList.add("answer");
        btn.addEventListener("click", () => selectAnswer(btn, currentQuestion.correct));
        answersContainer.appendChild(btn);
    });

    // Afficher la question avec animation
    questionContainer.style.display = "block";
    validateButton.style.display = "block";
    validateButton.disabled = true;

    // Supprimer tout comportement automatique
    validateButton.onclick = () => {
        showCorrectAnswer(currentQuestion.correct);

        // Incrémenter le compteur de questions
        questionCount++;

        // Vérifier si c'est la deuxième question
        if (questionCount >= 2) {
            // Cacher le question-container après la deuxième question
            questionContainer.style.display = "none";
			categoriesContainer.classList.remove("hidden");
        }

        // Remplacer la validation par un bouton "Suivant"
        validateButton.textContent = "Suivant";
        validateButton.onclick = () => {
            askNextQuestion(questionData, questionIndex + 1);
            validateButton.textContent = "Valider";
        };
		questionCount = 0;
    };
}

// Sélectionner une réponse
function selectAnswer(button, correctAnswer) {
    // Désélectionner l'ancienne réponse si elle existe
    if (selectedAnswer) {
        selectedAnswer.classList.remove("selected");
    }

    // Marquer la nouvelle réponse comme sélectionnée
    selectedAnswer = button;
    button.classList.add("selected");

    validateButton.disabled = false; // Activer le bouton Valider
}

// Afficher la réponse correcte
function showCorrectAnswer(correctAnswer) {
	[...answersContainer.children].forEach(btn => {
		if (btn.textContent === correctAnswer) {
			btn.classList.add("correct");
		} else if (btn.classList.contains("selected")) {
			btn.classList.add("incorrect");
		}
		
		// Désactiver tous les boutons après avoir affiché la correction
		btn.disabled = true;
	});

	// Vérifier si la réponse est correcte et ajouter 1 point
	if (selectedAnswer && selectedAnswer.textContent === correctAnswer) {
		scores[players[currentPlayerIndex]] += 1;
	}
	showScores();
}

// Passer au joueur suivant
function nextPlayer() {
	questionCount = 0; // Reset ici pour éviter un reset prématuré
	currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
	currentPlayerText.textContent = `Au tour de ${players[currentPlayerIndex]}`;
	validateButton.style.display = "none";
	questionContainer.classList.add("hidden");

	// Réafficher les catégories après le tour du joueur avec animation
	setTimeout(() => {
		centerCategories();
		categoriesContainer.classList.remove("hidden");
	});

	// Vérifier si toutes les catégories ont été jouées
	if (usedCategories.size === categories.length) {
		alert("Quiz terminé ! Scores finaux : " + JSON.stringify(scores, null, 2));
		location.reload();
	}
}

// Initialisation
showScores();
