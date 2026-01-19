const QUESTIONS = [
  {
    q: "Que signifie HTML ?",
    choices: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlink and Text Marking Logic",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
  q: "Quel tag HTML est sémantique ?",
  choices: ["&lt;div&gt;", "&lt;span&gt;", "&lt;header&gt;", "&lt;b&gt;"],
  answer: 2
},
{
    q: "En CSS, quelle propriété gère la taille du texte ?",
    choices: ["font-size", "text-weight", "size-font", "font-style"],
    answer: 0
  },
  {
    q: "À quoi sert JavaScript dans une page web ?",
    choices: [
      "Ajouter de l’interactivité",
      "Créer des tableaux dans Word",
      "Remplacer HTML",
      "Compresser des images automatiquement"
    ],
    answer: 0
  },
  {
    q: "Quel sélecteur CSS cible une classe ?",
    choices: ["#maClasse", ".maClasse", "@maClasse", "*maClasse"],
    answer: 1
  },
  {
    q: "Quelle méthode JS est utilisée pour sélectionner un élément par id ?",
    choices: ["getElementById", "queryAll", "selectId", "getById"],
    answer: 0
  },
  {
  q: "Quelle balise est correcte pour créer un lien ?",
  choices: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;url&gt;"],
  answer: 1
},
  {
    q: "Quelle commande Git sert à envoyer les commits vers GitHub ?",
    choices: ["git pull", "git push", "git init", "git status"],
    answer: 1
  },
  {
    q: "Un SGBD cité dans ton CV est :",
    choices: ["MySQL", "Cassandra", "Neo4j", "SQLite"],
    answer: 0
  },
  {
    q: "Dans ton stage Clinisys, le front-end était fait avec :",
    choices: ["React.js", "Angular", "Vue.js", "Svelte"],
    answer: 0
  },
  {
    q: "Spring Boot est principalement utilisé pour :",
    choices: ["Le back-end Java", "Le design CSS", "Le montage vidéo", "Le stockage cloud"],
    answer: 0
  },
  {
    q: "Quel langage est utilisé avec Flutter ?",
    choices: ["Dart", "Go", "Kotlin uniquement", "PHP"],
    answer: 0
  }
];

function buildQuiz(){
  const form = document.getElementById('quizForm');
  const container = document.getElementById('quizContainer');
  const resultBox = document.getElementById('resultBox');
  const answersBox = document.getElementById('answersBox');

  container.innerHTML = '';
  resultBox.style.display = 'none';
  answersBox.style.display = 'none';
  answersBox.innerHTML = '';

  QUESTIONS.forEach((item, i) => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'quiz-fieldset';

    const legend = document.createElement('legend');
    legend.textContent = `${i+1}. ${item.q}`;
    fieldset.appendChild(legend);

    item.choices.forEach((c, j) => {
      const id = `q${i}_${j}`;

      const row = document.createElement('div');
      row.className = 'quiz-option';
      row.innerHTML = `
        <input type="radio" id="${id}" name="q${i}" value="${j}" />
        <label for="${id}">${c}</label>
      `;

      // clic sur toute la ligne
      row.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() !== 'a') {
          const radio = row.querySelector('input[type="radio"]');
          radio.checked = true;
        }
      });

      fieldset.appendChild(row);
    });

    container.appendChild(fieldset);
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    gradeQuiz();
  });

  document.getElementById('resetBtn').addEventListener('click', ()=>{
    form.reset();
    resultBox.style.display = 'none';
    answersBox.style.display = 'none';
    answersBox.innerHTML = '';
    document.querySelectorAll('.quiz-option').forEach(x => x.classList.remove('correct','wrong'));
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

function gradeQuiz(){
  let score = 0;

  // Nettoyage couleurs
  document.querySelectorAll('.quiz-option').forEach(x => x.classList.remove('correct','wrong'));

  // Vérifier que tout est rempli
  for(let i = 0; i < QUESTIONS.length; i++){
    const chosen = document.querySelector(`input[name="q${i}"]:checked`);
    if(!chosen){
      alert(`Veuillez répondre à la question ${i+1} avant de valider.`);
      document.querySelectorAll('.quiz-fieldset')[i].scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }
  }

  const answers = [];

  QUESTIONS.forEach((item, i)=>{
    const chosen = document.querySelector(`input[name="q${i}"]:checked`);
    const chosenIndex = Number(chosen.value);

    // Les lignes de choix
    const rows = Array.from(document.querySelectorAll(`input[name="q${i}"]`))
      .map(inp => inp.closest('.quiz-option'));

    rows.forEach((row, j)=>{
      if(j === item.answer) row.classList.add('correct');
      if(j === chosenIndex && chosenIndex !== item.answer) row.classList.add('wrong');
    });

    if(chosenIndex === item.answer) score += 1;

    answers.push({
      q: item.q,
      correct: item.choices[item.answer]
    });
  });

  const total = QUESTIONS.length;
  const resultBox = document.getElementById('resultBox');
  const scoreText = document.getElementById('scoreText');
  const mention = document.getElementById('mentionText');

  scoreText.textContent = `Votre note : ${score} / ${total}`;

  const pct = Math.round((score/total)*100);
  let msg = 'Bon début !';
  if(pct >= 90) msg = 'Excellent 🔥';
  else if(pct >= 75) msg = 'Très bien ✅';
  else if(pct >= 60) msg = 'Bien 👍';
  else if(pct >= 40) msg = 'Continue à réviser 💪';
  else msg = 'Revois les bases et réessaie 🙂';

  mention.textContent = msg;
  resultBox.style.display = 'block';

  const answersBox = document.getElementById('answersBox');
  answersBox.style.display = 'block';
  answersBox.innerHTML = '<h3 style="margin:0 0 10px">Réponses correctes</h3>';

  const ul = document.createElement('ul');
  ul.className = 'ul';
  answers.forEach((a, idx)=>{
    const li = document.createElement('li');
    li.innerHTML = `<strong>${idx+1}.</strong> ${a.correct}`;
    ul.appendChild(li);
  });

  answersBox.appendChild(ul);
  answersBox.scrollIntoView({behavior:'smooth', block:'start'});
}

document.addEventListener('DOMContentLoaded', buildQuiz);