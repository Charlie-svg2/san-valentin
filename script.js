document.addEventListener("DOMContentLoaded", () => {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const background = document.getElementById("background");
    const card = document.querySelector(".card");
    const message = document.getElementById("message");
    const nameTitle = document.getElementById("nameTitle");
    const music = document.getElementById("music");

    /* 🎵 Música: se activa con la primera interacción */
    function iniciarMusica() {
        music.play().catch(() => {});
        document.removeEventListener("click", iniciarMusica);
        document.removeEventListener("touchstart", iniciarMusica);
    }

    document.addEventListener("click", iniciarMusica);
    document.addEventListener("touchstart", iniciarMusica);

    /* 🔗 Nombre desde el link */
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("name") || "Victoria";
    nameTitle.textContent = `${nombre} 💕`;

    /* 😈 Botón NO huye */
    const mensajes = [
        "Oye 😅",
        "Ey… espera 🙈",
        "No tan rápido 😏",
        `${nombre} 😳`,
        "Ya casi dices que sí 💕"
    ];

    function moverBotonNo() {
        const cardRect = card.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        const maxX = cardRect.width - btnRect.width - 20;
        const maxY = cardRect.height - btnRect.height - 20;

        noBtn.style.left = Math.random() * maxX + "px";
        noBtn.style.top = Math.random() * maxY + "px";

        message.textContent =
            mensajes[Math.floor(Math.random() * mensajes.length)];
    }

    noBtn.addEventListener("mouseenter", moverBotonNo);
    noBtn.addEventListener("touchstart", moverBotonNo);

    /* 💖 Botón SÍ */
    yesBtn.addEventListener("click", () => {
        document.body.innerHTML = `
            <canvas id="fireworks"></canvas>
            <div style="
                position:relative;
                z-index:5;
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                flex-direction:column;
                text-align:center;
                font-family:'Segoe UI', Arial;
                color:white;
                background:linear-gradient(135deg,#ff758c,#ff7eb3);
            ">
                <h1 style="font-size:3.2rem;">💖 ${nombre} 💖</h1>
                <p style="font-size:2rem; margin-top:15px;">
                    ¡Sabía que dirías que sí!
                </p>
                <p style="font-size:1.4rem; margin-top:10px;">
                    Feliz San Valentín 💕
                </p>
            </div>
        `;
        iniciarFuegos();
    });

    /* ❤️ Corazones */
    function crearCorazon() {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "❤";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (16 + Math.random() * 26) + "px";
        heart.style.animationDuration =
            (3 + Math.random() * 3) + "s";

        background.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }

    setInterval(crearCorazon, 280);
});

/* 🎆 Fuegos artificiales */
function iniciarFuegos() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function explosion(x, y) {
        for (let i = 0; i < 80; i++) {
            particles.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 80
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;

            ctx.fillStyle = "rgba(255,255,255,0.9)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();

            if (p.life <= 0) particles.splice(i, 1);
        });

        requestAnimationFrame(animate);
    }

    setInterval(() => {
        explosion(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.6
        );
    }, 700);

    animate();
}
