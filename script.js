const categories = [
	{ name: "Histoire", questions: [
		{ type: "vrai_faux", question: "La Révolution Française a été provoquée par la prise de la Bastille.", answers: ["Vrai", "Faux"], correct: "Faux" },
		{ type: "oui_non", question: "La guerre de Cent Ans a duré plus de 100 ans.", answers: ["Oui", "Non"], correct: "Non" }
	]},
	{ name: "Théâtre", questions: [
		{ type: "vrai_faux", question: "La pièce 'Le Cid' de Corneille a été jouée pour la première fois en 1637.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Qui a écrit 'Les Femmes Savantes'?", answers: ["Molière", "Racine", "Corneille", "Victor Hugo"], correct: "Molière" }
	]},
	{ name: "Photo", questions: [
		{ type: "vrai_faux", question: "Le daguerréotype a été inventé en 1839 par Louis Daguerre.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "oui_non", question: "La photographie couleur a été popularisée avant la Première Guerre mondiale.", answers: ["Oui", "Non"], correct: "Non" }
	]},
	{ name: "Jardinage", questions: [
		{ type: "vrai_faux", question: "Le bambou peut pousser jusqu'à un mètre par jour dans certaines conditions.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Quelle plante est la plus résistante à la sécheresse?", answers: ["Cactus", "Sarracénie", "Aloe Vera", "Fougère"], correct: "Cactus, Aloe Vera" }
	]},
	{ name: "Radio", questions: [
		{ type: "vrai_faux", question: "La radio FM a été développée par Edwin Armstrong.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "oui_non", question: "Les stations de radio AM émettent sur une bande de fréquence plus haute que celles en FM.", answers: ["Oui", "Non"], correct: "Non" }
	]},
	{ name: "Mystère", questions: [
		{ type: "vrai_faux", question: "Tous les caméléons ont la capacité de changer de couleur.", answers: ["Vrai", "Faux"], correct: "Faux" },
		{ type: "2_4", question: "Combien de types de caméléons existent-il?", answers: ["10", "150", "20", "200"], correct: "150" }
	]},
	{ name: "Jeux Vidéos", questions: [
		{ type: "vrai_faux", question: "Le premier jeu vidéo à avoir intégré des éléments de simulation était 'Space Invaders'.", answers: ["Vrai", "Faux"], correct: "Faux" },
		{ type: "oui_non", question: "Le jeu 'Pong' a été l'un des premiers jeux à utiliser un processeur graphique dédié.", answers: ["Oui", "Non"], correct: "Non" }
	]},
	{ name: "Politique", questions: [
		{ type: "vrai_faux", question: "La Constitution de la Vème République a été adoptée en 1958.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Qui était le Premier ministre lors de la création du Rassemblement National?", answers: ["Mitterrand", "Chirac", "De Gaulle", "Valls"], correct: "De Gaulle" }
	]},
	{ name: "International", questions: [
		{ type: "vrai_faux", question: "L'ONU est basée à Genève, en Suisse.", answers: ["Vrai", "Faux"], correct: "Faux" },
		{ type: "2_4", question: "Quel pays est le plus grand producteur de café au monde?", answers: ["Brésil", "Vietnam", "Colombie", "Inde"], correct: "Brésil" }
	]},
	{ name: "Science", questions: [
		{ type: "vrai_faux", question: "Le soleil est une étoile de type G.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Quel est l'élément chimique dont la formule est H2O?", answers: ["Oxygène", "Azote", "Hydrogène", "Eau"], correct: "Eau" }
	]},
	{ name: "Musique", questions: [
		{ type: "vrai_faux", question: "L'œuvre 'Symphonie fantastique' de Berlioz a été créée en 1830.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Qui a composé 'La Flûte enchantée'?", answers: ["Mozart", "Beethoven", "Verdi", "Berlioz"], correct: "Mozart" }
	]},
	{ name: "Cinéma", questions: [
		{ type: "vrai_faux", question: "Le film 'La Liste de Schindler' a remporté 7 Oscars.", answers: ["Vrai", "Faux"], correct: "Vrai" },
		{ type: "2_4", question: "Qui a réalisé 'The Dark Knight'?", answers: ["Christopher Nolan", "Ridley Scott", "Stanley Kubrick", "James Cameron"], correct: "Christopher Nolan" }
	]}
];

let scores = { Matthew: 0, Clément: 0, Ethan: 0 };
let currentPlayerIndex = 0;
let usedCategories = new Set();
let selectedAnswer = null;
let questionCount = 0;
let selectedCategory = null;

const players = ["Matthew", "Clément", "Ethan"];
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

function selectCategory(button) {
    // Marquer la catégorie comme sélectionnée visuellement
    if (selectedCategory) {
        selectedCategory.classList.remove("selected-category");
    }

    selectedCategory = button;
    button.classList.add("selected-category");

    // Activer le bouton Valider
    validateButton.disabled = false;
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
    
    // Ajouter l'événement de sélection de catégorie
    button.addEventListener("click", () => {
        selectCategory(button);  // Sélection visuelle temporaire
        startQuestion(category, button);  // Lancer la question
    });
    
    categoriesContainer.appendChild(button);
});

// Lancer une question
function startQuestion() {
    if (!selectedCategory) {
        alert("Veuillez sélectionner une catégorie d'abord !");
        return;
    }

    // Récupérer la catégorie sélectionnée
    const category = categories.find(cat => cat.name === selectedCategory.textContent);
    
    if (usedCategories.has(category.name)) return;
    usedCategories.add(category.name);

    // Cacher les catégories et afficher les questions
    hideCategoriesAndShowQuestions();

    // Désactiver le bouton de catégorie
    selectedCategory.disabled = true;
    selectedCategory.classList.add("disabled");

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
			startQuestion();  
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
