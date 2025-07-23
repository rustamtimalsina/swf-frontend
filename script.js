const BASE_URL = "http://localhost:8000";
let currentQuestionId = null;
let selectedOption = "";

async function loadQuestion() {
  const res = await fetch(`${BASE_URL}/api/question`);
  const data = await res.json();

  currentQuestionId = data.id;
  selectedOption = "";

  document.getElementById("questionText").innerText = data.question;
  document.getElementById("feedback").innerText = "";
  document.getElementById("submitBtn").style.display = "none";

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  data.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      selectedOption = opt;
      document.querySelectorAll("#options button").forEach(b => b.style.backgroundColor = "");
      btn.style.backgroundColor = "#cceeff";
      document.getElementById("submitBtn").style.display = "inline-block";
    };
    optionsDiv.appendChild(btn);
  });
}

async function submitAnswer() {
  const res = await fetch(`${BASE_URL}/api/check?id=${currentQuestionId}&selected=${selectedOption}`);
  const data = await res.json();
  if (data.correct) {
    document.getElementById("feedback").innerText = "✅ Correct!";
  } else {
    document.getElementById("feedback").innerText = `❌ Incorrect. Correct answer: ${data.answer}`;
  }
}

loadQuestion();