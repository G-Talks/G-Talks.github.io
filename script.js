// --- GITALKS GELİŞMİŞ YAPAY ZEKA MOTORU (VERSYON 2.0) ---
// Gı-Asistan'ın Beyni: Buradaki bilgileri sitene göre doldurdum.
const knowledgeBase = [
    // 1. Selamlaşma ve Genel
    { 
        keywords: ["merhaba", "selam", "hi", "hey", "günaydın", "iyi akşamlar"], 
        response: "Merhaba! 👋 Ben Gı-Asistan. GıTalks 2026 Teknoloji Zirvesi hakkında sana nasıl yardımcı olabilirim?" 
    },
    { 
        keywords: ["nasılsın", "naber", "ne var ne yok"], 
        response: "Ben sanal bir asistanım ama kodlarım harika çalışıyor! 🚀 Sen nasılsın, etkinliğe hazır mısın?" 
    },
    { 
        keywords: ["kimsin", "nesin", "adın ne"], 
        response: "Ben **Gı-Asistan**. GıTalks katılımcılarına rehberlik etmek için tasarlanmış yapay zeka tabanlı bir asistanım. 🤖" 
    },

    // 2. Etkinlik Detayları (Tarih, Yer, Zaman)
    { 
        keywords: ["ne zaman", "tarih", "hangi gün", "ayın kaçı"], 
        response: "Büyük gün **16 Şubat 2026**! Takvimine kaydetmeyi unutma. 📅" 
    },
    { 
        keywords: ["nerede", "yer", "konum", "adres", "salon", "hangi üniversite"], 
        response: "Etkinliğimiz **KGTÜ (Konya Gıda ve Tarım Üniversitesi)** Konferans Salonu'nda gerçekleşecek. 📍" 
    },
    { 
        keywords: ["saat", "kaçta", "zaman", "program"], 
        response: "Kapılar sabah açılacak, detaylı saat akışını çok yakında 'Etkinlikler' sekmesinden duyuracağız. Takipte kal! ⏰" 
    },
    { 
        keywords: ["konu", "içerik", "nedir", "ne anlatılacak"], 
        response: "Bu seneki ana temamız **'Teknoloji'**. Yapay zeka, tarım teknolojileri ve dijital dönüşümü sektörün öncüleriyle konuşacağız." 
    },

    // 3. Katılım ve Bilet
    { 
        keywords: ["bilet", "ücret", "para", "kaç tl", "kayıt", "nasıl katılırım", "giriş"], 
        response: "Katılım detayları ve kayıt formları çok yakında web sitemizden aktif edilecek. Öğrenci dostu bir etkinlik planlıyoruz! 🎟️" 
    },

    // 4. Sponsorluk ve İletişim
    { 
        keywords: ["sponsor", "destek", "reklam", "partner"], 
        response: "Platinum, Gold ve Silver sponsorlarımızı yakında açıklayacağız. Sponsorluk dosyasını talep etmek istersen **gitalks.official@gmail.com** adresine yazabilirsin. 💎" 
    },
    { 
        keywords: ["iletişim", "mail", "eposta", "ulaş", "telefon"], 
        response: "Bize resmi e-posta adresimizden ulaşabilirsin: **gitalks.official@gmail.com** 📩" 
    },

    // 5. Teknik ve Yasal
    { 
        keywords: ["kvkk", "gizlilik", "çerez", "yasal"], 
        response: "Gizlilik ve Çerez politikalarımız güncellendi. 'Hakkında' menüsünden detayları okuyabilirsin. Verilerin güvende! 🔒" 
    },
    
    // 6. Özel (Easter Eggs - Topluluk)
    { 
        keywords: ["kim yaptı", "tasarım", "hazırlayan", "topluluk", "ekip"], 
        response: "Bu platform ve etkinlik, **KGTÜ İletişim ve Tanıtım Topluluğu** üyelerinin vizyonuyla hazırlanmıştır. ✨" 
    }
];

// --- AKILLI CEVAP BULMA FONKSİYONU ---
function findAnswer(userText) { 
    const cleanText = userText.toLowerCase(); // Küçük harfe çevir
    
    // Kelime havuzunu tara
    for (let item of knowledgeBase) {
        // Eğer kullanıcının cümlesinde anahtar kelimelerden BİRİ bile geçiyorsa cevabı ver
        if (item.keywords.some(keyword => cleanText.includes(keyword))) {
            return item.response;
        }
    }
    
    // Hiçbir şey bulamazsa varsayılan cevap
    return "Bunu henüz öğrenmedim 🤔 Ama şunları sorabilirsin: 'Ne zaman?', 'Nerede?', 'Sponsorluk' veya 'İletişim'."; 
}

// --- CHAT ARAYÜZ FONKSİYONLARI ---
function toggleChat() { 
    const ui = document.getElementById("ai-chat-interface");
    // Flex ile açılıp kapanması sağlanıyor
    if (ui.style.display === "flex") {
        ui.style.display = "none";
    } else {
        ui.style.display = "flex";
        // Chat açılınca inputa odaklan
        setTimeout(() => document.getElementById("chat-input").focus(), 100);
    }
}

function checkEnter(e) { if(e.key === "Enter") sendMessage(); }

async function sendMessage() { 
    const input = document.getElementById("chat-input");
    const area = document.getElementById("messages-area");
    const text = input.value.trim();
    if(!text) return;
    
    // Kullanıcı mesajını ekle
    addBubble(text, "bubble-user");
    input.value = "";
    
    // Asistan "Yazıyor..." efekti (Kısa bir gecikme)
    setTimeout(() => { 
        const reply = findAnswer(text);
        addBubble(reply, "bubble-bot"); 
    }, 600);
}

function addBubble(txt, cls) { 
    const area = document.getElementById("messages-area");
    const d = document.createElement("div");
    d.className = `bubble ${cls}`;
    d.innerHTML = txt; // HTML etiketlerini (bold vs) desteklemesi için innerHTML
    area.appendChild(d);
    area.scrollTop = area.scrollHeight; // Otomatik en alta kaydır
}

// --- SİTE GENEL JS (NAVBAR, COUNTDOWN VS.) ---
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Sidebar ve Menu İşlemleri
    const sidebar = document.getElementById("mySidebar");
    const overlay = document.getElementById("menuOverlay");
    if(document.getElementById("openNavBtn")) {
        document.getElementById("openNavBtn").addEventListener("click", function() {
            sidebar.style.width = window.innerWidth <= 600 ? "80%" : "320px";
            overlay.style.display = "block";
        });
    }
    function closeNav() { sidebar.style.width = "0"; overlay.style.display = "none"; }
    if(document.getElementById("closeNavBtn")) document.getElementById("closeNavBtn").addEventListener("click", closeNav);
    overlay.addEventListener("click", closeNav);

    // 2. Tab Geçişleri (Sayfa Değişimi Gibi)
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
    navLinks.forEach(link => link.addEventListener('click', function(e) { e.preventDefault(); switchTab(this.getAttribute('data-tab')); }));
    
    // Logo Tıklama
    const mainLogo = document.getElementById('mainLogo');
    if (mainLogo) mainLogo.addEventListener('click', function() { switchTab('home-tab'); });

    // Teknoloji Butonu
    const techTitleBtn = document.getElementById('tech-title-btn');
    if (techTitleBtn) {
        techTitleBtn.addEventListener('click', function() {
            switchTab('conferences-tab'); 
            setTimeout(() => {
                const techCard = document.getElementById('target-tech-card');
                if (techCard) {
                    techCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

    // 3. Akordiyon Menü
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

    // 4. Geri Sayım (Countdown) - 16 Şubat 2026
    const countDownDate = new Date("Feb 16, 2026 09:00:00").getTime();
    
    setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(document.getElementById("days")) {
            document.getElementById("days").innerText = days;
            document.getElementById("hours").innerText = hours;
            document.getElementById("minutes").innerText = minutes;
            document.getElementById("seconds").innerText = seconds;
        }

        if(document.getElementById("t-days")) {
            document.getElementById("t-days").innerText = days;
            document.getElementById("t-hours").innerText = hours;
            document.getElementById("t-min").innerText = minutes;
        }
    }, 1000);

    // 5. Cookie Banner Kontrolü
    const cookieBanner = document.getElementById('cookieBanner');
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => { cookieBanner.style.display = 'block'; }, 2000);
    }
    if(document.getElementById('btnAccept')) document.getElementById('btnAccept').addEventListener('click', () => { localStorage.setItem('cookieConsent', 'true'); cookieBanner.style.display = 'none'; });
    if(document.getElementById('btnReject')) document.getElementById('btnReject').addEventListener('click', () => { cookieBanner.style.display = 'none'; });
});
