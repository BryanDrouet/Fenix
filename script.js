const categories = [
	"Histoire", "Théâtre", "Photo", "Jardinage",
	"Radio", "Thème mystère", "Jeux vidéos", "Politique",
	"International", "Sciences", "Sport", "Musique"
];

const scores = { Matthew: 0, Clément: 0, Ethan: 0 };
let currentPlayerIndex = 0;
const players = ["Matthew", "Clément", "Ethan"];
let selectedAnswer = null;

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
categories.forEach(cat => {
	const btn = document.createElement("button");
	btn.textContent = cat;
	btn.addEventListener("click", () => startQuestion(cat, btn));
	categoriesContainer.appendChild(btn);
});

// Fonction pour lancer une question
function startQuestion(category, btn) {
	hideScores();
	btn.disabled = true;
	btn.style.opacity = "0.5";

	const questionData = {
		question: `Une question sur ${category} ?`,
		answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"],
		correct: Math.floor(Math.random() * 4) // Choix aléatoire d'une bonne réponse
	};

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

	validateButton.textContent = "Question suivante";
	validateButton.onclick = nextPlayer;
}

// Passage au joueur suivant
function nextPlayer() {
	currentPlayerIndex = (currentPlayerIndex + 1) % 3;
	currentPlayerText.textContent = `Joueur: ${players[currentPlayerIndex]}`;
	validateButton.style.display = "none";
	questionContainer.classList.add("hidden");

	// Si toutes les catégories ont été jouées, afficher les scores
	if (document.querySelectorAll("#categories-container button:disabled").length === categories.length) {
		showScores();
	}
}

// Affichage des scores au début de la partie
showScores();
