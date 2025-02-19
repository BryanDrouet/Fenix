const categories = ["Histoire", "Théâtre", "Photo", "Jardinage", "Radio", "Thème mystère", "Jeux vidéos", "Politique", "International", "Sciences", "Sport", "Musique"];
const scores = { Matthew: 0, Clément: 0, Ethan: 0 };
let currentPlayerIndex = 0;
const players = ["Matthew", "Clément", "Ethan"];
let selectedAnswer = null;

// Affichage des catégories
const categoriesContainer = document.getElementById("categories-container");
categories.forEach(cat => {
	const btn = document.createElement("button");
	btn.textContent = cat;
	btn.addEventListener("click", () => startQuestion(cat));
	categoriesContainer.appendChild(btn);
});

// Gestion des questions
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const validateButton = document.getElementById("validate-button");

function startQuestion(category) {
	const questionData = {
		question: `Une question sur ${category} ?`,
		answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"],
		correct: 1
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

function selectAnswer(button, index, correctIndex) {
	[...answersContainer.children].forEach(btn => btn.classList.remove("selected"));
	button.classList.add("selected");
	selectedAnswer = index;
	validateButton.disabled = false;
	validateButton.onclick = () => validateAnswer(correctIndex);
}

function validateAnswer(correctIndex) {
	[...answersContainer.children].forEach((btn, index) => {
		if (index === correctIndex) btn.classList.add("correct");
		if (index === selectedAnswer && index !== correctIndex) btn.classList.add("incorrect");
	});

	if (selectedAnswer === correctIndex) scores[players[currentPlayerIndex]]++;
	document.getElementById(`score-${players[currentPlayerIndex].toLowerCase()}`).textContent = scores[players[currentPlayerIndex]];

	validateButton.textContent = "Question suivante";
	validateButton.onclick = nextPlayer;
}

function nextPlayer() {
	currentPlayerIndex = (currentPlayerIndex + 1) % 3;
	document.getElementById("current-player").textContent = `Joueur: ${players[currentPlayerIndex]}`;
	validateButton.style.display = "none";
	questionContainer.classList.add("hidden");
}
