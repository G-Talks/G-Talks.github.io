// ==========================================
// 1. BÖLÜM: Gı-ASİSTAN YAPAY ZEKA MOTORU
// ==========================================

const knowledgeBase = [
    // --- Selamlaşma ---
    { 
        keywords: ["merhaba", "selam", "hi", "hey", "günaydın", "iyi akşamlar"], 
        response: "Merhaba! 👋 Ben Gı-Asistan. GıTalks 2026 Teknoloji Zirvesi hakkında sana nasıl yardımcı olabilirim?" 
    },
    { 
        keywords: ["nasılsın", "naber"], 
        response: "Sanal bir asistanım ama kodlarım tıkırında çalışıyor! 🚀 Sen nasılsın?" 
    },
    { 
        keywords: ["kimsin", "nesin"], 
        response: "Ben **Gı-Asistan**. GıTalks katılımcılarına rehberlik etmek için KGTÜ öğrencileri tarafından tasarlandım. 🤖" 
    },

    // --- Etkinlik Bilgileri ---
    { 
        keywords: ["ne zaman", "tarih", "hangi gün"], 
        response: "Büyük gün **16 Şubat 2026**! Takvimine kaydetmeyi unutma. 📅" 
    },
    { 
        keywords: ["nerede", "yer", "konum", "adres", "salon"], 
        response: "Etkinliğimiz **KGTÜ (Konya Gıda ve Tarım Üniversitesi)** Konferans Salonu'nda gerçekleşecek. 📍" 
    },
    { 
        keywords: ["saat", "kaçta", "program"], 
        response: "Kapılar sabah açılacak. Detaylı saat akışını çok yakında 'Etkinlikler' sayfasından duyuracağız. ⏰" 
    },
    { 
        keywords: ["konu", "içerik", "nedir"], 
        response: "Bu seneki ana temamız **'Teknoloji'**. Yapay zeka, tarım teknolojileri ve dijital dönüşümü konuşacağız." 
    },

    // --- Bilet ve Katılım ---
    { 
        keywords: ["bilet", "ücret", "para", "kayıt", "katıl"], 
        response: "Katılım detayları ve kayıt formları yakında web sitemizden yayınlanacak. Öğrenci dostu bir etkinlik planlıyoruz! 🎟️" 
    },

    // --- İletişim ve Sponsorluk ---
    { 
        keywords: ["sponsor", "destek", "reklam"], 
        response: "Sponsorluk dosyasını talep etmek için **gitalks.official@gmail.com** adresine yazabilirsin. 💎" 
    },
    { 
        keywords: ["iletişim", "mail", "eposta", "ulaş"], 
        response: "Bize her zaman **gitalks.official@gmail.com** adresinden ulaşabilirsin. 📩" 
    },
    
    // --- Sürprizler ---
    { 
        keywords: ["kim yaptı", "tasarım", "hazırlayan", "topluluk"], 
        response: "Bu platform ve etkinlik, **KGTÜ İletişim ve Tanıtım Topluluğu** vizyonuyla hazırlanmıştır. ✨" 
    }
];

// Cevabı Bulan Fonksiyon
function findAnswer(userText) { 
    const cleanText = userText.toLowerCase();
    for (let item of knowledgeBase) {
        if (item.keywords.some(keyword => cleanText.includes(keyword))) {
            return item.response;
        }
    }
    return "Bunu henüz öğrenmedim 🤔 Ama şunları sorabilirsin: 'Ne zaman?', 'Nerede?', 'Sponsorluk' veya 'İletişim'."; 
}

// Sohbet Penceresini Aç/Kapa
function toggleChat() { 
    const ui = document.getElementById("ai-chat-interface");
    if (ui.style.display === "flex") {
        ui.style.display = "none";
    } else {
        ui.style.display = "flex";
        setTimeout(() => document.getElementById("chat-input").focus(), 100);
    }
}

// Enter Tuşu Kontrolü
function checkEnter(e) { if(e.key === "Enter") sendMessage(); }

// Mesaj Gönderme İşlemi
async function sendMessage() { 
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if(!text) return;
    
    addBubble(text, "bubble-user"); // Senin mesajın
    input.value = "";
    
    setTimeout(() => { 
        const reply = findAnswer(text);
        addBubble(reply, "bubble-bot"); // Asistanın cevabı
    }, 600);
}

// Baloncuk Ekleme (Ekrana Yazma)
function addBubble(txt, cls) { 
    const area = document.getElementById("messages-area");
    const d = document.createElement("div");
    d.className = `bubble ${cls}`;
    d.innerHTML = txt;
    area.appendChild(d);
    area.scrollTop = area.scrollHeight;
}


// ==========================================
// 2. BÖLÜM: SİTE FONKSİYONLARI (Menü, Sayaç vb.)
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    
    // --- Yan Menü (Sidebar) ---
    const sidebar = document.getElementById("mySidebar");
    const overlay = document.getElementById("menuOverlay");
    
    if(document.getElementById("openNavBtn")) {
        document.getElementById("openNavBtn").addEventListener("click", function() {
            sidebar.style.width = window.innerWidth <= 600 ? "80%" : "320px";
            overlay.style.display = "block";
        });
    }
    
    function closeNav() { 
        sidebar.style.width = "0"; 
        overlay.style.display = "none"; 
    }
    
    if(document.getElementById("closeNavBtn")) document.getElementById("closeNavBtn").addEventListener("click", closeNav);
    overlay.addEventListener("click", closeNav);

    // --- Sayfa Geçişleri (Tabs) ---
    const navLinks = document.querySelectorAll('.nav-link, .modal-link');
    const tabs = document.querySelectorAll('.tab-content');
    
    function switchTab(targetId) {
        tabs.forEach(tab => tab.style.display = 'none');
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('data-tab') === targetId) link.classList.add('active');
        });
        
        const target = document.getElementById(targetId);
        if(target) target.style.display = 'block';
        window.scrollTo(0, 0);
        closeNav(); 
    }
    
    navLinks.forEach(link => link.addEventListener('click', function(e) { 
        e.preventDefault(); 
        switchTab(this.getAttribute('data-tab')); 
    }));
    
    // Logoya Tıklayınca Anasayfaya Dön
    const mainLogo = document.getElementById('mainLogo');
    if (mainLogo) mainLogo.addEventListener('click', function() { switchTab('home-tab'); });

    // "GıTalks Teknoloji" Başlığına Tıklayınca Git
    const techTitleBtn = document.getElementById('tech-title-btn');
    if (techTitleBtn) {
        techTitleBtn.addEventListener('click', function() {
            switchTab('conferences-tab'); 
            setTimeout(() => {
                const techCard = document.getElementById('target-tech-card');
                if (techCard) {
                    techCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Dikkat çekme efekti
                    techCard.style.borderColor = "#D4AF37";
                    techCard.style.boxShadow = "0 0 30px rgba(212, 175, 55, 0.4)";
                    setTimeout(() => {
                        techCard.style.borderColor = "";
                        techCard.style.boxShadow = "";
                    }, 1500);
                }
            }, 100);
        });
    }

    // --- Akordiyon Menüler ---
    const acc = document.getElementsByClassName("accordion-btn");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active-acc");
            var panel = this.nextElementSibling;
            var inner = panel.querySelector('.panel-inner');
            
            if (panel.style.maxHeight) { 
                panel.style.maxHeight = null; 
            } else { 
                panel.style.maxHeight = inner.offsetHeight + "px"; 
            }
        });
    }

    // --- Geri Sayım Sayacı (16 Şubat 2026) ---
    const countDownDate = new Date("Feb 16, 2026 09:00:00").getTime();
    
    setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Anasayfa Sayacı
        if(document.getElementById("days")) {
            document.getElementById("days").innerText = days;
            document.getElementById("hours").innerText = hours;
            document.getElementById("minutes").innerText = minutes;
            document.getElementById("seconds").innerText = seconds;
        }

        // Etkinlik Kartı Sayacı
        if(document.getElementById("t-days")) {
            document.getElementById("t-days").innerText = days;
            document.getElementById("t-hours").innerText = hours;
            document.getElementById("t-min").innerText = minutes;
        }
    }, 1000);

    // --- Çerez (Cookie) Uyarısı ---
    const cookieBanner = document.getElementById('cookieBanner');
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => { cookieBanner.style.display = 'block'; }, 2000);
    }
    
    if(document.getElementById('btnAccept')) {
        document.getElementById('btnAccept').addEventListener('click', () => { 
            localStorage.setItem('cookieConsent', 'true'); 
            cookieBanner.style.display = 'none'; 
        });
    }
    
    if(document.getElementById('btnReject')) {
        document.getElementById('btnReject').addEventListener('click', () => { 
            cookieBanner.style.display = 'none'; 
        });
    }
});
