/* ==========================================================================
   GITALKS ULTIMATE CORE ENGINE v4.0 (FINAL EDITION)
   Developed for: GıTalks 2026 Technology Summit
   Architecture: Event-Driven UI + Weighted NLP Chatbot
   ==========================================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

// --- ANA UYGULAMA YÖNETİCİSİ ---
const App = {
    init: function() {
        console.log("🚀 GıTalks System Initialized...");
        
        // Modülleri Başlat
        UI.init();
        Navigation.init();
        Countdown.init();
        Chatbot.init();
        Compliance.init();
        Effects.init();
    }
};

/* ==========================================================================
   1. CHATBOT BEYNİ (NLP ENGINE & KNOWLEDGE BASE)
   ==========================================================================
*/
const KnowledgeBase = [
    // --- KİMLİK & SELAMLAŞMA ---
    {
        id: "greeting",
        keywords: ["merhaba", "selam", "hi", "hey", "günaydın", "iyi akşamlar", "başla", "test"],
        response: "Merhaba! 👋 Ben Gı-Asistan. GıTalks 2026 Teknoloji Zirvesi için sana nasıl yardımcı olabilirim?",
        followUp: ["📅 Ne zaman?", "📍 Nerede?", "🎟️ Bilet al"]
    },
    {
        id: "status",
        keywords: ["nasılsın", "naber", "ne var ne yok", "iyi misin"],
        response: "Sanal bir varlık olarak harikayım! 🚀 Kodlarım tıkırında işliyor. Sen nasılsın, etkinliğe hazır mısın?",
        followUp: null
    },
    {
        id: "identity",
        keywords: ["kimsin", "nesin", "sen kimsin", "robot musun", "bot musun", "yapay zeka"],
        response: "Ben **Gı-Asistan**. KGTÜ İletişim ve Tanıtım Topluluğu tarafından geliştirilmiş, katılımcılara rehberlik eden yapay zeka tabanlı bir asistanım. 🤖",
        followUp: null
    },
    {
        id: "creators",
        keywords: ["kim yaptı", "kurucu", "kim hazırladı", "başkan", "yönetim", "ekip", "topluluk"],
        response: "Bu dev organizasyonun arkasında **KGTÜ İletişim ve Tanıtım Topluluğu**'nun vizyoner öğrencileri var. Biz büyük bir aileyiz! ❤️",
        followUp: ["🤝 Sponsorluk", "📅 Etkinlikler"]
    },

    // --- ETKİNLİK DETAYLARI (TEMEL) ---
    {
        id: "date",
        keywords: ["ne zaman", "tarih", "hangi gün", "ayın kaçı", "hangi yıl", "saat kaçta", "zaman", "takvim"],
        response: "Büyük gün **16 Şubat 2026**! 📅 Kapılar sabah 09:00'da açılıyor, etkinlik 17:00'ye kadar sürecek.",
        followUp: ["📍 Konum at", "🎟️ Ücretli mi?"]
    },
    {
        id: "location",
        keywords: ["nerede", "yer", "konum", "lokasyon", "adres", "hangi salon", "hangi üniversite", "mekan", "kampüs"],
        response: "Zirvemiz **Konya Gıda ve Tarım Üniversitesi (KGTÜ)** Konferans Salonu'nda gerçekleşecek. Meram'ın kalbindeyiz! 📍",
        followUp: ["🚗 Otopark var mı?", "🚌 Ulaşım"]
    },
    {
        id: "transport",
        keywords: ["nasıl giderim", "ulaşım", "otobüs", "dolmuş", "tramvay", "yol tarifi"],
        response: "KGTÜ'ye ulaşım çok kolay! 🚌 Meram Yeniyol güzergahındaki tüm otobüs ve dolmuşlar kampüs önünden geçer. Şehir merkezine sadece 10 dk mesafedeyiz.",
        followUp: ["📍 Konum göster"]
    },
    {
        id: "parking",
        keywords: ["otopark", "park", "araba", "araç", "park yeri"],
        response: "Evet, kampüsümüzde misafirlerimiz için **ücretsiz otopark** alanımız mevcuttur. 🚗",
        followUp: null
    },

    // --- İÇERİK & KATILIM ---
    {
        id: "topic",
        keywords: ["konu", "içerik", "tema", "ne anlatılacak", "amaç", "nedir", "konsept"],
        response: "Zirvenin ana teması: **'Geleceğin Teknolojileri ve Tarım 5.0'**. Yapay zeka, sürdürülebilirlik ve girişimcilik ekosistemini konuşacağız.",
        followUp: ["🎤 Konuşmacılar"]
    },
    {
        id: "ticket",
        keywords: ["bilet", "ücret", "para", "kaç tl", "fiyat", "kayıt", "başvuru", "katılım", "nasıl katılırım", "giriş"],
        response: "Müjde! 🎉 GıTalks 2026 tamamen **ÜCRETSİZDİR**. Ancak kontenjan sınırlı olduğu için yakında açılacak kayıt formunu doldurman gerekecek.",
        followUp: ["🔔 Kayıt ne zaman?"]
    },
    {
        id: "certificate",
        keywords: ["sertifika", "belge", "katılım belgesi", "sertifika var mı", "cv"],
        response: "Kesinlikle! 🎓 Etkinliğe tam katılım sağlayan herkese, CV'nizde kullanabileceğiniz **Dijital Katılım Sertifikası** (QR kodlu) verilecektir.",
        followUp: null
    },
    {
        id: "online",
        keywords: ["online", "çevrimiçi", "canlı yayın", "youtube", "zoom", "uzaktan"],
        response: "Etkinliğimiz fiziksel katılım odaklıdır ancak ana oturumlar YouTube kanalımızdan canlı yayınlanacaktır. 📹",
        followUp: null
    },

    // --- LOJİSTİK & İMKANLAR ---
    {
        id: "food",
        keywords: ["yemek", "yiyecek", "içecek", "ikram", "kahve", "çay", "öğle yemeği", "açım"],
        response: "Endişelenme, aç kalmayacaksın! ☕ Zirve aralarında kahve molaları ve atıştırmalık ikramlarımız olacak. Ayrıca kampüs kafeteryası da hizmetinizde.",
        followUp: null
    },
    {
        id: "wifi",
        keywords: ["internet", "wifi", "wi-fi", "şifre", "bağlantı"],
        response: "Tüm katılımcılar için etkinlik alanında **ücretsiz misafir Wi-Fi** ağı (KGTU-Guest) açık olacaktır. 📶",
        followUp: null
    },
    {
        id: "dresscode",
        keywords: ["kıyafet", "ne giyeyim", "giyim", "takım elbise", "dress code"],
        response: "Resmi bir zorunluluk yok! 'Smart Casual' (Şık-Rahat) giyim tarzını öneriyoruz. Kendini nasıl rahat hissediyorsan öyle gel. 👔👟",
        followUp: null
    },

    // --- SPONSORLUK & İŞ BİRLİĞİ ---
    {
        id: "sponsor",
        keywords: ["sponsor", "destek", "reklam", "partner", "iş birliği", "stand"],
        response: "Markanızı GıTalks'ta görmek isteriz! 💎 Sponsorluk dosyasını talep etmek için **gitalks.official@gmail.com** adresine mail atabilirsiniz.",
        followUp: ["📧 Mail at"]
    },
    {
        id: "contact",
        keywords: ["iletişim", "mail", "eposta", "telefon", "adres", "ulaş"],
        response: "Resmi iletişim kanalımız: **gitalks.official@gmail.com**. Ayrıca Instagram üzerinden DM atabilirsiniz. 📩",
        followUp: null
    }
];

const Chatbot = {
    isOpen: false,
    elements: {},

    init: function() {
        this.elements = {
            interface: document.getElementById("ai-chat-interface"),
            trigger: document.getElementById("ai-btn-trigger"),
            input: document.getElementById("chat-input"),
            area: document.getElementById("messages-area"),
            sendBtn: document.getElementById("chat-send"),
            closeBtn: document.querySelector(".chat-close")
        };

        this.bindEvents();
    },

    bindEvents: function() {
        // Trigger butonu (Robot simgesi)
        if(this.elements.trigger) {
            this.elements.trigger.addEventListener("click", () => this.toggle());
        }

        // Kapatma butonu (X)
        if(this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener("click", () => this.toggle());
        }

        // Gönder butonu
        if(this.elements.sendBtn) {
            this.elements.sendBtn.addEventListener("click", () => this.sendMessage());
        }

        // Enter tuşu
        if(this.elements.input) {
            this.elements.input.addEventListener("keypress", (e) => {
                if(e.key === "Enter") this.sendMessage();
            });
        }
    },

    toggle: function() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.elements.interface.style.display = "flex";
            setTimeout(() => this.elements.input.focus(), 100);
            
            // İlk açılış kontrolü
            if (this.elements.area.children.length === 1) { // Sadece varsayılan mesaj varsa
                this.addChips(["📍 Nerede?", "📅 Ne zaman?", "🎟️ Ücretli mi?", "💎 Sponsorluk"]);
            }
        } else {
            this.elements.interface.style.display = "none";
        }
    },

    // --- NLP MOTORU: AKILLI EŞLEŞTİRME ---
    findAnswer: function(userText) {
        const cleanText = userText.toLocaleLowerCase('tr-TR');
        let bestMatch = null;
        let maxScore = 0;

        KnowledgeBase.forEach(item => {
            let score = 0;
            // Her anahtar kelime için kontrol
            item.keywords.forEach(keyword => {
                if (cleanText.includes(keyword)) {
                    score += keyword.length; // Uzun kelimeler daha değerli (örn: "bilet" > "al")
                    
                    // Tam eşleşme bonusu
                    if(cleanText === keyword) score += 10;
                }
            });

            if (score > maxScore) {
                maxScore = score;
                bestMatch = item;
            }
        });

        // Eşik değeri (Alakasız şeylere cevap vermesin)
        if (maxScore > 2) {
            return bestMatch;
        } else {
            return null;
        }
    },

    sendMessage: async function(textOverride = null) {
        const text = textOverride || this.elements.input.value.trim();
        if (!text) return;

        // Kullanıcı balonunu güvenli şekilde (metin olarak) ekle
        this.addTextBubble(text, "bubble-user");
        this.elements.input.value = "";
        this.scrollToBottom();

        // Yazıyor efekti...
        const typingId = this.showTyping();

        // Yapay zeka düşünme süresi (Simülasyon)
        const delay = Math.floor(Math.random() * 800) + 600;

        setTimeout(() => {
            this.removeTyping(typingId);
            
            const match = this.findAnswer(text);
            
            if (match) {
                this.addBubble(match.response, "bubble-bot");
                if (match.followUp) {
                    this.addChips(match.followUp);
                }
            } else {
                // Anlamadım durumu
                this.addBubble("Bunu tam anlayamadım 🤔 Ama şunları sorabilirsin:", "bubble-bot");
                this.addChips(["Sertifika var mı?", "Yemek verilecek mi?", "Program akışı"]);
            }
            
            this.scrollToBottom();
        }, delay);
    },

    addTextBubble: function(text, className) {
        const div = document.createElement("div");
        div.className = `bubble ${className}`;
        div.textContent = text;
        this.elements.area.appendChild(div);
    },

    addBubble: function(html, className) {
        const div = document.createElement("div");
        div.className = `bubble ${className}`;
        div.innerHTML = html;
        this.elements.area.appendChild(div);
    },

    addChips: function(options) {
        const container = document.createElement("div");
        container.style.cssText = "display:flex; gap:8px; flex-wrap:wrap; margin:10px 0 10px 10px; justify-content:flex-start;";
        
        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.innerText = opt;
            // JS içinde inline style ile hızlı stil (CSS'e dokunmadan)
            btn.style.cssText = "background:rgba(212, 175, 55, 0.1); border:1px solid #D4AF37; color:#D4AF37; padding:6px 12px; border-radius:15px; cursor:pointer; font-size:0.8rem; transition:0.3s;";
            
            btn.onmouseover = () => { btn.style.background = "#D4AF37"; btn.style.color = "#000"; };
            btn.onmouseout = () => { btn.style.background = "rgba(212, 175, 55, 0.1)"; btn.style.color = "#D4AF37"; };
            
            btn.onclick = () => {
                // Emojileri temizle ve sorguyu gönder
                const query = opt.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
                this.sendMessage(query);
            };
            
            container.appendChild(btn);
        });
        
        this.elements.area.appendChild(container);
    },

    showTyping: function() {
        const id = "typing-" + Date.now();
        const div = document.createElement("div");
        div.id = id;
        div.className = "bubble bubble-bot";
        div.style.fontStyle = "italic";
        div.style.opacity = "0.7";
        div.innerHTML = "<span>.</span><span>.</span><span>.</span>";
        this.elements.area.appendChild(div);
        this.scrollToBottom();
        return id;
    },

    removeTyping: function(id) {
        const el = document.getElementById(id);
        if(el) el.remove();
    },

    scrollToBottom: function() {
        this.elements.area.scrollTop = this.elements.area.scrollHeight;
    }
};

/* ==========================================================================
   2. GERİ SAYIM MOTORU (ROBUST COUNTDOWN)
   ==========================================================================
*/
const Countdown = {
    targetDate: new Date("Feb 16, 2026 09:00:00").getTime(),
    
    init: function() {
        this.startTimer();
    },

    startTimer: function() {
        // Her saniye güncelle
        setInterval(() => {
            const now = new Date().getTime();
            const distance = this.targetDate - now;

            // Zaman doldu mu?
            if (distance < 0) {
                this.updateDOM(0, 0, 0, 0);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.updateDOM(days, hours, minutes, seconds);
        }, 1000);
    },

    updateDOM: function(d, h, m, s) {
        // Ana Sayaç
        if(document.getElementById("days")) {
            document.getElementById("days").innerText = d < 10 ? "0" + d : d;
            document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
            document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
            document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
        }

        // Kart Üzerindeki Mini Sayaç
        if(document.getElementById("t-days")) {
            document.getElementById("t-days").innerText = d;
            document.getElementById("t-hours").innerText = h;
            document.getElementById("t-min").innerText = m;
        }
    }
};

/* ==========================================================================
   3. UI & NAVİGASYON YÖNETİMİ
   ==========================================================================
*/
const Navigation = {
    init: function() {
        this.handleSidebar();
        this.handleTabs();
        this.handleAccordion();
        this.handleScrollNavbar();
    },

    handleSidebar: function() {
        const sidebar = document.getElementById("mySidebar");
        const overlay = document.getElementById("menuOverlay");
        const openBtn = document.getElementById("openNavBtn");
        const closeBtn = document.getElementById("closeNavBtn");

        if(openBtn) {
            openBtn.addEventListener("click", () => {
                sidebar.style.width = window.innerWidth <= 600 ? "85%" : "320px";
                overlay.style.display = "block";
            });
        }

        const closeMenu = () => {
            sidebar.style.width = "0";
            overlay.style.display = "none";
        };

        if(closeBtn) closeBtn.addEventListener("click", closeMenu);
        overlay.addEventListener("click", closeMenu);
    },

    handleTabs: function() {
        const navLinks = document.querySelectorAll('.nav-link, .modal-link');
        const tabs = document.querySelectorAll('.tab-content');
        const sidebar = document.getElementById("mySidebar");
        const overlay = document.getElementById("menuOverlay");

        // Logo Tıklama
        const mainLogo = document.getElementById('mainLogo');
        if (mainLogo) {
            mainLogo.addEventListener('click', () => this.switchTab('home-tab', tabs, navLinks));
        }

        // Teknoloji Butonu (Anasayfadaki)
        const techBtn = document.getElementById('tech-title-btn');
        if(techBtn) {
            techBtn.addEventListener('click', () => {
                this.switchTab('conferences-tab', tabs, navLinks);
                // Karta kaydır ve vurgula
                setTimeout(() => {
                    const card = document.getElementById('target-tech-card');
                    if(card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.style.transition = "0.5s";
                        card.style.borderColor = "#D4AF37";
                        card.style.boxShadow = "0 0 40px rgba(212, 175, 55, 0.5)";
                        setTimeout(() => {
                            card.style.borderColor = "";
                            card.style.boxShadow = "";
                        }, 2000);
                    }
                }, 100);
            });
        }

        // Linklere Tıklama
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-tab');
                this.switchTab(targetId, tabs, navLinks);
                
                // Mobilde menüyü kapat
                sidebar.style.width = "0";
                overlay.style.display = "none";
            });
        });
    },

    switchTab: function(targetId, tabs, links) {
        // Tüm tabları gizle
        tabs.forEach(tab => {
            tab.style.display = 'none';
            tab.style.opacity = '0'; // Fade out efekti için
        });

        // Link aktiflik durumunu güncelle
        links.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('data-tab') === targetId) link.classList.add('active');
        });

        // Hedef tabı göster
        const target = document.getElementById(targetId);
        if(target) {
            target.style.display = 'block';
            // Küçük bir gecikmeyle opacity artır (CSS transition tetiklensin)
            setTimeout(() => {
                target.style.opacity = '1';
                target.style.transition = 'opacity 0.5s ease-in-out';
            }, 10);
            window.scrollTo(0, 0);
        }
    },

    handleAccordion: function() {
        const acc = document.getElementsByClassName("accordion-btn");
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active-acc");
                const panel = this.nextElementSibling;
                const inner = panel.querySelector('.panel-inner');
                
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = inner.offsetHeight + "px";
                }
            });
        }
    },

    handleScrollNavbar: function() {
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = "rgba(0, 0, 0, 0.95)";
                navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
            } else {
                navbar.style.background = "rgba(3, 3, 3, 0.85)";
                navbar.style.boxShadow = "none";
            }
        });
    }
};

/* ==========================================================================
   4. YASAL UYUMLULUK (COOKIES)
   ==========================================================================
*/
const Compliance = {
    init: function() {
        const banner = document.getElementById('cookieBanner');
        const btnAccept = document.getElementById('btnAccept');
        const btnReject = document.getElementById('btnReject');

        // Daha önce kabul edildi mi?
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                if(banner) banner.style.display = 'block';
            }, 2500);
        }

        if(btnAccept) {
            btnAccept.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'true');
                banner.style.display = 'none';
            });
        }

        if(btnReject) {
            btnReject.addEventListener('click', () => {
                // Reddedilirse session süresince sorma ama kaydetme
                banner.style.display = 'none';
            });
        }
    }
};

/* ==========================================================================
   5. GÖRSEL EFEKTLER (SCROLL ANIMATIONS)
   ==========================================================================
*/
const Effects = {
    init: function() {
        // Intersection Observer ile elementler ekrana girdikçe efekt verelim
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target); // Sadece bir kez çalışsın
                }
            });
        }, observerOptions);

        // Efekt uygulanacak elementleri seç
        const animatedElements = document.querySelectorAll('.conf-card, .sponsor-box-new, .info-box');
        
        animatedElements.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.8s ease-out";
            observer.observe(el);
        });
    }
};

// --- GLOBAL UI HELPERS ---
const UI = {
    init: function() {
        // Tab dışına tıklanırsa vs. genel olaylar
        document.body.style.opacity = 1; 
    }
};
