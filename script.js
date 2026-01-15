document.addEventListener("DOMContentLoaded", function() {
    // ---------------------------------------------------------
    // 1. INTRO YÖNETİMİ (SessionStorage ile)
    // ---------------------------------------------------------
    const introOverlay = document.getElementById('intro-overlay');
    const introText = document.querySelector('.intro-text');
    
    // Tarayıcı hafızasını kontrol et: "intro_izlendi" kaydı var mı?
    if (sessionStorage.getItem('intro_izlendi') === 'true') {
        
        // EVET, DAHA ÖNCE İZLENMİŞ (Logo tıklaması veya Refresh)
        if (introOverlay) {
            // İntroyu hiç göstermeden anında gizle
            introOverlay.style.display = 'none';
            // Animasyonları durdur (Performans için)
            introOverlay.style.animation = 'none';
            if (introText) introText.style.animation = 'none';
        }
        
    } else {
        
        // HAYIR, İLK KEZ GİRİLİYOR
        // CSS animasyonları zaten otomatik başlayacak.
        
        // Animasyon süresi bitince (CSS'te toplam ~3.3sn ayarlamıştın)
        // Biz garanti olsun diye 3.5 saniye sonra elementi kaldırıyoruz.
        setTimeout(() => {
            if (introOverlay) {
                introOverlay.style.display = 'none';
            }
            // Ziyaretçinin tarayıcısına "izledi" notunu düş
            sessionStorage.setItem('intro_izlendi', 'true');
        }, 3500); // 3500 milisaniye = 3.5 saniye
    }

    // ---------------------------------------------------------
    // 2. NAVIGASYON & TAB SİSTEMİ (Menü Geçişleri)
    // ---------------------------------------------------------
    const tabLinks = document.querySelectorAll('.nav-link, .modal-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const sidebar = document.getElementById("mySidebar");
    const menuOverlay = document.getElementById("menuOverlay");

    // Sekmelere tıklayınca ne olsun?
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hangi sekmeye gitmek istiyor?
            const targetId = this.getAttribute('data-tab');

            // Tüm içerikleri gizle
            tabContents.forEach(content => {
                content.style.display = 'none';
            });

            // Hedef içeriği göster
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                // Animasyon için class ekleyip çıkarabilirsin (Opsiyonel)
                targetSection.style.animation = 'none';
                targetSection.offsetHeight; /* trigger reflow */
                targetSection.style.animation = 'fadeIn 0.8s ease-out';
            }

            // Menüyü kapat
            closeNav();
            
            // Sayfayı en üste kaydır
            window.scrollTo(0, 0);
        });
    });

    // Ana Sayfa Butonları (GıTalks Teknoloji vb. tıklayınca sekme değiştirme)
    const goToConfBtn = document.getElementById('goToConfBtn');
    if (goToConfBtn) {
        goToConfBtn.addEventListener('click', function() {
            // Konferanslar sekmesini aç
            document.querySelector('[data-tab="conferences-tab"]').click();
        });
    }

    // ---------------------------------------------------------
    // 3. SIDEBAR (YAN MENÜ) AÇ/KAPA
    // ---------------------------------------------------------
    const openNavBtn = document.getElementById("openNavBtn");
    const closeNavBtn = document.getElementById("closeNavBtn");

    function openNav() {
        if(sidebar) sidebar.style.width = "280px";
        if(menuOverlay) menuOverlay.style.display = "block";
    }

    function closeNav() {
        if(sidebar) sidebar.style.width = "0";
        if(menuOverlay) menuOverlay.style.display = "none";
    }

    if(openNavBtn) openNavBtn.addEventListener('click', openNav);
    if(closeNavBtn) closeNavBtn.addEventListener('click', closeNav);
    if(menuOverlay) menuOverlay.addEventListener('click', closeNav);


    // ---------------------------------------------------------
    // 4. AKORDİYON MENÜ (Hakkında & SSS)
    // ---------------------------------------------------------
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

    // ---------------------------------------------------------
    // 5. GERİ SAYIM SAYACI (16 Şubat 2026)
    // ---------------------------------------------------------
    const countDownDate = new Date("Feb 16, 2026 09:00:00").getTime();

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Büyük sayaç (Ana Sayfa)
        if(document.getElementById("days")) document.getElementById("days").innerText = days;
        if(document.getElementById("hours")) document.getElementById("hours").innerText = hours;
        if(document.getElementById("minutes")) document.getElementById("minutes").innerText = minutes;
        if(document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds;

        // Mini sayaç (Kart İçi)
        if(document.getElementById("t-days")) document.getElementById("t-days").innerText = days;
        if(document.getElementById("t-hours")) document.getElementById("t-hours").innerText = hours;
        if(document.getElementById("t-min")) document.getElementById("t-min").innerText = minutes;

        if (distance < 0) {
            clearInterval(x);
            // Süre dolunca yapılacak işlem
        }
    }, 1000);
    
    // ---------------------------------------------------------
    // 6. AI CHAT BOT (Gı-Asistan)
    // ---------------------------------------------------------
    window.toggleChat = function() {
        const chatInterface = document.getElementById('ai-chat-interface');
        if (chatInterface.style.display === 'flex') {
            chatInterface.style.display = 'none';
        } else {
            chatInterface.style.display = 'flex';
        }
    }

    window.checkEnter = function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    }

    window.sendMessage = function() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        const chatBody = document.getElementById('messages-area');

        if (message !== "") {
            // Kullanıcı Mesajı
            const userBubble = document.createElement('div');
            userBubble.className = 'bubble bubble-user';
            userBubble.innerText = message;
            chatBody.appendChild(userBubble);
            
            input.value = "";
            chatBody.scrollTop = chatBody.scrollHeight;

            // Basit Bot Cevabı (Simülasyon)
            setTimeout(() => {
                const botBubble = document.createElement('div');
                botBubble.className = 'bubble bubble-bot';
                
                // Basit anahtar kelime kontrolü
                let reply = "Bu konuda detaylı bilgi yakında eklenecek.";
                const lowerMsg = message.toLowerCase();

                if(lowerMsg.includes("sponsor")) reply = "Sponsorluk dosyası için gitalks.official@gmail.com adresine yazabilirsiniz.";
                else if(lowerMsg.includes("ne zaman")) reply = "Etkinliğimiz 16 Şubat 2026 tarihinde gerçekleşecek.";
                else if(lowerMsg.includes("nerede")) reply = "Etkinlik KGTÜ Konferans Salonu'nda.";
                else if(lowerMsg.includes("merhaba")) reply = "Merhaba! GıTalks hakkında ne öğrenmek istersin?";

                botBubble.innerText = reply;
                chatBody.appendChild(botBubble);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    }
});
