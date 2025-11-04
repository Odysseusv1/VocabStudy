document.addEventListener('DOMContentLoaded', () => {
    // Full vocabulary data
    const vocabWords = [
        { word: "Atone", definition: "to make up for" },
        { word: "Credible", definition: "believable" },
        { word: "Doleful", definition: "sad; dreary" },
        { word: "Hamper", definition: "to hold back" },
        { word: "Impoverished", definition: "poor, in a state of poverty; depleted" },
        { word: "Lucid", definition: "easy to understand, clear; rational, sane" },
        { word: "Posthumous", definition: "occurring or published after death" },
        { word: "Sardonic", definition: "grimly or scornfully mocking, bitterly sarcastic" },
        { word: "Supplant", definition: "to take the place of, supersede" },
        { word: "Tenacious", definition: "holding fast; holding together firmly; persistent" },
        { word: "Bondage", definition: "slavery; any state of being bound or held down" },
        { word: "Defray", definition: "to pay for" },
        { word: "Diligent", definition: "hardworking, industrious, not lazy" },
        { word: "Ghastly", definition: "frightful, horrible; deathly pale" },
        { word: "Hew", definition: "to shape or cut down with an ax; to hold to" },
        { word: "Incessant", definition: "never stopping, going on all the time" },
        { word: "Intricate", definition: "complicated; difficult to understand" },
        { word: "Prim", definition: "overly neat, proper, or formal; prudish" },
        { word: "Superfluous", definition: "exceeding what is sufficient or required, excess" },
        { word: "Taunt", definition: "to jeer at, mock; (n.) an insulting or mocking remark" }
    ];

    const startGameButton = document.getElementById('start-game');
    const gameContent = document.getElementById('game-content');
    const scoreContainer = document.getElementById('score-container');
    let score = 0;
    let total = vocabWords.length;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startPuzzleGame() {
        score = 0;
        scoreContainer.textContent = `Score: 0 / ${total}`;
        gameContent.innerHTML = '';

        // Shuffle definitions for game
        const words = vocabWords.map(item => item.word);
        const definitions = vocabWords.map(item => item.definition);
        shuffle(definitions);

        // Render puzzle game: for each word, select matching definition
        words.forEach((word, idx) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'puzzle-row';

            const wordSpan = document.createElement('span');
            wordSpan.className = 'puzzle-word';
            wordSpan.textContent = word;

            const select = document.createElement('select');
            select.className = 'definition-select';
            select.dataset.index = idx; // assign the word index

            // Default "Choose" option to start
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "Choose definition...";
            select.appendChild(defaultOption);

            definitions.forEach(def => {
                const option = document.createElement('option');
                option.value = def;
                option.textContent = def;
                select.appendChild(option);
            });

            select.addEventListener('change', function() {
                // Prevent further changes if correct
                if (select.disabled) return;
                const idx = parseInt(select.dataset.index);
                if (select.value === vocabWords[idx].definition) {
                    select.classList.add('correct');
                    select.disabled = true;
                    score++;
                    scoreContainer.textContent = `Score: ${score} / ${total}`;
                    if (score === total) {
                        setTimeout(() => {
                            alert("Congratulations! Starting new round.");
                            startPuzzleGame(); // Repeat game automatically
                        }, 900);
                    }
                } else {
                    select.classList.add('incorrect');
                    setTimeout(() => select.classList.remove('incorrect'), 600);
                }
            });

            wrapper.appendChild(wordSpan);
            wrapper.appendChild(select);
            gameContent.appendChild(wrapper);
        });
    }

    startGameButton.addEventListener('click', () => {
        startGameButton.disabled = true;
        startPuzzleGame();
    });
});
