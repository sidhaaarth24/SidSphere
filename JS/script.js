// Scroll Progress Bar
const scrollBar = document.querySelector(".scroll-progress-bar");
const header = document.querySelector(".topbar");

// Single scroll listener
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let scrollPercent = (scrollTop / scrollHeight) * 100;

    document.getElementById("scrollProgress").style.width = scrollPercent + "%";
};

// Header Blur On Scroll
window.addEventListener("scroll", () => {

    const header = document.querySelector(".topbar");

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

// Floating Menu Toggle
const menuIcon = document.querySelector(".menu-icon");
const menu = document.querySelector(".floating-menu");

menuIcon.onclick = () =>
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";

// Typing Effect
(function typingEffect() {
    const text = "Sidharth";
    let i = 0;

    function typing() {
        if (i < text.length) {
            document.getElementById("typing").innerHTML += text[i++];
            setTimeout(typing, 70);
        }
    }

    typing();
})();

// Rotating Typing Words
(function multiTyping() {

    const words = [
        "Engineer",
        "Developer",
        "Designer",
        "Programmer",
        "Editor",
        "Translator",
        "Author",
        "Artist",
    ];
    const el = document.querySelector(".typing");

    let wordIndex = 0, charIndex = 0, deleting = false;

    function type() {
        const word = words[wordIndex];

        if (!deleting) {
            el.textContent = word.slice(0, ++charIndex);

            if (charIndex === word.length)
                setTimeout(() => deleting = true, 1000);
        } else {
            el.textContent = word.slice(0, --charIndex);

            if (!charIndex) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(type, deleting ? 80 : 120);
    }

    type();
})();

// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

toggleBtn.onclick = () => {

    body.classList.toggle("light-mode");

    const light = body.classList.contains("light-mode");

    localStorage.setItem("theme", light ? "light" : "dark");
    toggleBtn.innerHTML = light ?
        '<i class="fas fa-sun"></i>' :
        '<i class="fas fa-moon"></i>';
};

// Build Cards Toggle
document.querySelectorAll(".build-card").forEach(card => {
    card.querySelector(".build-header").onclick = () =>
        card.classList.toggle("active");
});

// Terminal Elements
const terminalPopup = document.getElementById("terminalPopup");
const openTerminal = document.getElementById("openTerminal");
const closeTerminal = document.getElementById("closeTerminal");
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

closeTerminal.onclick = () => {
    terminalPopup.style.display = "none";
};

// Terminal Commands
const commands = {
    help: `
Available Commands:
help → Show commands
clear → Clear terminal
echo [text] → Print text
about → About me
`,

    about: `
Hello! I'm Sidharth Kumar, a passionate computer science engineer who loves building modern and responsive websites. I enjoy solving real-world problems and continuously improving my skills.
`
};

// Terminal Boot Animation + Voice
openTerminal.onclick = async () => {

    terminalPopup.style.display = "flex";
    terminalOutput.innerHTML = "";

    const bootMessages = [
        "Initializing SidSphere Terminal...",
        "Loading portfolio modules...",
        "Checking system integrity...",
        "Access granted.",
        "Welcome to SidSphere Terminal.",
        "Type help for commands."
    ];

    async function speak(text) {
        return new Promise(resolve => {

            if (!window.speechSynthesis) {
                resolve();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);

            utterance.lang = "en-US";
            utterance.rate = 1;
            utterance.pitch = 1;

            utterance.onend = resolve;

            window.speechSynthesis.speak(utterance);
        });
    }

    for (let msg of bootMessages) {

        const line = document.createElement("div");
        line.className = "terminal-boot-line";
        line.textContent = msg;

        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        await speak(msg);

        await new Promise(r => setTimeout(r, 400));
    }

    terminalInput.focus();
};

// Terminal Commands Input Handler
terminalInput.addEventListener("keydown", e => {

    if (e.key !== "Enter") return;

    const value = terminalInput.value.trim();
    const outputDiv = terminalOutput;

    if (!value) return;

    let [cmd, ...args] = value.split(" ");

    if (cmd === "clear") {
        outputDiv.innerHTML = "";
    }
    else if (cmd === "echo") {
        outputDiv.innerHTML += "\n" + args.join(" ");
    }
    else if (commands[cmd]) {
        outputDiv.innerHTML += "\n" + commands[cmd];
    }
    else {
        outputDiv.innerHTML += "\nCommand not found: " + cmd;
    }

    terminalInput.value = "";
    outputDiv.scrollTop = outputDiv.scrollHeight;
});

// Resume Download
document.getElementById("downloadResume").addEventListener("click", function () {

    let resumeUrl = "Sidharth_Resume.pdf";

    let a = document.createElement("a");
    a.href = resumeUrl;
    a.download = "Sidharth_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});