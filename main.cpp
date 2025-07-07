#include <iostream>
#include <string>
#include <chrono>
#include <ctime>
#include <iomanip>
using namespace std;
using namespace std::chrono;

int main()
{
    string name;
    int age;
    int height;
    int weight;
    string sport;
    int language;
    int birthDay, birthMonth, birthYear;

    // Language selection
    cout << "Choose your language / Choisissez votre langue / Wählen Sie Ihre Sprache:" << endl;
    cout << "1. English" << endl;
    cout << "2. French (Français)" << endl;
    cout << "3. Spanish (Español)" << endl;
    cout << "4. German (Deutsch)" << endl;
    cout << "Enter your choice (1-4): ";
    cin >> language;

    // Clear the input buffer after language selection
    cin.ignore();

    // Collect all input first based on language
    if (language == 2) { // French
        cout << "\nEntrez votre nom: ";
        getline(cin, name);
        cout << "Entrez votre âge: ";
        cin >> age;
        cout << "Entrez votre taille: ";
        cin >> height;
        cout << "Entrez votre poids: ";
        cin >> weight;
        cout << "Entrez votre date de naissance (jour mois année): ";
        cin >> birthDay >> birthMonth >> birthYear;
        cin.ignore(); // Clear buffer before getline
        cout << "Entrez votre sport favori: ";
        getline(cin, sport);
    } else if (language == 3) { // Spanish
        cout << "\nIngrese su nombre: ";
        getline(cin, name);
        cout << "Ingrese su edad: ";
        cin >> age;
        cout << "Ingrese su altura: ";
        cin >> height;
        cout << "Ingrese su peso: ";
        cin >> weight;
        cout << "Ingrese su fecha de nacimiento (día mes año): ";
        cin >> birthDay >> birthMonth >> birthYear;
        cin.ignore(); // Clear buffer before getline
        cout << "Ingrese su deporte favorito: ";
        getline(cin, sport);
    } else if (language == 4) { // German
        cout << "\nGeben Sie Ihren Namen ein: ";
        getline(cin, name);
        cout << "Geben Sie Ihr Alter ein: ";
        cin >> age;
        cout << "Geben Sie Ihre Größe ein: ";
        cin >> height;
        cout << "Geben Sie Ihr Gewicht ein: ";
        cin >> weight;
        cout << "Geben Sie Ihr Geburtsdatum ein (Tag Monat Jahr): ";
        cin >> birthDay >> birthMonth >> birthYear;
        cin.ignore(); // Clear buffer before getline
        cout << "Geben Sie Ihren Lieblingssport ein: ";
        getline(cin, sport);
    } else { // English (default)
        cout << "\nEnter your name: ";
        getline(cin, name);
        cout << "Enter your age: ";
        cin >> age;
        cout << "Enter your height: ";
        cin >> height;
        cout << "Enter your weight: ";
        cin >> weight;
        cout << "Enter your birth date (day month year): ";
        cin >> birthDay >> birthMonth >> birthYear;
        cin.ignore(); // Clear buffer before getline
        cout << "Enter your favorite sport: ";
        getline(cin, sport);
    }

    // Calculate time since birth
    auto now = system_clock::now();
    time_t now_c = system_clock::to_time_t(now);
    tm* now_tm = localtime(&now_c);

    tm birth_tm = {};
    birth_tm.tm_year = birthYear - 1900;
    birth_tm.tm_mon = birthMonth - 1;
    birth_tm.tm_mday = birthDay;

    time_t birth_time = mktime(&birth_tm);
    auto birth_point = system_clock::from_time_t(birth_time);

    auto duration_since_birth = now - birth_point;
    auto hours_lived = duration_cast<hours>(duration_since_birth).count();
    auto days_lived = hours_lived / 24;
    auto minutes_lived = duration_cast<minutes>(duration_since_birth).count();
    auto seconds_lived = duration_cast<seconds>(duration_since_birth).count();

    // Calculate years, months, and remaining days
    int years_lived = now_tm->tm_year - (birthYear - 1900);
    int months_lived = now_tm->tm_mon - (birthMonth - 1);
    int remaining_days = now_tm->tm_mday - birthDay;

    if (remaining_days < 0) {
        months_lived--;
        remaining_days += 30; // Approximate
    }
    if (months_lived < 0) {
        years_lived--;
        months_lived += 12;
    }

    // Calculate BMI
    double height_m = height / 100.0; // Convert cm to meters
    double bmi = weight / (height_m * height_m);

    // Determine zodiac sign
    string zodiac_sign;
    if ((birthMonth == 3 && birthDay >= 21) || (birthMonth == 4 && birthDay <= 19)) {
        zodiac_sign = (language == 2) ? "Bélier" : (language == 3) ? "Aries" : (language == 4) ? "Widder" : "Aries";
    } else if ((birthMonth == 4 && birthDay >= 20) || (birthMonth == 5 && birthDay <= 20)) {
        zodiac_sign = (language == 2) ? "Taureau" : (language == 3) ? "Tauro" : (language == 4) ? "Stier" : "Taurus";
    } else if ((birthMonth == 5 && birthDay >= 21) || (birthMonth == 6 && birthDay <= 20)) {
        zodiac_sign = (language == 2) ? "Gémeaux" : (language == 3) ? "Géminis" : (language == 4) ? "Zwillinge" : "Gemini";
    } else if ((birthMonth == 6 && birthDay >= 21) || (birthMonth == 7 && birthDay <= 22)) {
        zodiac_sign = (language == 2) ? "Cancer" : (language == 3) ? "Cáncer" : (language == 4) ? "Krebs" : "Cancer";
    } else if ((birthMonth == 7 && birthDay >= 23) || (birthMonth == 8 && birthDay <= 22)) {
        zodiac_sign = (language == 2) ? "Lion" : (language == 3) ? "Leo" : (language == 4) ? "Löwe" : "Leo";
    } else if ((birthMonth == 8 && birthDay >= 23) || (birthMonth == 9 && birthDay <= 22)) {
        zodiac_sign = (language == 2) ? "Vierge" : (language == 3) ? "Virgo" : (language == 4) ? "Jungfrau" : "Virgo";
    } else if ((birthMonth == 9 && birthDay >= 23) || (birthMonth == 10 && birthDay <= 22)) {
        zodiac_sign = (language == 2) ? "Balance" : (language == 3) ? "Libra" : (language == 4) ? "Waage" : "Libra";
    } else if ((birthMonth == 10 && birthDay >= 23) || (birthMonth == 11 && birthDay <= 21)) {
        zodiac_sign = (language == 2) ? "Scorpion" : (language == 3) ? "Escorpio" : (language == 4) ? "Skorpion" : "Scorpio";
    } else if ((birthMonth == 11 && birthDay >= 22) || (birthMonth == 12 && birthDay <= 21)) {
        zodiac_sign = (language == 2) ? "Sagittaire" : (language == 3) ? "Sagitario" : (language == 4) ? "Schütze" : "Sagittarius";
    } else if ((birthMonth == 12 && birthDay >= 22) || (birthMonth == 1 && birthDay <= 19)) {
        zodiac_sign = (language == 2) ? "Capricorne" : (language == 3) ? "Capricornio" : (language == 4) ? "Steinbock" : "Capricorn";
    } else if ((birthMonth == 1 && birthDay >= 20) || (birthMonth == 2 && birthDay <= 18)) {
        zodiac_sign = (language == 2) ? "Verseau" : (language == 3) ? "Acuario" : (language == 4) ? "Wassermann" : "Aquarius";
    } else {
        zodiac_sign = (language == 2) ? "Poissons" : (language == 3) ? "Piscis" : (language == 4) ? "Fische" : "Pisces";
    }

    // Fun facts based on age
    string generation;
    if (age >= 77) {
        generation = (language == 2) ? "Génération silencieuse" : (language == 3) ? "Generación silenciosa" : (language == 4) ? "Stille Generation" : "Silent Generation";
    } else if (age >= 58) {
        generation = (language == 2) ? "Baby Boomer" : (language == 3) ? "Baby Boomer" : (language == 4) ? "Babyboomer" : "Baby Boomer";
    } else if (age >= 42) {
        generation = (language == 2) ? "Génération X" : (language == 3) ? "Generación X" : (language == 4) ? "Generation X" : "Generation X";
    } else if (age >= 26) {
        generation = (language == 2) ? "Millennial" : (language == 3) ? "Millennial" : (language == 4) ? "Millennial" : "Millennial";
    } else if (age >= 10) {
        generation = (language == 2) ? "Génération Z" : (language == 3) ? "Generación Z" : (language == 4) ? "Generation Z" : "Generation Z";
    } else {
        generation = (language == 2) ? "Génération Alpha" : (language == 3) ? "Generación Alpha" : (language == 4) ? "Generation Alpha" : "Generation Alpha";
    }

    // Shocking personality analysis based on birth date and name
    int personality_score = (birthDay * birthMonth + name.length() * age) % 100;
    string personality_trait;
    string shocking_fact;

    if (personality_score < 20) {
        personality_trait = (language == 2) ? "Mystérieux et imprévisible" : (language == 3) ? "Misterioso e impredecible" : (language == 4) ? "Geheimnisvoll und unberechenbar" : "Mysterious and unpredictable";
        shocking_fact = (language == 2) ? "Vous avez probablement des talents cachés que personne ne connaît!" : (language == 3) ? "¡Probablemente tienes talentos ocultos que nadie conoce!" : (language == 4) ? "Sie haben wahrscheinlich verborgene Talente, die niemand kennt!" : "You probably have hidden talents nobody knows about!";
    } else if (personality_score < 40) {
        personality_trait = (language == 2) ? "Leader naturel" : (language == 3) ? "Líder natural" : (language == 4) ? "Natürlicher Anführer" : "Natural leader";
        shocking_fact = (language == 2) ? "Les gens vous suivent instinctivement, même sans le réaliser!" : (language == 3) ? "¡La gente te sigue instintivamente, incluso sin darse cuenta!" : (language == 4) ? "Menschen folgen Ihnen instinktiv, auch ohne es zu merken!" : "People follow you instinctively, even without realizing it!";
    } else if (personality_score < 60) {
        personality_trait = (language == 2) ? "Créatif et innovant" : (language == 3) ? "Creativo e innovador" : (language == 4) ? "Kreativ und innovativ" : "Creative and innovative";
        shocking_fact = (language == 2) ? "Votre cerveau fonctionne différemment - vous voyez des solutions que d'autres ratent!" : (language == 3) ? "¡Tu cerebro funciona diferente - ves soluciones que otros pasan por alto!" : (language == 4) ? "Ihr Gehirn funktioniert anders - Sie sehen Lösungen, die andere übersehen!" : "Your brain works differently - you see solutions others miss!";
    } else if (personality_score < 80) {
        personality_trait = (language == 2) ? "Empathique et intuitif" : (language == 3) ? "Empático e intuitivo" : (language == 4) ? "Empathisch und intuitiv" : "Empathetic and intuitive";
        shocking_fact = (language == 2) ? "Vous pouvez lire les émotions des gens comme un livre ouvert!" : (language == 3) ? "¡Puedes leer las emociones de las personas como un libro abierto!" : (language == 4) ? "Sie können die Emotionen der Menschen wie ein offenes Buch lesen!" : "You can read people's emotions like an open book!";
    } else {
        personality_trait = (language == 2) ? "Aventurier et audacieux" : (language == 3) ? "Aventurero y audaz" : (language == 4) ? "Abenteuerlich und mutig" : "Adventurous and bold";
        shocking_fact = (language == 2) ? "Vous êtes destiné à vivre des expériences extraordinaires!" : (language == 3) ? "¡Estás destinado a vivir experiencias extraordinarias!" : (language == 4) ? "Sie sind dazu bestimmt, außergewöhnliche Erfahrungen zu machen!" : "You're destined to have extraordinary experiences!";
    }

    // Life expectancy and shocking predictions (based on current lifestyle factors)
    int predicted_lifespan = 80; // Base lifespan
    if (bmi >= 18.5 && bmi < 25) predicted_lifespan += 5; // Good BMI
    if (age < 30) predicted_lifespan += 3; // Youth advantage
    if (sport.find("running") != string::npos || sport.find("swimming") != string::npos) predicted_lifespan += 4;

    int years_remaining = predicted_lifespan - age;
    long long days_remaining = years_remaining * 365;
    long long heartbeats_remaining = days_remaining * 100000; // ~100k beats per day

    // Calculate how many times they've blinked, breathed, etc.
    long long total_blinks = days_lived * 17000; // ~17k blinks per day
    long long total_breaths = days_lived * 23000; // ~23k breaths per day
    long long total_heartbeats = days_lived * 100000; // ~100k beats per day
    double blood_pumped = total_heartbeats * 0.07; // ~70ml per beat in liters

    // Display all information in paragraph format based on language
    if (language == 2) { // French
        cout << "\n--- Vos Informations ---" << endl;
        cout << "Votre nom est " << name << ". Vous avez " << age << " ans. ";
        cout << "Votre taille est " << height << " cm et votre poids est " << weight << " kg. ";
        cout << "Votre sport favori est " << sport << "." << endl;

        cout << "\n--- Analyses Intéressantes ---" << endl;
        cout << fixed << setprecision(1);
        cout << "💪 Votre IMC est de " << bmi << " kg/m²";
        if (bmi < 18.5) cout << " (Sous-poids)";
        else if (bmi < 25) cout << " (Poids normal)";
        else if (bmi < 30) cout << " (Surpoids)";
        else cout << " (Obèse)";
        cout << endl;

        cout << "⭐ Votre signe du zodiaque est " << zodiac_sign << endl;
        cout << "🎯 Vous appartenez à la " << generation << endl;
        cout << "🏃 En pratiquant " << sport << ", vous brûlez environ " << (age < 30 ? 300 : age < 50 ? 250 : 200) << " calories par heure!" << endl;

        cout << "\n--- 🔮 ANALYSE DE PERSONNALITÉ CHOQUANTE ---" << endl;
        cout << "🎭 Votre type de personnalité: " << personality_trait << " (Score: " << personality_score << "/100)" << endl;
        cout << "⚡ Fait choquant: " << shocking_fact << endl;

        cout << "\n--- 💀 PRÉDICTIONS DE VIE TERRIFIANTES ---" << endl;
        cout << "⏳ Espérance de vie estimée: " << predicted_lifespan << " ans" << endl;
        cout << "💀 Années restantes: ~" << years_remaining << " ans (" << days_remaining << " jours)" << endl;
        cout << "💓 Battements de cœur restants: ~" << heartbeats_remaining << " battements!" << endl;

        cout << "\n--- 🤯 STATISTIQUES DE VIE INCROYABLES ---" << endl;
        cout << "👁️ Vous avez cligné des yeux " << total_blinks << " fois!" << endl;
        cout << "🫁 Vous avez respiré " << total_breaths << " fois!" << endl;
        cout << "💓 Votre cœur a battu " << total_heartbeats << " fois!" << endl;
        cout << "🩸 Votre cœur a pompé " << fixed << setprecision(0) << blood_pumped << " litres de sang!" << endl;

        cout << "\n--- Calculateur de Temps de Vie ---" << endl;
        cout << "Depuis votre naissance le " << birthDay << "/" << birthMonth << "/" << birthYear << ":" << endl;
        cout << "Vous avez vécu exactement " << years_lived << " années, " << months_lived << " mois et " << remaining_days << " jours." << endl;
        cout << "Cela représente " << days_lived << " jours, " << hours_lived << " heures, " << minutes_lived << " minutes, ou " << seconds_lived << " secondes!" << endl;
    } else if (language == 3) { // Spanish
        cout << "\n--- Su Información ---" << endl;
        cout << "Su nombre es " << name << ". Usted tiene " << age << " años. ";
        cout << "Su altura es " << height << " cm y su peso es " << weight << " kg. ";
        cout << "Su deporte favorito es " << sport << "." << endl;

        cout << "\n--- Análisis Interesantes ---" << endl;
        cout << fixed << setprecision(1);
        cout << "💪 Su IMC es " << bmi << " kg/m²";
        if (bmi < 18.5) cout << " (Bajo peso)";
        else if (bmi < 25) cout << " (Peso normal)";
        else if (bmi < 30) cout << " (Sobrepeso)";
        else cout << " (Obesidad)";
        cout << endl;

        cout << "⭐ Su signo zodiacal es " << zodiac_sign << endl;
        cout << "🎯 Pertenece a la " << generation << endl;
        cout << "🏃 Practicando " << sport << ", quema aproximadamente " << (age < 30 ? 300 : age < 50 ? 250 : 200) << " calorías por hora!" << endl;

        cout << "\n--- 🔮 ANÁLISIS DE PERSONALIDAD IMPACTANTE ---" << endl;
        cout << "🎭 Su tipo de personalidad: " << personality_trait << " (Puntuación: " << personality_score << "/100)" << endl;
        cout << "⚡ Hecho impactante: " << shocking_fact << endl;

        cout << "\n--- 💀 PREDICCIONES DE VIDA ATERRADORAS ---" << endl;
        cout << "⏳ Esperanza de vida estimada: " << predicted_lifespan << " años" << endl;
        cout << "💀 Años restantes: ~" << years_remaining << " años (" << days_remaining << " días)" << endl;
        cout << "💓 Latidos restantes: ~" << heartbeats_remaining << " latidos!" << endl;

        cout << "\n--- 🤯 ESTADÍSTICAS DE VIDA INCREÍBLES ---" << endl;
        cout << "👁️ ¡Ha parpadeado " << total_blinks << " veces!" << endl;
        cout << "🫁 ¡Ha respirado " << total_breaths << " veces!" << endl;
        cout << "💓 ¡Su corazón ha latido " << total_heartbeats << " veces!" << endl;
        cout << "🩸 ¡Su corazón ha bombeado " << fixed << setprecision(0) << blood_pumped << " litros de sangre!" << endl;

        // Calculate more shocking statistics
        long long hair_grown = days_lived * 0.4; // ~0.4mm per day in mm
        long long nail_grown = days_lived * 0.1; // ~0.1mm per day in mm
        long long skin_cells_shed = days_lived * 30000; // ~30k cells per day
        long long words_spoken = days_lived * 16000; // ~16k words per day
        long long steps_taken = days_lived * 7500; // ~7.5k steps per day
        double distance_walked = steps_taken * 0.75 / 1000; // in kilometers

        cout << "💇 ¡Su cabello ha crecido " << hair_grown << " milímetros (" << hair_grown/10 << " cm)!" << endl;
        cout << "💅 ¡Sus uñas han crecido " << nail_grown << " milímetros!" << endl;
        cout << "🌟 ¡Ha perdido " << skin_cells_shed << " células de piel!" << endl;
        cout << "🗣️ ¡Ha pronunciado aproximadamente " << words_spoken << " palabras!" << endl;
        cout << "👣 ¡Ha dado alrededor de " << steps_taken << " pasos!" << endl;
        cout << "🚶 ¡Ha caminado aproximadamente " << fixed << setprecision(1) << distance_walked << " kilómetros!" << endl;

        // Dream analysis
        cout << "\n--- 😴 ANÁLISIS DE SUEÑOS Y SECRETOS DEL SUEÑO ---" << endl;
        int total_sleep_hours = days_lived * 8;
        int dreams_had = days_lived * 4;
        int nightmares = dreams_had * 0.1;

        cout << "💤 ¡Ha dormido aproximadamente " << total_sleep_hours << " horas (" << total_sleep_hours/24 << " días)!" << endl;
        cout << "🌙 ¡Ha tenido alrededor de " << dreams_had << " sueños!" << endl;
        cout << "😱 ¡Incluyendo aproximadamente " << nightmares << " pesadillas!" << endl;

        string dream_type;
        string dream_meaning;
        int dream_score = (birthDay + birthMonth + age + name.length()) % 10;

        switch(dream_score) {
            case 0: case 1:
                dream_type = "Sueños lúcidos";
                dream_meaning = "¡Controlas tus sueños - señal de una mente poderosa!";
                break;
            case 2: case 3:
                dream_type = "Sueños proféticos";
                dream_meaning = "¡Tus sueños predicen el futuro!";
                break;
            case 4: case 5:
                dream_type = "Sueños creativos";
                dream_meaning = "¡Resuelves problemas mientras sueñas!";
                break;
            case 6: case 7:
                dream_type = "Sueños de aventura";
                dream_meaning = "¡Vives aventuras épicas mientras duermes!";
                break;
            default:
                dream_type = "Sueños místicos";
                dream_meaning = "¡Te conectas con otras dimensiones!";
        }

        cout << "🔮 Tipo de sueño dominante: " << dream_type << endl;
        cout << "✨ Significado: " << dream_meaning << endl;

        // Future predictions
        cout << "\n--- 🎯 PREDICCIONES FUTURAS IMPACTANTES ---" << endl;

        int future_score = (age * birthDay + birthMonth * name.length() + personality_score) % 100;
        int years_to_success = (future_score % 7) + 1;
        int lucky_age = age + years_to_success;

        string major_event;
        string success_type;
        string challenge;

        if (future_score < 20) {
            major_event = "conocerás el amor de tu vida";
            success_type = "éxito romántico";
            challenge = "superar tu timidez";
        } else if (future_score < 40) {
            major_event = "harás un descubrimiento revolucionario";
            success_type = "éxito científico";
            challenge = "superar tus límites intelectuales";
        } else if (future_score < 60) {
            major_event = "te convertirás en millonario";
            success_type = "éxito financiero";
            challenge = "tomar riesgos calculados";
        } else if (future_score < 80) {
            major_event = "salvarás vidas";
            success_type = "éxito heroico";
            challenge = "confiar en tu instinto";
        } else {
            major_event = "cambiarás el mundo";
            success_type = "éxito mundial";
            challenge = "abrazar tu destino";
        }

        cout << "🎊 A los " << lucky_age << " años, " << major_event << "!" << endl;
        cout << "🏆 Tipo de éxito: " << success_type << endl;
        cout << "⚡ Desafío a superar: " << challenge << endl;

        // Quantum personality analysis
        cout << "\n--- 🧬 ANÁLISIS CUÁNTICO DE PERSONALIDAD ---" << endl;

        int dna_score = (name.length() * age + birthDay * birthMonth) % 16;
        string quantum_trait;
        string superpower;
        string weakness;

        switch(dna_score) {
            case 0: case 1:
                quantum_trait = "Telépata";
                superpower = "leer mentes";
                weakness = "sobrecarga emocional";
                break;
            case 2: case 3:
                quantum_trait = "Viajero del tiempo";
                superpower = "predecir eventos";
                weakness = "confusión temporal";
                break;
            case 4: case 5:
                quantum_trait = "Sanador energético";
                superpower = "sanar con el tacto";
                weakness = "agotamiento energético";
                break;
            case 6: case 7:
                quantum_trait = "Manipulador de probabilidades";
                superpower = "influir en la suerte";
                weakness = "efectos impredecibles";
                break;
            case 8: case 9:
                quantum_trait = "Detector de mentiras";
                superpower = "detectar la verdad";
                weakness = "cinismo excesivo";
                break;
            case 10: case 11:
                quantum_trait = "Controlador de elementos";
                superpower = "comandar elementos";
                weakness = "inestabilidad emocional";
                break;
            case 12: case 13:
                quantum_trait = "Lector de auras";
                superpower = "ver energías";
                weakness = "sobrecarga sensorial";
                break;
            default:
                quantum_trait = "Maestro dimensional";
                superpower = "viajar entre mundos";
                weakness = "pérdida de realidad";
        }

        cout << "🌟 Rasgo cuántico: " << quantum_trait << endl;
        cout << "💪 Superpoder: " << superpower << endl;
        cout << "⚠️ Debilidad: " << weakness << endl;

        // Interactive prediction game
        cout << "\n--- 🎮 JUEGO DE PREDICCIÓN INTERACTIVO ---" << endl;
        string user_choice;
        cout << "Elige un número entre 1 y 10 para descubrir tu secreto cósmico: ";
        getline(cin, user_choice);

        int choice_num = 5;
        try {
            choice_num = stoi(user_choice);
            if (choice_num < 1 || choice_num > 10) choice_num = 5;
        } catch (...) {
            choice_num = 5;
        }

        int cosmic_score = (choice_num + personality_score + age) % 10;
        string cosmic_secret;

        switch(cosmic_score) {
            case 0:
                cosmic_secret = "¡Eres la reencarnación de un sabio ancestral!";
                break;
            case 1:
                cosmic_secret = "¡Tu alma gemela te está buscando activamente!";
                break;
            case 2:
                cosmic_secret = "¡Tienes un ángel guardián muy poderoso!";
                break;
            case 3:
                cosmic_secret = "¡Puedes influir en los sueños de otros!";
                break;
            case 4:
                cosmic_secret = "¡Tu intuición está conectada al universo!";
                break;
            case 5:
                cosmic_secret = "¡Naturalmente atraes la suerte!";
                break;
            case 6:
                cosmic_secret = "¡Has vivido vidas paralelas!";
                break;
            case 7:
                cosmic_secret = "¡Tu energía sana a otros inconscientemente!";
                break;
            case 8:
                cosmic_secret = "¡Estás destinado a revelar un gran misterio!";
                break;
            default:
                cosmic_secret = "¡Posees el don de transformación!";
        }

        cout << "🌌 Secreto cósmico: " << cosmic_secret << endl;

        // Final shocking revelation
        cout << "\n--- 🔥 REVELACIÓN FINAL IMPACTANTE ---" << endl;

        int final_score = (personality_score + cosmic_score + future_score) % 7;
        string life_mission;

        switch(final_score) {
            case 0:
                life_mission = "¡Estás aquí para inspirar a la humanidad con tu ejemplo!";
                break;
            case 1:
                life_mission = "¡Tu misión es crear algo revolucionario!";
                break;
            case 2:
                life_mission = "¡Debes guiar a las almas perdidas hacia su camino!";
                break;
            case 3:
                life_mission = "¡Tu propósito es conectar personas y crear armonía!";
                break;
            case 4:
                life_mission = "¡Estás destinado a descubrir verdades ocultas!";
                break;
            case 5:
                life_mission = "¡Tu misión es proteger y preservar la belleza!";
                break;
            default:
                life_mission = "¡Eres el equilibrio entre todos los mundos!";
        }

        cout << "🎯 MISIÓN DE VIDA: " << life_mission << endl;
        cout << "⭐ Recuerda: ¡Cada segundo cuenta, cada elección moldea tu destino!" << endl;

        cout << "\n--- Calculadora de Tiempo de Vida ---" << endl;
        cout << "Desde su nacimiento el " << birthDay << "/" << birthMonth << "/" << birthYear << ":" << endl;
        cout << "Ha vivido exactamente " << years_lived << " años, " << months_lived << " meses y " << remaining_days << " días." << endl;
        cout << "Eso equivale a " << days_lived << " días, " << hours_lived << " horas, " << minutes_lived << " minutos, o " << seconds_lived << " segundos!" << endl;
    } else if (language == 4) { // German
        cout << "\n--- Ihre Informationen ---" << endl;
        cout << "Ihr Name ist " << name << ". Sie sind " << age << " Jahre alt. ";
        cout << "Ihre Größe ist " << height << " cm und Ihr Gewicht ist " << weight << " kg. ";
        cout << "Ihr Lieblingssport ist " << sport << "." << endl;

        cout << "\n--- Interessante Analysen ---" << endl;
        cout << fixed << setprecision(1);
        cout << "💪 Ihr BMI beträgt " << bmi << " kg/m²";
        if (bmi < 18.5) cout << " (Untergewicht)";
        else if (bmi < 25) cout << " (Normalgewicht)";
        else if (bmi < 30) cout << " (Übergewicht)";
        else cout << " (Adipositas)";
        cout << endl;

        cout << "⭐ Ihr Sternzeichen ist " << zodiac_sign << endl;
        cout << "🎯 Sie gehören zur " << generation << endl;
        cout << "🏃 Beim " << sport << " verbrennen Sie etwa " << (age < 30 ? 300 : age < 50 ? 250 : 200) << " Kalorien pro Stunde!" << endl;

        cout << "\n--- 🔮 SCHOCKIERENDE PERSÖNLICHKEITSANALYSE ---" << endl;
        cout << "🎭 Ihr Persönlichkeitstyp: " << personality_trait << " (Punktzahl: " << personality_score << "/100)" << endl;
        cout << "⚡ Schockierende Tatsache: " << shocking_fact << endl;

        cout << "\n--- 💀 ERSCHRECKENDE LEBENSPROGNOSEN ---" << endl;
        cout << "⏳ Geschätzte Lebenserwartung: " << predicted_lifespan << " Jahre" << endl;
        cout << "💀 Verbleibende Jahre: ~" << years_remaining << " Jahre (" << days_remaining << " Tage)" << endl;
        cout << "💓 Verbleibende Herzschläge: ~" << heartbeats_remaining << " Schläge!" << endl;

        cout << "\n--- 🤯 UNGLAUBLICHE LEBENSSTATISTIKEN ---" << endl;
        cout << "👁️ Sie haben " << total_blinks << " Mal geblinzelt!" << endl;
        cout << "🫁 Sie haben " << total_breaths << " Mal geatmet!" << endl;
        cout << "💓 Ihr Herz hat " << total_heartbeats << " Mal geschlagen!" << endl;
        cout << "🩸 Ihr Herz hat " << fixed << setprecision(0) << blood_pumped << " Liter Blut gepumpt!" << endl;

        // Calculate more shocking statistics
        long long hair_grown = days_lived * 0.4;
        long long nail_grown = days_lived * 0.1;
        long long skin_cells_shed = days_lived * 30000;
        long long words_spoken = days_lived * 16000;
        long long steps_taken = days_lived * 7500;
        double distance_walked = steps_taken * 0.75 / 1000;

        cout << "💇 Ihr Haar ist " << hair_grown << " Millimeter (" << hair_grown/10 << " cm) gewachsen!" << endl;
        cout << "💅 Ihre Nägel sind " << nail_grown << " Millimeter gewachsen!" << endl;
        cout << "🌟 Sie haben " << skin_cells_shed << " Hautzellen abgestoßen!" << endl;
        cout << "🗣️ Sie haben etwa " << words_spoken << " Wörter gesprochen!" << endl;
        cout << "👣 Sie haben ungefähr " << steps_taken << " Schritte gemacht!" << endl;
        cout << "🚶 Sie sind etwa " << fixed << setprecision(1) << distance_walked << " Kilometer gelaufen!" << endl;

        // Dream analysis
        cout << "\n--- 😴 TRAUMANALYSE & SCHLAFGEHEIMNISSE ---" << endl;
        int total_sleep_hours = days_lived * 8;
        int dreams_had = days_lived * 4;
        int nightmares = dreams_had * 0.1;

        cout << "💤 Sie haben etwa " << total_sleep_hours << " Stunden (" << total_sleep_hours/24 << " Tage) geschlafen!" << endl;
        cout << "🌙 Sie hatten ungefähr " << dreams_had << " Träume!" << endl;
        cout << "😱 Einschließlich etwa " << nightmares << " Albträume!" << endl;

        string dream_type;
        string dream_meaning;
        int dream_score = (birthDay + birthMonth + age + name.length()) % 10;

        switch(dream_score) {
            case 0: case 1:
                dream_type = "Klarträume";
                dream_meaning = "Sie kontrollieren Ihre Träume - Zeichen eines mächtigen Geistes!";
                break;
            case 2: case 3:
                dream_type = "Prophetische Träume";
                dream_meaning = "Ihre Träume sagen die Zukunft voraus!";
                break;
            case 4: case 5:
                dream_type = "Kreative Träume";
                dream_meaning = "Sie lösen Probleme im Traum!";
                break;
            case 6: case 7:
                dream_type = "Abenteuerträume";
                dream_meaning = "Sie erleben epische Abenteuer im Schlaf!";
                break;
            default:
                dream_type = "Mystische Träume";
                dream_meaning = "Sie verbinden sich mit anderen Dimensionen!";
        }

        cout << "🔮 Dominanter Traumtyp: " << dream_type << endl;
        cout << "✨ Bedeutung: " << dream_meaning << endl;

        // Future predictions
        cout << "\n--- 🎯 SCHOCKIERENDE ZUKUNFTSPROGNOSEN ---" << endl;

        int future_score = (age * birthDay + birthMonth * name.length() + personality_score) % 100;
        int years_to_success = (future_score % 7) + 1;
        int lucky_age = age + years_to_success;

        string major_event;
        string success_type;
        string challenge;

        if (future_score < 20) {
            major_event = "werden die Liebe Ihres Lebens treffen";
            success_type = "romantischer Erfolg";
            challenge = "Ihre Schüchternheit überwinden";
        } else if (future_score < 40) {
            major_event = "werden eine revolutionäre Entdeckung machen";
            success_type = "wissenschaftlicher Erfolg";
            challenge = "Ihre intellektuellen Grenzen überwinden";
        } else if (future_score < 60) {
            major_event = "werden Millionär werden";
            success_type = "finanzieller Erfolg";
            challenge = "kalkulierte Risiken eingehen";
        } else if (future_score < 80) {
            major_event = "werden Leben retten";
            success_type = "heroischer Erfolg";
            challenge = "Ihrem Instinkt vertrauen";
        } else {
            major_event = "werden die Welt verändern";
            success_type = "weltweiter Erfolg";
            challenge = "Ihr Schicksal annehmen";
        }

        cout << "🎊 Im Alter von " << lucky_age << " Jahren " << major_event << "!" << endl;
        cout << "🏆 Erfolgstyp: " << success_type << endl;
        cout << "⚡ Zu bewältigende Herausforderung: " << challenge << endl;

        // Quantum personality analysis
        cout << "\n--- 🧬 QUANTENPERSÖNLICHKEITSANALYSE ---" << endl;

        int dna_score = (name.length() * age + birthDay * birthMonth) % 16;
        string quantum_trait;
        string superpower;
        string weakness;

        switch(dna_score) {
            case 0: case 1:
                quantum_trait = "Telepathisch";
                superpower = "Gedanken lesen";
                weakness = "emotionale Überlastung";
                break;
            case 2: case 3:
                quantum_trait = "Zeitreisender";
                superpower = "Ereignisse vorhersagen";
                weakness = "zeitliche Verwirrung";
                break;
            case 4: case 5:
                quantum_trait = "Energieheiler";
                superpower = "durch Berührung heilen";
                weakness = "Energieerschöpfung";
                break;
            case 6: case 7:
                quantum_trait = "Wahrscheinlichkeitsmanipulator";
                superpower = "Glück beeinflussen";
                weakness = "unvorhersagbare Effekte";
                break;
            case 8: case 9:
                quantum_trait = "Lügendetektor";
                superpower = "Wahrheit erkennen";
                weakness = "übermäßiger Zynismus";
                break;
            case 10: case 11:
                quantum_trait = "Elementarkontrolleur";
                superpower = "Elemente befehligen";
                weakness = "emotionale Instabilität";
                break;
            case 12: case 13:
                quantum_trait = "Aura-Leser";
                superpower = "Energien sehen";
                weakness = "sensorische Überlastung";
                break;
            default:
                quantum_trait = "Dimensionsmeister";
                superpower = "zwischen Welten reisen";
                weakness = "Realitätsverlust";
        }

        cout << "🌟 Quanteneigenschaft: " << quantum_trait << endl;
        cout << "💪 Superkraft: " << superpower << endl;
        cout << "⚠️ Schwäche: " << weakness << endl;

        // Interactive prediction game
        cout << "\n--- 🎮 INTERAKTIVES VORHERSAGESPIEL ---" << endl;
        string user_choice;
        cout << "Wählen Sie eine Zahl zwischen 1 und 10, um Ihr kosmisches Geheimnis zu entdecken: ";
        getline(cin, user_choice);

        int choice_num = 5;
        try {
            choice_num = stoi(user_choice);
            if (choice_num < 1 || choice_num > 10) choice_num = 5;
        } catch (...) {
            choice_num = 5;
        }

        int cosmic_score = (choice_num + personality_score + age) % 10;
        string cosmic_secret;

        switch(cosmic_score) {
            case 0:
                cosmic_secret = "Sie sind die Reinkarnation eines alten Weisen!";
                break;
            case 1:
                cosmic_secret = "Ihre Zwillingsseele sucht Sie aktiv!";
                break;
            case 2:
                cosmic_secret = "Sie haben einen sehr mächtigen Schutzengel!";
                break;
            case 3:
                cosmic_secret = "Sie können die Träume anderer beeinflussen!";
                break;
            case 4:
                cosmic_secret = "Ihre Intuition ist mit dem Universum verbunden!";
                break;
            case 5:
                cosmic_secret = "Sie ziehen natürlich Glück an!";
                break;
            case 6:
                cosmic_secret = "Sie haben Parallelleben gelebt!";
                break;
            case 7:
                cosmic_secret = "Ihre Energie heilt andere unbewusst!";
                break;
            case 8:
                cosmic_secret = "Sie sind dazu bestimmt, ein großes Geheimnis zu enthüllen!";
                break;
            default:
                cosmic_secret = "Sie besitzen die Gabe der Transformation!";
        }

        cout << "🌌 Kosmisches Geheimnis: " << cosmic_secret << endl;

        // Final shocking revelation
        cout << "\n--- 🔥 SCHOCKIERENDE FINALE ENTHÜLLUNG ---" << endl;

        int final_score = (personality_score + cosmic_score + future_score) % 7;
        string life_mission;

        switch(final_score) {
            case 0:
                life_mission = "Sie sind hier, um die Menschheit durch Ihr Beispiel zu inspirieren!";
                break;
            case 1:
                life_mission = "Ihre Mission ist es, etwas Revolutionäres zu schaffen!";
                break;
            case 2:
                life_mission = "Sie müssen verlorene Seelen zu ihrem Weg führen!";
                break;
            case 3:
                life_mission = "Ihr Zweck ist es, Menschen zu verbinden und Harmonie zu schaffen!";
                break;
            case 4:
                life_mission = "Sie sind dazu bestimmt, verborgene Wahrheiten zu entdecken!";
                break;
            case 5:
                life_mission = "Ihre Mission ist es, Schönheit zu schützen und zu bewahren!";
                break;
            default:
                life_mission = "Sie sind das Gleichgewicht zwischen allen Welten!";
        }

        cout << "🎯 LEBENSMISSION: " << life_mission << endl;
        cout << "⭐ Denken Sie daran: Jede Sekunde zählt, jede Wahl formt Ihr Schicksal!" << endl;

        cout << "\n--- Lebenszeit-Rechner ---" << endl;
        cout << "Seit Ihrer Geburt am " << birthDay << "/" << birthMonth << "/" << birthYear << ":" << endl;
        cout << "Sie haben genau " << years_lived << " Jahre, " << months_lived << " Monate und " << remaining_days << " Tage gelebt." << endl;
        cout << "Das entspricht " << days_lived << " Tagen, " << hours_lived << " Stunden, " << minutes_lived << " Minuten oder " << seconds_lived << " Sekunden!" << endl;
    } else { // English (default)
        cout << "\n--- Your Information ---" << endl;
        cout << "Your name is " << name << ". You are " << age << " years old. ";
        cout << "Your height is " << height << " cm and your weight is " << weight << " kg. ";
        cout << "Your favorite sport is " << sport << "." << endl;

        cout << "\n--- Interesting Analysis ---" << endl;
        cout << fixed << setprecision(1);
        cout << "💪 Your BMI is " << bmi << " kg/m²";
        if (bmi < 18.5) cout << " (Underweight)";
        else if (bmi < 25) cout << " (Normal weight)";
        else if (bmi < 30) cout << " (Overweight)";
        else cout << " (Obese)";
        cout << endl;

        cout << "⭐ Your zodiac sign is " << zodiac_sign << endl;
        cout << "🎯 You belong to " << generation << endl;
        cout << "🏃 Playing " << sport << ", you burn approximately " << (age < 30 ? 300 : age < 50 ? 250 : 200) << " calories per hour!" << endl;

        cout << "\n--- 🔮 SHOCKING PERSONALITY ANALYSIS ---" << endl;
        cout << "🎭 Your personality type: " << personality_trait << " (Score: " << personality_score << "/100)" << endl;
        cout << "⚡ Shocking fact: " << shocking_fact << endl;

        cout << "\n--- 💀 TERRIFYING LIFE PREDICTIONS ---" << endl;
        cout << "⏳ Estimated lifespan: " << predicted_lifespan << " years" << endl;
        cout << "💀 Years remaining: ~" << years_remaining << " years (" << days_remaining << " days)" << endl;
        cout << "💓 Heartbeats remaining: ~" << heartbeats_remaining << " beats!" << endl;

        cout << "\n--- 🤯 MIND-BLOWING LIFE STATISTICS ---" << endl;
        cout << "👁️ You have blinked " << total_blinks << " times!" << endl;
        cout << "🫁 You have breathed " << total_breaths << " times!" << endl;
        cout << "💓 Your heart has beaten " << total_heartbeats << " times!" << endl;
        cout << "🩸 Your heart has pumped " << fixed << setprecision(0) << blood_pumped << " liters of blood!" << endl;

        cout << "\n--- Life Time Calculator ---" << endl;
        cout << "Since your birth on " << birthDay << "/" << birthMonth << "/" << birthYear << ":" << endl;
        cout << "You have lived exactly " << years_lived << " years, " << months_lived << " months, and " << remaining_days << " days." << endl;
        cout << "That equals " << days_lived << " days, " << hours_lived << " hours, " << minutes_lived << " minutes, or " << seconds_lived << " seconds!" << endl;
        
        
        // Future predictions
        cout << "\n--- 🎯 SHOCKING FUTURE PREDICTIONS ---" << endl;

        int future_score = (age * birthDay + birthMonth * name.length() + personality_score) % 100;
        int years_to_success = (future_score % 7) + 1;
        int lucky_age = age + years_to_success;

        string major_event;
        string success_type;
        string challenge;

        if (future_score < 20) {
            major_event = "will meet the love of your life";
            success_type = "romantic success";
            challenge = "overcome your shyness";
        } else if (future_score < 40) {
            major_event = "will make a revolutionary discovery";
            success_type = "scientific success";
            challenge = "push beyond your intellectual limits";
        } else if (future_score < 60) {
            major_event = "will become a millionaire";
            success_type = "financial success";
            challenge = "take calculated risks";
        } else if (future_score < 80) {
            major_event = "will save lives";
            success_type = "heroic success";
            challenge = "trust your instincts";
        } else {
            major_event = "will change the world";
            success_type = "global success";
            challenge = "embrace your destiny";
        }

        cout << "🎊 At age " << lucky_age << ", you " << major_event << "!" << endl;
        cout << "🏆 Success type: " << success_type << endl;
        cout << "⚡ Challenge to overcome: " << challenge << endl;

        // Quantum personality analysis
        cout << "\n--- 🧬 QUANTUM PERSONALITY ANALYSIS ---" << endl;

        int dna_score = (name.length() * age + birthDay * birthMonth) % 16;
        string quantum_trait;
        string superpower;
        string weakness;

        switch(dna_score) {
            case 0: case 1:
                quantum_trait = "Telepathic";
                superpower = "read minds";
                weakness = "emotional overload";
                break;
            case 2: case 3:
                quantum_trait = "Time Traveler";
                superpower = "predict events";
                weakness = "temporal confusion";
                break;
            case 4: case 5:
                quantum_trait = "Energy Healer";
                superpower = "heal through touch";
                weakness = "energy depletion";
                break;
            case 6: case 7:
                quantum_trait = "Probability Manipulator";
                superpower = "influence luck";
                weakness = "unpredictable effects";
                break;
            case 8: case 9:
                quantum_trait = "Lie Detector";
                superpower = "detect truth";
                weakness = "excessive cynicism";
                break;
            case 10: case 11:
                quantum_trait = "Element Controller";
                superpower = "command elements";
                weakness = "emotional instability";
                break;
            case 12: case 13:
                quantum_trait = "Aura Reader";
                superpower = "see energies";
                weakness = "sensory overload";
                break;
            default:
                quantum_trait = "Dimension Master";
                superpower = "travel between worlds";
                weakness = "reality loss";
        }

        cout << "🌟 Quantum trait: " << quantum_trait << endl;
        cout << "💪 Superpower: " << superpower << endl;
        cout << "⚠️ Weakness: " << weakness << endl;

        // Interactive prediction game
        cout << "\n--- 🎮 INTERACTIVE PREDICTION GAME ---" << endl;
        string user_choice;
        cout << "Choose a number between 1 and 10 to discover your cosmic secret: ";
        getline(cin, user_choice);

        int choice_num = 5;
        try {
            choice_num = stoi(user_choice);
            if (choice_num < 1 || choice_num > 10) choice_num = 5;
        } catch (...) {
            choice_num = 5;
        }

        int cosmic_score = (choice_num + personality_score + age) % 10;
        string cosmic_secret;

        switch(cosmic_score) {
            case 0:
                cosmic_secret = "You are the reincarnation of an ancient sage!";
                break;
            case 1:
                cosmic_secret = "Your soulmate is actively searching for you!";
                break;
            case 2:
                cosmic_secret = "You have a very powerful guardian angel!";
                break;
            case 3:
                cosmic_secret = "You can influence other people's dreams!";
                break;
            case 4:
                cosmic_secret = "Your intuition is connected to the universe!";
                break;
            case 5:
                cosmic_secret = "You naturally attract good luck!";
                break;
            case 6:
                cosmic_secret = "You have lived parallel lives!";
                break;
            case 7:
                cosmic_secret = "Your energy heals others unconsciously!";
                break;
            case 8:
                cosmic_secret = "You are destined to reveal a great mystery!";
                break;
            default:
                cosmic_secret = "You possess the gift of transformation!";
        }

        cout << "🌌 Cosmic secret: " << cosmic_secret << endl;

        // Final shocking revelation
        cout << "\n--- 🔥 FINAL SHOCKING REVELATION ---" << endl;

        int final_score = (personality_score + cosmic_score + future_score) % 7;
        string life_mission;

        switch(final_score) {
            case 0:
                life_mission = "You are here to inspire humanity through your example!";
                break;
            case 1:
                life_mission = "Your mission is to create something revolutionary!";
                break;
            case 2:
                life_mission = "You must guide lost souls to their path!";
                break;
            case 3:
                life_mission = "Your purpose is to connect people and create harmony!";
                break;
            case 4:
                life_mission = "You are destined to uncover hidden truths!";
                break;
            case 5:
                life_mission = "Your mission is to protect and preserve beauty!";
                break;
            default:
                life_mission = "You are the balance between all worlds!";
        }

        cout << "🎯 LIFE MISSION: " << life_mission << endl;
        cout << "⭐ Remember: Every second counts, every choice shapes your destiny!" << endl;
    }

    return 0;
}