let currentLanguage = 'en';
let currentRoom = null;
let tasks = [];
let timerInterval = null;
let currentTrack = 0;
let isPlaying = false;

const translations = {
    en: {
        nameLabel: "Enter your name:",
        ageLabel: "Enter your age:",
        heightLabel: "Enter your height (cm):",
        weightLabel: "Enter your weight (kg):",
        birthLabel: "Enter your birth date:",
        sportLabel: "Enter your favorite sport:",
        submitBtn: "🔮 Reveal My Life Secrets",
        resetBtn: "🔄 Start Over",
        resultsTitle: "Your Life Analysis",
        basicInfoTitle: "📋 Basic Information",
        healthTitle: "💪 Health Analysis",
        astroTitle: "⭐ Astrological Info",
        personalityTitle: "🔮 Personality Analysis"
    },
    fr: {
        nameLabel: "Entrez votre nom:",
        ageLabel: "Entrez votre âge:",
        heightLabel: "Entrez votre taille (cm):",
        weightLabel: "Entrez votre poids (kg):",
        birthLabel: "Entrez votre date de naissance:",
        sportLabel: "Entrez votre sport favori:",
        submitBtn: "🔮 Révélez mes secrets de vie",
        resetBtn: "🔄 Recommencer",
        resultsTitle: "Votre analyse de vie",
        basicInfoTitle: "📋 Informations de base",
        healthTitle: "💪 Analyse de santé",
        astroTitle: "⭐ Infos astrologiques",
        personalityTitle: "🔮 Analyse de personnalité"
    },
    es: {
        nameLabel: "Ingresa tu nombre:",
        ageLabel: "Ingresa tu edad:",
        heightLabel: "Ingresa tu altura (cm):",
        weightLabel: "Ingresa tu peso (kg):",
        birthLabel: "Ingresa tu fecha de nacimiento:",
        sportLabel: "Ingresa tu deporte favorito:",
        submitBtn: "🔮 Revela mis secretos de vida",
        resetBtn: "🔄 Empezar de nuevo",
        resultsTitle: "Tu análisis de vida",
        basicInfoTitle: "📋 Información básica",
        healthTitle: "💪 Análisis de salud",
        astroTitle: "⭐ Info astrológica",
        personalityTitle: "🔮 Análisis de personalidad"
    },
    de: {
        nameLabel: "Geben Sie Ihren Namen ein:",
        ageLabel: "Geben Sie Ihr Alter ein:",
        heightLabel: "Geben Sie Ihre Größe ein (cm):",
        weightLabel: "Geben Sie Ihr Gewicht ein (kg):",
        birthLabel: "Geben Sie Ihr Geburtsdatum ein:",
        sportLabel: "Geben Sie Ihren Lieblingssport ein:",
        submitBtn: "🔮 Enthüllen Sie meine Lebensgeheimnisse",
        resetBtn: "🔄 Neu starten",
        resultsTitle: "Ihre Lebensanalyse",
        basicInfoTitle: "📋 Grundinformationen",
        healthTitle: "💪 Gesundheitsanalyse",
        astroTitle: "⭐ Astrologische Infos",
        personalityTitle: "🔮 Persönlichkeitsanalyse"
    }
};

// House Navigation Functions
function enterRoom(roomName) {
    try {
        // Hide all rooms and house nav
        document.querySelectorAll('.room').forEach(room => room.style.display = 'none');
        const houseNav = document.querySelector('.house-nav');
        if (houseNav) {
            houseNav.style.display = 'none';
        }

        // Show selected room
        const targetRoom = document.getElementById(roomName + '-room');
        if (targetRoom) {
            targetRoom.style.display = 'block';
            currentRoom = roomName;

            // Initialize room-specific features
            if (roomName === 'music') {
                initMusicPlayer();
            } else if (roomName === 'tools') {
                initTools();
            } else if (roomName === 'education') {
                initializeEducation();
            } else if (roomName === 'ai-assistant') {
                initializeAI();
            }
        } else {
            console.error(`Room ${roomName} not found`);
        }
    } catch (error) {
        console.error('Error entering room:', error);
    }
}

function exitRoom() {
    try {
        // Hide current room
        if (currentRoom) {
            const currentRoomElement = document.getElementById(currentRoom + '-room');
            if (currentRoomElement) {
                currentRoomElement.style.display = 'none';
            }
        }

        // Show house navigation
        const houseNav = document.querySelector('.house-nav');
        if (houseNav) {
            houseNav.style.display = 'block';
        }

        currentRoom = null;

        // Clean up timers
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    } catch (error) {
        console.error('Error exiting room:', error);
    }
}

// Analytics Room Functions
function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    const t = translations[lang];
    Object.keys(t).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'BUTTON' || element.tagName === 'LABEL') {
                element.textContent = t[key];
            } else {
                element.innerHTML = t[key];
            }
        }
    });
}

function getZodiacSign(day, month) {
    const signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
                   "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
    const dates = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];

    if (day <= dates[month - 1]) {
        return signs[month - 1];
    } else {
        return signs[month % 12];
    }
}

function calculateBMI(height, weight) {
    const heightInM = height / 100;
    return (weight / (heightInM * heightInM)).toFixed(1);
}

function resetAnalytics() {
    document.getElementById('userForm').reset();
    document.getElementById('results').style.display = 'none';
}

// Essay Writer Functions
function generateEssayOutline() {
    const topic = document.getElementById('essayTopic').value;
    const type = document.getElementById('essayType').value;
    const wordCount = document.getElementById('wordCount').value;

    if (!topic) {
        alert('Please enter an essay topic first!');
        return;
    }

    const outlines = {
        argumentative: [
            '1. Introduction with thesis statement',
            '2. First supporting argument with evidence',
            '3. Second supporting argument with evidence',
            '4. Counter-argument and refutation',
            '5. Conclusion reinforcing thesis'
        ],
        descriptive: [
            '1. Introduction setting the scene',
            '2. Physical description using sensory details',
            '3. Emotional and atmospheric elements',
            '4. Significance and personal connection',
            '5. Conclusion with lasting impression'
        ],
        narrative: [
            '1. Setting and character introduction',
            '2. Rising action and conflict development',
            '3. Climax and turning point',
            '4. Resolution and character growth',
            '5. Reflection and lesson learned'
        ],
        expository: [
            '1. Introduction with clear topic statement',
            '2. First main point with supporting details',
            '3. Second main point with examples',
            '4. Third main point with analysis',
            '5. Conclusion summarizing key points'
        ]
    };

    const outline = outlines[type];
    const outlineHTML = `
        <h4>📝 ${type.charAt(0).toUpperCase() + type.slice(1)} Essay: "${topic}"</h4>
        <p><strong>Target Length:</strong> ${wordCount} words</p>
        <ul>
            ${outline.map(point => `<li>${point}</li>`).join('')}
        </ul>
        <p><strong>💡 Tip:</strong> Aim for ${Math.round(wordCount/5)} words per section.</p>
        <button onclick="generateFullEssay()" class="generate-essay-btn">✨ Generate Complete Essay</button>
    `;

    document.getElementById('essayOutline').innerHTML = outlineHTML;
}

function generateFullEssay() {
    const topic = document.getElementById('essayTopic').value;
    const type = document.getElementById('essayType').value;
    const wordCount = parseInt(document.getElementById('wordCount').value);

    if (!topic) {
        alert('Please enter an essay topic first!');
        return;
    }

    const essayTemplates = {
        argumentative: {
            intro: `The topic of ${topic} has been a subject of considerable debate in recent years. This essay will argue that ${topic} presents both significant opportunities and challenges that require careful consideration. Through examining various perspectives and evidence, this analysis will demonstrate the importance of understanding the multifaceted nature of ${topic} and its implications for society.`,
            body1: `First and foremost, ${topic} offers numerous advantages that cannot be overlooked. Research has consistently shown that when properly implemented, ${topic} can lead to substantial improvements in various aspects of life. For instance, studies indicate that ${topic} has the potential to enhance productivity, efficiency, and overall quality of life. The evidence supporting this position is overwhelming, with multiple case studies demonstrating positive outcomes across different contexts and populations.`,
            body2: `Furthermore, the long-term benefits of ${topic} extend beyond immediate gains. Historical analysis reveals that similar developments have consistently contributed to societal progress and innovation. The economic implications alone suggest that ${topic} could generate significant value, creating new opportunities for growth and development. Additionally, the social benefits include improved accessibility, enhanced communication, and greater inclusivity across diverse communities.`,
            counter: `However, critics of ${topic} raise valid concerns that must be addressed. Some argue that ${topic} may lead to unintended consequences, including potential negative impacts on traditional practices and established systems. These concerns are not unfounded, as rapid changes often create disruption and uncertainty. Nevertheless, these challenges can be mitigated through careful planning, gradual implementation, and continuous monitoring to ensure positive outcomes while minimizing potential risks.`,
            conclusion: `In conclusion, while ${topic} presents certain challenges, the overwhelming evidence supports its potential for positive impact. The benefits far outweigh the drawbacks when proper measures are implemented. Moving forward, it is essential to embrace ${topic} while remaining vigilant about potential issues. Through thoughtful consideration and strategic implementation, ${topic} can contribute significantly to progress and improvement in our society.`
        },
        descriptive: {
            intro: `${topic} stands as a remarkable subject worthy of detailed exploration and contemplation. This vivid examination will paint a comprehensive picture of ${topic}, capturing its essence through careful observation and sensory description. By delving into the intricate details and nuanced characteristics, we can gain a deeper appreciation for the complexity and beauty inherent in ${topic}.`,
            body1: `The physical characteristics of ${topic} immediately capture attention through their distinctive and compelling nature. The visual elements present a striking tableau that engages the observer's senses and imagination. Colors, textures, and forms combine to create a harmonious yet dynamic composition that speaks to both the aesthetic and functional aspects of ${topic}. Every detail contributes to the overall impression, from the subtle variations in tone to the bold contrasts that define its character.`,
            body2: `Beyond the visual impact, ${topic} engages multiple senses, creating a rich and immersive experience. The auditory elements add another dimension, whether through the gentle sounds that accompany its presence or the profound silence that surrounds it. The tactile qualities invite closer examination, revealing textures that range from smooth and polished to rough and weathered. These sensory experiences combine to create lasting memories and emotional connections.`,
            body3: `The atmospheric and emotional resonance of ${topic} extends far beyond its physical properties. There is an intangible quality that evokes feelings of wonder, nostalgia, or inspiration. The way light plays across its surface, the shadows it creates, and the way it interacts with its environment all contribute to its emotional impact. This psychological dimension transforms ${topic} from a mere subject of observation into a source of meaning and reflection.`,
            conclusion: `In reflecting upon ${topic}, we discover that its true significance lies not merely in its observable characteristics but in its ability to connect with human experience on multiple levels. The detailed examination reveals layers of complexity that reward careful attention and contemplation. ${topic} serves as a reminder of the richness and diversity that surrounds us, encouraging us to look more closely and appreciate the extraordinary within the ordinary.`
        },
        narrative: {
            intro: `The story of ${topic} begins in an unexpected place, where ordinary circumstances would soon give way to extraordinary events. This narrative explores the journey and transformation that unfolds when ${topic} becomes the central focus of attention. Through the experiences of those involved, we witness how ${topic} can change perspectives, challenge assumptions, and ultimately lead to profound personal growth and understanding.`,
            body1: `The initial encounter with ${topic} was marked by curiosity and uncertainty. Like many significant experiences, it began with a simple moment that would prove to be more important than initially realized. The protagonist approached ${topic} with a mixture of enthusiasm and apprehension, unaware of the journey that lay ahead. The setting was familiar yet charged with potential, creating an atmosphere of anticipation and possibility.`,
            body2: `As the story progressed, challenges began to emerge that tested resolve and determination. The path forward was not always clear, and obstacles appeared that required creative solutions and unwavering commitment. Each difficulty encountered served as a learning opportunity, building character and resilience. The protagonist discovered inner strengths that had previously remained hidden, while also recognizing the importance of seeking help and support from others.`,
            body3: `The climactic moment arrived when all the preparation, struggle, and growth culminated in a decisive turning point. This pivotal experience with ${topic} demanded everything that had been learned and developed throughout the journey. The outcome was not predetermined, but rather depended on the choices made and the courage to persevere despite uncertainty. The resolution brought clarity and understanding that had been absent at the beginning.`,
            conclusion: `Looking back on the experience with ${topic}, it becomes clear that the journey was as important as the destination. The lessons learned, relationships formed, and personal growth achieved represent the true value of the experience. This narrative serves as a reminder that ${topic} has the power to transform not only circumstances but also the individuals who engage with it fully and authentically.`
        },
        expository: {
            intro: `Understanding ${topic} requires a comprehensive examination of its various components, implications, and significance in contemporary society. This expository analysis will systematically explore the key aspects of ${topic}, providing clear explanations and evidence-based insights. By breaking down complex concepts into manageable components, we can develop a thorough understanding of ${topic} and its relevance to our daily lives and future prospects.`,
            body1: `The fundamental principles underlying ${topic} form the foundation for deeper comprehension. These core concepts have evolved over time, shaped by research, experience, and technological advancement. The basic mechanisms involved in ${topic} operate according to well-established principles that govern their function and effectiveness. Understanding these foundational elements is essential for anyone seeking to grasp the broader implications and applications of ${topic}.`,
            body2: `The practical applications of ${topic} demonstrate its relevance and importance in real-world contexts. Numerous examples illustrate how ${topic} has been successfully implemented across different sectors and industries. Case studies reveal both the potential benefits and the challenges associated with ${topic}, providing valuable lessons for future implementation. The versatility and adaptability of ${topic} make it suitable for a wide range of applications and environments.`,
            body3: `Current research and future developments in ${topic} point to exciting possibilities and continued evolution. Scientists and practitioners continue to explore new frontiers, pushing the boundaries of what is possible with ${topic}. Emerging trends suggest that ${topic} will play an increasingly important role in shaping future developments. The ongoing investment in research and development indicates strong confidence in the potential of ${topic} to address contemporary challenges and opportunities.`,
            conclusion: `In summary, ${topic} represents a significant area of study and application that merits serious consideration and continued exploration. The evidence presented demonstrates both the current value and future potential of ${topic}. As we move forward, it will be important to maintain a balanced perspective, recognizing both the opportunities and challenges associated with ${topic}. Through continued research, development, and thoughtful implementation, ${topic} can contribute meaningfully to progress and improvement in multiple domains.`
        }
    };

    const template = essayTemplates[type];
    const wordsPerSection = Math.floor(wordCount / Object.keys(template).length);

    let fullEssay = '';

    // Generate title
    fullEssay += `${type.charAt(0).toUpperCase() + type.slice(1)} Essay: ${topic}\n\n`;

    // Add sections based on essay type
    if (type === 'argumentative') {
        fullEssay += `Introduction\n\n${template.intro}\n\n`;
        fullEssay += `Supporting Argument 1\n\n${template.body1}\n\n`;
        fullEssay += `Supporting Argument 2\n\n${template.body2}\n\n`;
        fullEssay += `Counter-argument and Refutation\n\n${template.counter}\n\n`;
        fullEssay += `Conclusion\n\n${template.conclusion}`;
    } else if (type === 'descriptive') {
        fullEssay += `Introduction\n\n${template.intro}\n\n`;
        fullEssay += `Physical Description\n\n${template.body1}\n\n`;
        fullEssay += `Sensory Details\n\n${template.body2}\n\n`;
        fullEssay += `Emotional Connection\n\n${template.body3}\n\n`;
        fullEssay += `Conclusion\n\n${template.conclusion}`;
    } else if (type === 'narrative') {
        fullEssay += `Introduction\n\n${template.intro}\n\n`;
        fullEssay += `Setting and Beginning\n\n${template.body1}\n\n`;
        fullEssay += `Rising Action\n\n${template.body2}\n\n`;
        fullEssay += `Climax and Resolution\n\n${template.body3}\n\n`;
        fullEssay += `Conclusion\n\n${template.conclusion}`;
    } else if (type === 'expository') {
        fullEssay += `Introduction\n\n${template.intro}\n\n`;
        fullEssay += `Fundamental Principles\n\n${template.body1}\n\n`;
        fullEssay += `Practical Applications\n\n${template.body2}\n\n`;
        fullEssay += `Future Developments\n\n${template.body3}\n\n`;
        fullEssay += `Conclusion\n\n${template.conclusion}`;
    }

    // Insert the generated essay into the text area
    document.getElementById('essayContent').value = fullEssay;
    updateWritingStats();

    // Show success message
    alert('✨ Your essay has been generated! You can now edit and customize it further.');
}

function updateWritingStats() {
    const content = document.getElementById('essayContent').value;
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    const characters = content.length;
    const readingTime = Math.ceil(words / 200); // Average reading speed

    document.getElementById('currentWordCount').textContent = `Words: ${words}`;
    document.getElementById('charactersCount').textContent = `Characters: ${characters}`;
    document.getElementById('readingTime').textContent = `Reading time: ${readingTime} min`;
}

function saveEssay() {
    const content = document.getElementById('essayContent').value;
    const topic = document.getElementById('essayTopic').value || 'My Essay';

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportEssay() {
    alert('PDF export feature would require additional libraries. Essay saved as text file instead.');
    saveEssay();
}

function clearEssay() {
    if (confirm('Are you sure you want to clear your essay?')) {
        document.getElementById('essayContent').value = '';
        updateWritingStats();
    }
}

// Calculator Functions
let calcDisplay = '';

function addToCalc(value) {
    calcDisplay += value;
    document.getElementById('calcDisplay').value = calcDisplay;
}

function clearCalc() {
    calcDisplay = '';
    document.getElementById('calcDisplay').value = '';
}

function deleteLast() {
    calcDisplay = calcDisplay.slice(0, -1);
    document.getElementById('calcDisplay').value = calcDisplay;
}

function calculateResult() {
    try {
        const result = eval(calcDisplay.replace(/×/g, '*').replace(/÷/g, '/'));
        document.getElementById('calcDisplay').value = result;
        calcDisplay = result.toString();
    } catch (error) {
        document.getElementById('calcDisplay').value = 'Error';
        calcDisplay = '';
    }
}

function advancedCalc(operation) {
    const currentValue = parseFloat(calcDisplay) || 0;
    let result;

    switch(operation) {
        case 'sqrt':
            result = Math.sqrt(currentValue);
            break;
        case 'square':
            result = currentValue * currentValue;
            break;
        case 'sin':
            result = Math.sin(currentValue * Math.PI / 180);
            break;
        case 'cos':
            result = Math.cos(currentValue * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(currentValue * Math.PI / 180);
            break;
        case 'log':
            result = Math.log10(currentValue);
            break;
        default:
            result = currentValue;
    }

    calcDisplay = result.toString();
    document.getElementById('calcDisplay').value = calcDisplay;
}

// Todo Functions
function addTask() {
    const taskText = document.getElementById('newTask').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (!taskText) return;

    const task = {
        id: Date.now(),
        text: taskText,
        priority: priority,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(task);
    document.getElementById('newTask').value = '';
    renderTasks();
    updateTaskStats();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateTaskStats();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    updateTaskStats();
}

function filterTasks(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    renderTasks(filter);
}

function renderTasks(filter = 'all') {
    const taskList = document.getElementById('taskList');
    let filteredTasks = tasks;

    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    taskList.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <div>
                <span>${task.text}</span>
                <span class="task-priority priority-${task.priority}">${task.priority}</span>
            </div>
            <div class="task-actions">
                <button onclick="toggleTask(${task.id})" class="complete-btn">
                    ${task.completed ? '↩️' : '✅'}
                </button>
                <button onclick="deleteTask(${task.id})" class="delete-btn">🗑️</button>
            </div>
        </div>
    `).join('');
}

function updateTaskStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = `Total: ${total}`;
    document.getElementById('completedTasks').textContent = `Completed: ${completed}`;
    document.getElementById('pendingTasks').textContent = `Pending: ${pending}`;
}

// Music Player Functions
const tracks = [
    { name: '🎵 Focus Flow', duration: '3:45' },
    { name: '🌊 Ocean Waves', duration: '5:20' },
    { name: '🌧️ Rain Sounds', duration: '4:15' },
    { name: '🔥 Crackling Fire', duration: '6:30' }
];

function initMusicPlayer() {
    // Initialize music player (simulated)
    updateNowPlaying();
}

function togglePlay() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('playPauseBtn');
    btn.textContent = isPlaying ? '⏸️' : '▶️';
}

function previousTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    updateNowPlaying();
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    updateNowPlaying();
}

function selectTrack(index) {
    currentTrack = index;
    updateNowPlaying();
    document.querySelectorAll('.track-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function updateNowPlaying() {
    const track = tracks[currentTrack];
    document.querySelector('.now-playing h3').textContent = track.name;
    document.querySelector('.now-playing p').textContent = `Duration: ${track.duration}`;
}

// Weather Functions
function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    // Simulated weather data
    const weatherData = {
        city: city,
        temp: Math.round(Math.random() * 30 + 10),
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        wind: Math.round(Math.random() * 20 + 5),
        humidity: Math.round(Math.random() * 40 + 40),
        visibility: Math.round(Math.random() * 10 + 5)
    };

    displayWeather(weatherData);
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                // Simulated location-based weather
                const weatherData = {
                    city: 'Your Location',
                    temp: Math.round(Math.random() * 30 + 10),
                    condition: 'Clear',
                    wind: 12,
                    humidity: 58,
                    visibility: 8
                };
                displayWeather(weatherData);
            },
            error => {
                alert('Unable to get your location. Please enter a city manually.');
            }
        );
    }
}

function displayWeather(data) {
    const weatherHTML = `
        <div class="weather-info">
            <h3>🌍 ${data.city}</h3>
            <div class="current-weather">
                <span class="temp">${data.temp}°C</span>
                <span class="condition">${data.condition}</span>
            </div>
            <div class="weather-details">
                <div class="detail">💨 Wind: ${data.wind} km/h</div>
                <div class="detail">💧 Humidity: ${data.humidity}%</div>
                <div class="detail">👁️ Visibility: ${data.visibility} km</div>
                <div class="detail">🌡️ Feels like: ${data.temp + 3}°C</div>
            </div>
        </div>
    `;

    document.getElementById('weatherDisplay').innerHTML = weatherHTML;
}

// Games Functions
function startGame(gameType) {
    const gameArea = document.getElementById('gameArea');

    switch(gameType) {
        case 'number-guess':
            startNumberGuessingGame(gameArea);
            break;
        case 'memory':
            startMemoryGame(gameArea);
            break;
        case 'quiz':
            startQuizGame(gameArea);
            break;
    }
}

function startNumberGuessingGame(gameArea) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    gameArea.innerHTML = `
        <div class="number-game">
            <h3>🔢 Number Guessing Game</h3>
            <p>I'm thinking of a number between 1 and 100!</p>
            <input type="number" id="guessInput" min="1" max="100" placeholder="Your guess">
            <button onclick="makeGuess(${randomNumber})" class="game-btn">Make Guess</button>
            <div id="guessResult"></div>
            <div id="guessAttempts">Attempts: 0</div>
        </div>
    `;
}

function makeGuess(targetNumber) {
    const guess = parseInt(document.getElementById('guessInput').value);
    const resultDiv = document.getElementById('guessResult');
    const attemptsDiv = document.getElementById('guessAttempts');

    if (!guess) return;

    let attempts = parseInt(attemptsDiv.textContent.split(': ')[1]) + 1;
    attemptsDiv.textContent = `Attempts: ${attempts}`;

    if (guess === targetNumber) {
        resultDiv.innerHTML = `<div style="color: green;">🎉 Correct! You found it in ${attempts} attempts!</div>`;
    } else if (guess < targetNumber) {
        resultDiv.innerHTML = `<div style="color: orange;">📈 Too low! Try higher.</div>`;
    } else {
        resultDiv.innerHTML = `<div style="color: orange;">📉 Too high! Try lower.</div>`;
    }

    document.getElementById('guessInput').value = '';
}

function startMemoryGame(gameArea) {
    gameArea.innerHTML = `
        <div class="memory-game">
            <h3>🧠 Memory Game</h3>
            <p>Remember the sequence and repeat it!</p>
            <div class="memory-sequence" id="memorySequence"></div>
            <button onclick="generateSequence()" class="game-btn">Start New Sequence</button>
            <div id="memoryStatus"></div>
        </div>
    `;
}

function generateSequence() {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const sequence = [];
    const length = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < length; i++) {
        sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    const sequenceDiv = document.getElementById('memorySequence');
    sequenceDiv.innerHTML = sequence.map(color => 
        `<div style="background: ${color}; width: 50px; height: 50px; margin: 5px; display: inline-block; border-radius: 10px;"></div>`
    ).join('');

    document.getElementById('memoryStatus').innerHTML = `Remember this sequence of ${length} colors!`;
}

function startQuizGame(gameArea) {
    const questions = [
        { q: "What is the capital of France?", a: "Paris" },
        { q: "What is 15 × 7?", a: "105" },
        { q: "What year did World War II end?", a: "1945" },
        { q: "What is the largest planet in our solar system?", a: "Jupiter" }
    ];

    const randomQ = questions[Math.floor(Math.random() * questions.length)];

    gameArea.innerHTML = `
        <div class="quiz-game">
            <h3>🧩 Quick Quiz</h3>
            <p><strong>Question:</strong> ${randomQ.q}</p>
            <input type="text" id="quizAnswer" placeholder="Your answer">
            <button onclick="checkQuizAnswer('${randomQ.a}')" class="game-btn">Submit Answer</button>
            <div id="quizResult"></div>
        </div>
    `;
}

function checkQuizAnswer(correctAnswer) {
    const userAnswer = document.getElementById('quizAnswer').value.trim();
    const resultDiv = document.getElementById('quizResult');

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        resultDiv.innerHTML = `<div style="color: green;">🎉 Correct! Well done!</div>`;
    } else {
        resultDiv.innerHTML = `<div style="color: red;">❌ Incorrect. The answer was: ${correctAnswer}</div>`;
    }
}

// Tools Functions
function initTools() {
    updateColor();
}

function updateColor() {
    const color = document.getElementById('colorPicker').value;
    const hex = color.toUpperCase();
    const rgb = hexToRgb(hex);

    document.getElementById('colorInfo').innerHTML = `
        <div style="background: ${color}; width: 50px; height: 50px; border-radius: 10px; margin: 10px auto;"></div>
        <div><strong>HEX:</strong> ${hex}</div>
        <div><strong>RGB:</strong> ${rgb}</div>
    `;
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function convertUnit() {
    const type = document.getElementById('conversionType').value;
    const input = parseFloat(document.getElementById('convertInput').value);

    if (!input) return;

    let result = '';

    switch(type) {
        case 'length':
            result = `
                <div><strong>${input} cm</strong> = ${(input * 0.01).toFixed(2)} m</div>
                <div><strong>${input} cm</strong> = ${(input * 0.393701).toFixed(2)} inches</div>
                <div><strong>${input} cm</strong> = ${(input * 0.0328084).toFixed(2)} feet</div>
            `;
            break;
        case 'weight':
            result = `
                <div><strong>${input} kg</strong> = ${(input * 1000).toFixed(0)} g</div>
                <div><strong>${input} kg</strong> = ${(input * 2.20462).toFixed(2)} lbs</div>
                <div><strong>${input} kg</strong> = ${(input * 35.274).toFixed(2)} oz</div>
            `;
            break;
        case 'temperature':
            result = `
                <div><strong>${input}°C</strong> = ${(input * 9/5 + 32).toFixed(1)}°F</div>
                <div><strong>${input}°C</strong> = ${(input + 273.15).toFixed(1)}K</div>
            `;
            break;
    }

    document.getElementById('conversionResult').innerHTML = result;
}

function startTimer() {
    const minutes = parseInt(document.getElementById('timerMinutes').value);
    if (!minutes || minutes < 1) return;

    let totalSeconds = minutes * 60;
    const display = document.getElementById('timerDisplay');

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert('⏰ Timer finished!');
            display.textContent = '00:00';
        }

        totalSeconds--;
    }, 1000);
}

function generateRandom(type) {
    const resultDiv = document.getElementById('randomResult');

    if (type === 'number') {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        resultDiv.innerHTML = `<div><strong>Random Number:</strong> ${randomNum}</div>`;
    } else if (type === 'quote') {
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Innovation distinguishes between a leader and a follower. - Steve Jobs",
            "Life is what happens to you while you're busy making other plans. - John Lennon",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "It is during our darkest moments that we must focus to see the light. - Aristotle"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        resultDiv.innerHTML = `<div style="font-style: italic;">"${randomQuote}"</div>`;
    }
}

// Education Hub Functions
function initializeEducation() {
    // Initialize education content
}

function showMathContent() {
    document.getElementById('mathContent').style.display = 'block';
    document.getElementById('physicsContent').style.display = 'none';
    document.getElementById('detailedContent').style.display = 'none';
}

function showPhysicsContent() {
    document.getElementById('mathContent').style.display = 'none';
    document.getElementById('physicsContent').style.display = 'block';
    document.getElementById('detailedContent').style.display = 'none';
}

function showDetailedMath(topic) {
    const content = document.getElementById('explanationContent');
    let explanation = '';

    switch(topic) {
        case 'calculus':
            explanation = `
                <h3>📐 Calculus & Analysis - Detailed Explanation</h3>
                <h4>Differential Calculus</h4>
                <p>Differential calculus deals with the rate at which quantities change. The derivative of a function gives us the slope of the tangent line at any point.</p>
                <p><strong>Power Rule:</strong> If f(x) = x^n, then f'(x) = nx^(n-1)</p>
                <p><strong>Product Rule:</strong> (uv)' = u'v + uv'</p>
                <p><strong>Chain Rule:</strong> (f(g(x)))' = f'(g(x)) × g'(x)</p>

                <h4>Integral Calculus</h4>
                <p>Integration is the reverse process of differentiation. It's used to find areas, volumes, and accumulated quantities.</p>
                <p><strong>Basic Integration:</strong> ∫x^n dx = x^(n+1)/(n+1) + C</p>
                <p><strong>Integration by Parts:</strong> ∫u dv = uv - ∫v du</p>

                <h4>Applications</h4>
                <ul>
                    <li>Physics: velocity, acceleration, displacement</li>
                    <li>Economics: marginal cost, profit optimization</li>
                    <li>Engineering: stress analysis, fluid dynamics</li>
                </ul>
            `;
            break;
        case 'statistics':
            explanation = `
                <h3>📊 Statistics & Probability - Detailed Explanation</h3>
                <h4>Descriptive Statistics</h4>
                <p><strong>Mean:</strong> μ = Σx/n</p>
                <p><strong>Variance:</strong> σ² = Σ(x-μ)²/n</p>
                <p><strong>Standard Deviation:</strong> σ = √(σ²)</p>

                <h4>Probability Distributions</h4>
                <p><strong>Binomial:</strong> P(X = k) = C(n,k) × p^k × (1-p)^(n-k)</p>
                <p><strong>Normal Distribution:</strong> Used for continuous variables, follows bell curve</p>

                <h4>Hypothesis Testing</h4>
                <p><strong>Null Hypothesis (H₀):</strong> No effect or difference</p>
                <p><strong>Alternative Hypothesis (H₁):</strong> There is an effect</p>
                <p><strong>p-value:</strong> Probability of observing results if H₀ is true</p>
                <p><strong>Decision:</strong> If p < α (usually 0.05), reject H₀</p>
            `;
            break;
        case 'complex':
            explanation = `
                <h3>🌐 Complex Numbers - Detailed Explanation</h3>
                <h4>Basic Operations</h4>
                <p><strong>Addition:</strong> (a + bi) + (c + di) = (a + c) + (b + d)i</p>
                <p><strong>Multiplication:</strong> (a + bi)(c + di) = (ac - bd) + (ad + bc)i</p>
                <p><strong>Division:</strong> Multiply by conjugate to rationalize</p>

                <h4>Polar Form</h4>
                <p><strong>Modulus:</strong> |z| = √(a² + b²)</p>
                <p><strong>Argument:</strong> θ = arctan(b/a)</p>
                <p><strong>Euler's Formula:</strong> e^(iθ) = cos θ + i sin θ</p>

                <h4>Applications</h4>
                <ul>
                    <li>AC Circuit Analysis: impedance calculations</li>
                    <li>Signal Processing: Fourier transforms</li>
                    <li>Quantum Mechanics: wave functions</li>
                    <li>Computer Graphics: rotations and transformations</li>
                </ul>
            `;
            break;
    }

    content.innerHTML = explanation;
    document.getElementById('detailedContent').style.display = 'block';
}

function showDetailedPhysics(topic) {
    const content = document.getElementById('explanationContent');
    let explanation = '';

    switch(topic) {
        case 'quantum':
            explanation = `
                <h3>⚛️ Quantum Mechanics - Detailed Explanation</h3>
                <h4>Wave Function</h4>
                <p>The wave function ψ(x,t) contains all information about a quantum system.</p>
                <p><strong>Born's Rule:</strong> |ψ(x,t)|² gives probability density</p>
                <p><strong>Normalization:</strong> ∫|ψ|²dx = 1</p>

                <h4>Key Principles</h4>
                <p><strong>Superposition:</strong> ψ = c₁ψ₁ + c₂ψ₂</p>
                <p><strong>Quantization:</strong> Energy levels are discrete</p>
                <p><strong>Uncertainty:</strong> Cannot know both position and momentum exactly</p>

                <h4>Applications</h4>
                <ul>
                    <li>Lasers: stimulated emission</li>
                    <li>MRI machines: nuclear magnetic resonance</li>
                    <li>Computer chips: quantum tunneling</li>
                    <li>Solar cells: photoelectric effect</li>
                </ul>
            `;
            break;
        case 'waves':
            explanation = `
                <h3>🌊 Waves & Optics - Detailed Explanation</h3>
                <h4>Wave Properties</h4>
                <p><strong>Frequency (f):</strong> oscillations per second (Hz)</p>
                <p><strong>Wavelength (λ):</strong> distance between peaks (m)</p>
                <p><strong>Amplitude (A):</strong> maximum displacement</p>
                <p><strong>Wave Speed:</strong> v = fλ</p>

                <h4>Electromagnetic Spectrum</h4>
                <ul>
                    <li>Radio waves: λ > 1m</li>
                    <li>Microwaves: 1mm - 1m</li>
                    <li>Infrared: 700nm - 1mm</li>
                    <li>Visible light: 400-700nm</li>
                    <li>X-rays: 0.01-10nm</li>
                    <li>Gamma rays: λ < 0.01nm</li>
                </ul>

                <h4>Optical Phenomena</h4>
                <p><strong>Refraction:</strong> n₁sin θ₁ = n₂sin θ₂</p>
                <p><strong>Total Internal Reflection:</strong> sin θc = n₂/n₁</p>
                <p><strong>Thin Film Interference:</strong> Used in anti-reflective coatings</p>
            `;
            break;
        case 'modern':
            explanation = `
                <h3>🔬 Modern Physics - Detailed Explanation</h3>
                <h4>Special Relativity</h4>
                <p><strong>Lorentz Factor:</strong> γ = 1/√(1 - v²/c²)</p>
                <p><strong>Time Dilation:</strong> Δt' = γΔt</p>
                <p><strong>Length Contraction:</strong> L' = L/γ</p>
                <p><strong>Mass-Energy:</strong> E² = (pc)² + (mc²)²</p>

                <h4>Nuclear Physics</h4>
                <p><strong>Binding Energy:</strong> Energy to separate nucleus</p>
                <p><strong>Radioactive Decay:</strong> N(t) = N₀e^(-λt)</p>
                <p><strong>Half-life:</strong> t₁/₂ = ln(2)/λ</p>

                <h4>Particle Physics</h4>
                <p><strong>Standard Model:</strong> Describes fundamental particles</p>
                <p><strong>Quarks:</strong> up, down, strange, charm, bottom, top</p>
                <p><strong>Leptons:</strong> electron, muon, tau, neutrinos</p>
                <p><strong>Force Carriers:</strong> photon, W/Z bosons, gluons, Higgs</p>
            `;
            break;
    }

    content.innerHTML = explanation;
    document.getElementById('detailedContent').style.display = 'block';
}

function hideDetailedContent() {
    document.getElementById('detailedContent').style.display = 'none';
}

// AI Assistant Functions
function initializeAI() {
    // Initialize AI assistant
}

function askQuestion(question) {
    document.getElementById('userQuestion').value = question;
    sendMessage();
}

function sendMessage() {
    const questionInput = document.getElementById('userQuestion');
    const question = questionInput.value.trim();

    if (!question) return;

    // Add user message
    addMessage(question, 'user');

    // Clear input
    questionInput.value = '';

    // Generate AI response
    setTimeout(() => {
        const response = generateAIResponse(question);
        addMessage(response, 'ai');
    }, 1000);
}

function addMessage(content, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';

    const avatar = type === 'user' ? '👤' : '🤖';

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${content}</p>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(question) {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('quadratic')) {
        return `To solve quadratic equations ax² + bx + c = 0, you can use:<br><br>
        <strong>Quadratic Formula:</strong> x = (-b ± √(b² - 4ac)) / 2a<br><br>
        <strong>Steps:</strong><br>
        1. Identify a, b, and c<br>
        2. Calculate the discriminant: b² - 4ac<br>
        3. If discriminant > 0: two real solutions<br>
        4. If discriminant = 0: one real solution<br>
        5. If discriminant < 0: no real solutions<br><br>
        <strong>Example:</strong> x² - 5x + 6 = 0<br>
        a=1, b=-5, c=6<br>
        x = (5 ± √(25-24)) / 2 = (5 ± 1) / 2<br>
        Solutions: x = 3 or x = 2`;
    }

    if (lowerQuestion.includes('photosynthesis')) {
        return `<strong>Photosynthesis</strong> is how plants convert light energy into chemical energy:<br><br>
        <strong>Overall Equation:</strong><br>
        6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂<br><br>
        <strong>Two Main Stages:</strong><br>
        1. <strong>Light Reactions:</strong> Occur in thylakoids<br>
           - Chlorophyll absorbs light<br>
           - Water splits to release O₂<br>
           - ATP and NADPH are produced<br><br>
        2. <strong>Calvin Cycle:</strong> Occurs in stroma<br>
           - CO₂ is fixed into organic molecules<br>
           - Uses ATP and NADPH from light reactions<br>
           - Produces glucose<br><br>
        <strong>Importance:</strong> Provides oxygen and food for most life on Earth!`;
    }

    if (lowerQuestion.includes('derivative')) {
        return `The <strong>derivative of x²</strong> is <strong>2x</strong>.<br><br>
        <strong>Using the Power Rule:</strong><br>
        If f(x) = x^n, then f'(x) = nx^(n-1)<br><br>
        For x²: n = 2<br>
        f'(x) = 2 × x^(2-1) = 2x¹ = 2x<br><br>
        <strong>Geometric Meaning:</strong><br>
        The derivative gives the slope of the tangent line at any point on the curve y = x².
        <br><br>
        <strong>Physical Meaning:</strong><br>
        If x² represents position, then 2x represents velocity (rate of change of position).`;
    }

    if (lowerQuestion.includes('gravity')) {
        return `<strong>Gravity</strong> is one of the four fundamental forces:<br><br>
        <strong>Newton's Law of Universal Gravitation:</strong><br>
        F = G(m₁m₂)/r²<br><br>
        Where:<br>
        - G = 6.67 × 10⁻¹¹ N⋅m²/kg²<br>
        - m₁, m₂ = masses of objects<br>
        - r = distance between centers<br><br>
        <strong>Einstein's General Relativity:</strong><br>
        Gravity is not a force, but a curvature of spacetime caused by mass and energy.<br><br>
        <strong>Effects:</strong><br>
        - Keeps planets in orbit<br>
        - Causes tides<br>
        - Bends light (gravitational lensing)<br>
        - Time dilation near massive objects`;
    }

    if (lowerQuestion.includes('essay')) {
        return `<strong>Essay Structure:</strong><br><br>
        <strong>1. Introduction (10-15%):</strong><br>
        - Hook to grab attention<br>
        - Background information<br>
        - Clear thesis statement<br><br>
        <strong>2. Body Paragraphs (70-80%):</strong><br>
        - Topic sentence<br>
        - Evidence/examples<br>
        - Analysis/explanation<br>
        - Transition to next paragraph<br><br>
        <strong>3. Conclusion (10-15%):</strong><br>
        - Restate thesis<br>
        - Summarize main points<br>
        - Call to action or final thought<br><br>
        <strong>Tips:</strong><br>
        - Use clear, concise language<br>
        - Vary sentence structure<br>
        - Cite sources properly<br>
        - Proofread carefully`;
    }

    // Default response for unrecognized questions
    return `That's an interesting question! While I can help with many academic topics, I might need more specific information to give you the best answer. Try asking about:<br><br>
    📚 Specific math problems or concepts<br>
    🔬 Science topics (physics, chemistry, biology)<br>
    📝 Writing and essay help<br>
    💡 Study strategies<br><br>
    Feel free to rephrase your question or ask about something more specific!`;
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Make functions globally accessible
window.enterRoom = enterRoom;
window.exitRoom = exitRoom;
window.setLanguage = setLanguage;
window.resetAnalytics = resetAnalytics;
window.generateEssayOutline = generateEssayOutline;
window.generateFullEssay = generateFullEssay;
window.updateWritingStats = updateWritingStats;
window.saveEssay = saveEssay;
window.exportEssay = exportEssay;
window.clearEssay = clearEssay;
window.addToCalc = addToCalc;
window.clearCalc = clearCalc;
window.deleteLast = deleteLast;
window.calculateResult = calculateResult;
window.advancedCalc = advancedCalc;
window.addTask = addTask;
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
window.filterTasks = filterTasks;
window.togglePlay = togglePlay;
window.previousTrack = previousTrack;
window.nextTrack = nextTrack;
window.selectTrack = selectTrack;
window.getWeather = getWeather;
window.getCurrentLocation = getCurrentLocation;
window.startGame = startGame;
window.makeGuess = makeGuess;
window.generateSequence = generateSequence;
window.checkQuizAnswer = checkQuizAnswer;
window.updateColor = updateColor;
window.convertUnit = convertUnit;
window.startTimer = startTimer;
window.generateRandom = generateRandom;
window.askQuestion = askQuestion;
window.sendMessage = sendMessage;

// Initialize Analytics Form
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const birthDate = new Date(data.birthDate);
    const bmi = calculateBMI(parseInt(data.height), parseInt(data.weight));
    const zodiac = getZodiacSign(birthDate.getDate(), birthDate.getMonth() + 1);

    document.getElementById('basicInfoContent').innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Age:</strong> ${data.age} years</p>
        <p><strong>Height:</strong> ${data.height} cm</p>
        <p><strong>Weight:</strong> ${data.weight} kg</p>
        <p><strong>Favorite Sport:</strong> ${data.sport}</p>
    `;

    document.getElementById('healthContent').innerHTML = `
        <p><strong>BMI:</strong> ${bmi} kg/m²</p>
        <p><strong>Health Status:</strong> ${bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'}</p>
    `;

    document.getElementById('astroContent').innerHTML = `
        <p><strong>Zodiac Sign:</strong> ${zodiac}</p>
        <p><strong>Birth Season:</strong> ${birthDate.getMonth() < 3 || birthDate.getMonth() === 11 ? 'Winter' : birthDate.getMonth() < 6 ? 'Spring' : birthDate.getMonth() < 9 ? 'Summer' : 'Autumn'}</p>
    `;

    document.getElementById('personalityContent').innerHTML = `
        <p><strong>Personality Trait:</strong> Creative Visionary</p>
        <p><strong>Lucky Number:</strong> ${(data.name.length + parseInt(data.age)) % 10}</p>
    `;

    document.getElementById('results').style.display = 'block';
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

// Initialize essay content listener
document.addEventListener('DOMContentLoaded', function() {
    const essayContent = document.getElementById('essayContent');
    if (essayContent) {
        essayContent.addEventListener('input', updateWritingStats);
    }

    // Initialize with English
    setLanguage('en');
});