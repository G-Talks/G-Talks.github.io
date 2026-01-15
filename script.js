/* Dosya Adı: script.js
   GıTalks - Tüm Fonksiyonlar (Bot, Sayaç, Menü, Geçişler)
*/

// --- 1. GLOBAL DEĞİŞKENLER VE BOT AYARLARI ---
// HTML'den (onclick) erişilebilmesi için bu fonksiyonlar en dışta durmalı.

const botKnowledge = {
    greetings: {
        keywords: ["merhaba", "selam", "hi", "hey", "naber", "günaydın"],
        answers: [
            "Merhaba! GıTalks asistanı ben. Sana nasıl yardımcı olabilirim?",
            "Selamlar! Teknoloji ve tarım zirvesi hakkında sorun mu var?",
            "Hoş geldin! Etkinlik takvimi veya konuşmacılar hakkında bilgi verebilirim."
        ]
    },
    location: {
        keywords: ["nerede", "konum", "yer", "adres", "hangi salon", "ulaşım"],
        answers: [
            "Etkinliğimiz Konya Gıda ve Tarım Üniversitesi (KGTÜ) Konferans Salonu'nda gerçekleşecek.",
            "KGTÜ kampüsündeyiz! Konferans salonunda seni bekliyoruz. Harita için iletişim sayfasına bakabilirsin."
        ]
    },
    time: {
        keywords: ["ne zaman", "saat", "tarih", "gün", "kaçta"],
        answers: [
            "Büyük gün: 16 Şubat 2026! Kapılar 09:00'da açılıyor, ilk oturum 09:30'da.",
            "16 Şubat 2026'da görüşüyoruz. Sayaçtan kalan zamanı takip etmeyi unutma!"
        ]
    },
    tickets: {
        keywords: ["bilet", "ücret", "para", "kaç tl", "kayıt", "başvuru"],
        answers: [
            "GıTalks tamamen ücretsizdir! Ancak kontenjan sınırlı, kayıt formunu kaçırma.",
            "Para gerekmiyor, sadece ilgi gerekiyor! Katılım ücretsizdir."
        ]
    },
    sponsors: {
        keywords: ["sponsor", "destek", "reklam", "logo"],
        answers: [
            "Sponsorluk dosyamız hazır. Detaylar için 'Sponsorlar' sekmesine bakabilir veya bize mail atabilirsin.",
            "Markanızı GıTalks'ta görmek isteriz. gitalks.official@gmail.com adresinden iletişime geçebilirsiniz."
        ]
    },
    speakers: {
        keywords: ["kimler", "konuşmacı", "konuk", "kim gelecek", "atiker", "ilko"],
        answers: [
            "Atiker Yazılım, İlko İlaç ve Yazgan Mimarlık gibi sektör devleri bizimle olacak.",
            "Sürpriz konuşmacılarımız var! Sosyal medyadan bizi takip etmeyi unutma."
        ]
    },
    default: {
        answers: [
            "Bunu tam anlayamadım ama GıTalks hakkında genel soruları yanıtlayabilirim.",
            "Hmm, bu konuda henüz bilgim yok. İstersen gitalks.official@gmail.com adresine mail atabilirsin.",
            "Daha basit sorabilir misin? Mesela 'nerede' veya 'ne zaman' gibi?"
        ]
    }
};

// Botun CSS Stillerini Ekle
function injectChatStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .typing-indicator { background-color: #f1f0f0; padding: 10px 15px; border-radius: 20px; display: inline-block; margin-bottom: 10px; font-size: 12px; color: #555; animation: fadeIn 0.3s ease; }
        .typing-dot { height: 6px; width: 6px; background-color: #888; border-radius: 50%; display: inline-block; margin: 0 2px; animation: typing 1.4s infinite ease-in-out both; }
        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
}
injectChatStyles();

// Bot: Pencereyi Aç/Kapa
function toggleChat() {
    const chatInterface = document.getElementById("ai-chat-interface");
    if (!chatInterface) return;
    
    if (chatInterface.style.display === "flex") {
        chatInterface.style.display = "none";
    } else {
        chatInterface.style.display = "flex";
        setTimeout(() => {
            const input = document.getElementById("chat-input");
            if(input) input.focus();
        }, 100);
    }
}

// Bot: Enter Tuşu
function checkEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Bot: Mesaj Gönderme
function sendMessage() {
    const inputField = document.getElementById("chat-input");
    const messagesArea = document.getElementById("messages-area");
    
    if(!inputField || !messagesArea) return;
    
    const userText = inputField.value.trim();
    if (userText === "") return;

    // Kullanıcı Mesajı
    addMessage(userText, 'user');
    inputField.value = "";

    // Düşünme Efekti
    const typingElement = showTypingIndicator(messagesArea);
    messagesArea.scrollTop = messagesArea.scrollHeight;

    // 1-2 sn gecikme ile cevap
    const thinkingTime = Math.floor(Math.random() * 1000) + 1000;

    setTimeout(() => {
        if(typingElement) typingElement.remove();
        const botAnswer = findBestResponse(userText);
        addMessage(botAnswer, 'bot');
    }, thinkingTime);
}

// Bot: Ekrana Baloncuk Ekleme
function addMessage(text, sender) {
    const messagesArea = document.getElementById("messages-area");
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.classList.add(sender === 'user' ? "bubble-user" : "bubble-bot");
    bubble.innerHTML = text; // innerHTML kullandık ki link vb. eklersek çalışsın
    bubble.style.animation = "fadeIn 0.3s ease";
    messagesArea.appendChild(bubble);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Bot: ... Efekti
function showTypingIndicator(container) {
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator";
    typingDiv.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
    typingDiv.style.alignSelf = "flex-start";
    typingDiv.style.marginLeft = "10px";
    container.appendChild(typingDiv);
    return typingDiv;
}

// Bot: Cevap Bulma Mantığı
function findBestResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    for (const category in botKnowledge) {
        if (category === 'default') continue;
        const keywords = botKnowledge[category].keywords;
        const isMatch = keywords.some(keyword => lowerInput.includes(keyword));
        if (isMatch) {
            const possibleAnswers = botKnowledge[category].answers;
            return possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
        }
    }
    const defaultAnswers = botKnowledge.default.answers;
    return defaultAnswers[Math.floor(Math.random() * defaultAnswers.length)];
}


// --- 2. SAYFA YÜKLENDİKTEN SONRA ÇALIŞACAKLAR ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- INTRO ---
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.style.display = 'none';
        }, 3200);
    }

    // --- SIDEBAR ---
    const sidebar = document.getElementById("mySidebar");
    const openBtn = document.getElementById("openNavBtn");
    const closeBtn = document.getElementById("closeNavBtn");
    const menuOverlay = document.getElementById("menuOverlay");

    function openNav() {
        if(sidebar) sidebar.style.width = window.innerWidth < 600 ? "100%" : "350px";
        if(menuOverlay) menuOverlay.style.display = "block";
    }

    function closeNav() {
        if(sidebar) sidebar.style.width = "0";
        if(menuOverlay) menuOverlay.style.display = "none";
    }

    if(openBtn) openBtn.addEventListener("click", openNav);
    if(closeBtn) closeBtn.addEventListener("click", closeNav);
    if(menuOverlay) menuOverlay.addEventListener("click", closeNav);

    // --- TAB SİSTEMİ (SAYFA GEÇİŞLERİ) ---
    const navLinks = document.querySelectorAll('.nav-link, .modal-link');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        tabContents.forEach(content => content.style.display = 'none');
        navLinks.forEach(link => link.classList.remove('active'));

        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.style.display = 'block';
            window.scrollTo(0, 0);
            
            // Sidebar'daki linki aktif yap
            const activeLink = document.querySelector(`.sidebar a[data-tab="${tabId}"]`);
            if(activeLink) activeLink.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);
            closeNav();
        });
    });

    // Varsayılan Tab
    if(document.getElementById('home-tab')) {
        switchTab('home-tab');
    }

    // --- ÖZEL BUTON: ANASAYFADAKİ "GITALKS TEKNOLOJİ" TIKLAMASI ---
    const goToConfBtn = document.getElementById('goToConfBtn');
    if(goToConfBtn) {
        goToConfBtn.addEventListener('click', () => {
            switchTab('conferences-tab');
        });
    }

    // --- AKORDİYON ---
    const acc = document.getElementsByClassName("accordion-btn");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active-acc");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    // --- GERİ SAYIM ---
    const targetDate = new Date("Feb 16, 2026 09:30:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            const timerElement = document.getElementById("countdown");
            if(timerElement) timerElement.innerHTML = "<div style='font-size:1.5rem; color:#D4AF37;'>ETKİNLİK BAŞLADI!</div>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(document.getElementById("days")) document.getElementById("days").innerText = days;
        if(document.getElementById("hours")) document.getElementById("hours").innerText = hours;
        if(document.getElementById("minutes")) document.getElementById("minutes").innerText = minutes;
        if(document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds;
        
        // Mini sayaç
        if(document.getElementById("t-days")) document.getElementById("t-days").innerText = days;
        if(document.getElementById("t-hours")) document.getElementById("t-hours").innerText = hours;
        if(document.getElementById("t-min")) document.getElementById("t-min").innerText = minutes;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- ÇEREZ BANNER ---
    const cookieBanner = document.getElementById("cookieBanner");
    const btnAccept = document.getElementById("btnAccept");
    const btnReject = document.getElementById("btnReject");

    if (!localStorage.getItem("gitalks_cookie_consent")) {
        setTimeout(() => {
            if(cookieBanner) cookieBanner.style.display = "block";
        }, 2000);
    }

    if(btnAccept) {
        btnAccept.addEventListener("click", () => {
            localStorage.setItem("gitalks_cookie_consent", "accepted");
            if(cookieBanner) cookieBanner.style.display = "none";
        });
    }

    if(btnReject) {
        btnReject.addEventListener("click", () => {
            localStorage.setItem("gitalks_cookie_consent", "rejected");
            if(cookieBanner) cookieBanner.style.display = "none";
        });
    }
});
