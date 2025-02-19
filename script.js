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


const scores = { Matthew: 0, Clément: 0, Ethan: 0 };
let currentPlayerIndex = 0;
const players = ["Matthew", "Clément", "Ethan"];
let selectedAnswer = null;
let questionCount = 0; // Compteur de questions répondues

const categoriesContainer = document.getElementById("categories-container");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const validateButton = document.getElementById("validate-button");
const scoreContainer = document.getElementById("score-container");
const currentPlayerText = document.getElementById("current-player");

// Affichage des scores au début de la manche
function showScores() {
	scoreContainer.classList.add("show-score");
}

// Cacher les scores pendant les questions
function hideScores() {
	scoreContainer.classList.remove("show-score");
}

// Affichage des catégories en 4x3
categories.forEach((cat, index) => {
	const btn = document.createElement("button");
	btn.textContent = cat.name;
	btn.addEventListener("click", () => startQuestion(cat, btn));
	categoriesContainer.appendChild(btn);
});

// Fonction pour lancer une question
function startQuestion(category, btn) {
	hideScores();
	btn.disabled = true;
	btn.classList.add("disabled");

	const questionData = category.questions[questionCount];

	questionText.textContent = questionData.question;
	answersContainer.innerHTML = "";
	selectedAnswer = null;
	validateButton.textContent = "Valider";
	validateButton.style.display = "block";
	validateButton.disabled = true;

	questionData.answers.forEach((answer, index) => {
		const btn = document.createElement("button");
		btn.textContent = answer;
		btn.addEventListener("click", () => selectAnswer(btn, index, questionData.correct));
		answersContainer.appendChild(btn);
	});

	questionContainer.classList.remove("hidden");
}

// Sélection de la réponse
function selectAnswer(button, index, correctIndex) {
	[...answersContainer.children].forEach(btn => btn.classList.remove("selected"));
	button.classList.add("selected");
	selectedAnswer = index;
	validateButton.disabled = false;
	validateButton.onclick = () => validateAnswer(correctIndex);
}

// Validation de la réponse
function validateAnswer(correctIndex) {
	[...answersContainer.children].forEach((btn, index) => {
		if (index === correctIndex) btn.classList.add("correct");
		if (index === selectedAnswer && index !== correctIndex) btn.classList.add("incorrect");
	});

	if (selectedAnswer === correctIndex) {
		scores[players[currentPlayerIndex]]++;
		document.getElementById(`score-${players[currentPlayerIndex].toLowerCase()}`).textContent = scores[players[currentPlayerIndex]];
	}

	// Incrémenter le compteur de questions répondues
	questionCount++;

	// Si 2 questions ont été répondues, passer à la question suivante
	if (questionCount >= 2) {
		validateButton.textContent = "Question suivante";
		validateButton.onclick = nextPlayer;
	} else {
		validateButton.textContent = "Suivant";
		validateButton.onclick = nextQuestion;
	}
}

// Passage à la question suivante
function nextQuestion() {
	// Masquer la question précédente
	questionContainer.classList.add("hidden");

	// Lancer la prochaine question
	startQuestion(categories[questionCount % categories.length], categoriesContainer.children[questionCount % categories.length]);
}

// Passage au joueur suivant
function nextPlayer() {
	currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
	currentPlayerText.textContent = `Joueur: ${players[currentPlayerIndex]}`;
	validateButton.style.display = "none";
	questionContainer.classList.add("hidden");

	// Si toutes les catégories ont été jouées, afficher les scores
	if (document.querySelectorAll("#categories-container button.disabled").length === categories.length) {
		showScores();
	}
}

// Affichage des scores au début de la partie
showScores();
