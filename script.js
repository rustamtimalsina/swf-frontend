const BASE_URL = "https://swf-backend-m80s.onrender.com/";
let currentQuestionId = null;
let selectedOption = "";

async function loadQuestion() {
  try {
    const res = await fetch(`${BASE_URL}/api/question`);
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();

    console.log("Fetched question:", data);

    document.getElementById("questionText").innerText = data.question;
    document.getElementById("feedback").innerText = "";
    document.getElementById("submitBtn").style.display = "none";

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    currentQuestionId = data.id;
    selectedOption = "";

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
  } catch (err) {
    console.error("Failed to load question:", err);
    document.getElementById("questionText").innerText = "⚠️ Failed to load question.";
  }
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