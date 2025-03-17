let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("#voiceSelect");


const languages = [
    { code: "en-US", name: "Inglizcha" },
    { code: "uz-UZ", name: "O‘zbekcha" },  
    { code: "ru-RU", name: "Ruscha" },
    { code: "fr-FR", name: "Fransuzcha" },
    { code: "de-DE", name: "Nemischa" },
    { code: "es-ES", name: "Ispancha" },
    { code: "tr-TR", name: "Turkcha" },
    { code: "zh-CN", name: "Xitoycha" }
];


languages.forEach(lang => {
    let option = document.createElement("option");
    option.value = lang.code;
    option.textContent = lang.name;
    voiceSelect.appendChild(option);
});


function loadVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        setTimeout(loadVoices, 100); 
        return;
    }

    console.log("✅ Yuklangan ovozlar:", voices);
}


window.speechSynthesis.onvoiceschanged = loadVoices;
setTimeout(loadVoices, 100);


document.querySelector("#btn").addEventListener("click", () => {
    let text = document.querySelector("#input").value;
    let selectedLang = voiceSelect.value;


    let selectedVoice = voices.find(voice => voice.lang === selectedLang);
    
    if (!selectedVoice) {
        alert("❌ Tanlangan til uchun ovoz topilmadi!");
        return;
    }

    speech.text = text;
    speech.voice = selectedVoice;
    speech.lang = selectedLang;
    window.speechSynthesis.speak(speech);
});
