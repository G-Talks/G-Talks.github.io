// --- 7. AI ASİSTAN (GELİŞMİŞ VERSİYON) ---
// HTML tarafındaki onclick="toggleChat()" vb. fonksiyonlar için global scope kullanıyoruz.

// Botun Zeka Küpü (Soru - Cevap Veritabanı)
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
        keywords: ["kimler", "konuşmacı", "konuk", "kim gelecek"],
        answers: [
            "Sektörün önde gelen isimleri bizimle olacak. Liste yakında web sitemizde ve Instagram hesabımızda açıklanacak!",
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

// CSS Stillerini Otomatik Enjekte Et (Görünüm bozulmasın diye)
function injectChatStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .typing-indicator {
            background-color: #f1f0f0;
            padding: 10px 15px;
            border-radius: 20px;
            display: inline-block;
            margin-bottom: 10px;
            font-size: 12px;
            color: #555;
            animation: fadeIn 0.3s ease;
        }
        .typing-dot {
            height: 6px;
            width: 6px;
            background-color: #888;
            border-radius: 50%;
            display: inline-block;
            margin: 0 2px;
            animation: typing 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}
// Sayfa yüklenince stilleri ekle
injectChatStyles();

// Chat Penceresini Aç/Kapa
function toggleChat() {
    const chatInterface = document.getElementById("ai-chat-interface");
    if (!chatInterface) return;
    
    if (chatInterface.style.display === "flex") {
        chatInterface.style.display = "none";
    } else {
        chatInterface.style.display = "flex";
        // Açıldığında inputa odaklan
        setTimeout(() => document.getElementById("chat-input").focus(), 100);
    }
}

// Enter Tuşu Kontrolü
function checkEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Mesaj Gönderme ve Bot Mantığı
function sendMessage() {
    const inputField = document.getElementById("chat-input");
    const messagesArea = document.getElementById("messages-area");
    const userText = inputField.value.trim();

    if (userText === "") return;

    // 1. Kullanıcı Mesajını Ekrana Bas
    addMessage(userText, 'user');
    inputField.value = ""; // Kutuyu temizle

    // 2. Bot "Yazıyor..." Efekti
    const typingElement = showTypingIndicator(messagesArea);
    messagesArea.scrollTop = messagesArea.scrollHeight;

    // 3. Cevabı Bul ve Gecikmeli Gönder
    // Rastgele düşünme süresi (1 ile 2 saniye arası)
    const thinkingTime = Math.floor(Math.random() * 1000) + 1000;

    setTimeout(() => {
        // Yazıyor efektini kaldır
        if(typingElement) typingElement.remove();

        // En uygun cevabı bul
        const botAnswer = findBestResponse(userText);
        addMessage(botAnswer, 'bot');
        
        // Sesi (opsiyonel bildirim sesi eklenebilir buraya)
    }, thinkingTime);
}

// Ekrana Mesaj Ekleme Yardımcısı
function addMessage(text, sender) {
    const messagesArea = document.getElementById("messages-area");
    const bubble = document.createElement("div");
    
    bubble.classList.add("bubble");
    bubble.classList.add(sender === 'user' ? "bubble-user" : "bubble-bot");
    bubble.innerText = text;
    
    // Animasyonlu giriş
    bubble.style.animation = "fadeIn 0.3s ease";
    
    messagesArea.appendChild(bubble);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// "Yazıyor..." Göstergesi
function showTypingIndicator(container) {
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator";
    typingDiv.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
    `;
    // Bot baloncuğu gibi sola hizalı olsun
    typingDiv.style.alignSelf = "flex-start";
    typingDiv.style.marginLeft = "10px";
    
    container.appendChild(typingDiv);
    return typingDiv;
}

// Zeki Cevap Bulma Algoritması
function findBestResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    
    // Veritabanındaki konuları tarayalım
    for (const category in botKnowledge) {
        if (category === 'default') continue; // Varsayılanı sona sakla

        const keywords = botKnowledge[category].keywords;
        
        // Kelime eşleşmesi kontrolü (some fonksiyonu: en az biri varsa true döner)
        const isMatch = keywords.some(keyword => lowerInput.includes(keyword));

        if (isMatch) {
            // O kategoriden RASTGELE bir cevap seç
            const possibleAnswers = botKnowledge[category].answers;
            const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
            return possibleAnswers[randomIndex];
        }
    }

    // Hiçbir şey bulamazsa varsayılan cevaplardan birini ver
    const defaultAnswers = botKnowledge.default.answers;
    return defaultAnswers[Math.floor(Math.random() * defaultAnswers.length)];
}
