document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. INTRO KONTROLÜ (SessionStorage) ---
    const introOverlay = document.getElementById('intro-overlay');
    
    // Tarayıcıya sor: Daha önce izlendi mi?
    if (sessionStorage.getItem('intro_izlendi') === 'true') {
        // EVET -> İntroyu anında yok et
        if (introOverlay) {
            introOverlay.style.display = 'none';
            introOverlay.style.animation = 'none';
        }
    } else {
        // HAYIR -> İlk giriş. İntro oynasın, sonra kapansın.
        setTimeout(() => {
            if (introOverlay) introOverlay.style.display = 'none';
            // İzledi olarak işaretle
            sessionStorage.setItem('intro_izlendi', 'true');
        }, 3300); // 3.3 saniye bekle
    }

    // --- 2. MENU VE SEKME GEÇİŞLERİ ---
    const tabLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const sidebar = document.getElementById("mySidebar");
    const menuOverlay = document.getElementById("menuOverlay");

    // Sekme Değiştirme Fonksiyonu
    function switchTab(tabId) {
        // Tüm içerikleri gizle
        tabContents.forEach(content => content.style.display = 'none');
        
        // İstenen içeriği göster
        const target = document.getElementById(tabId);
        if (target) {
            target.style.display = 'block';
            target.style.animation = 'none';
            target.offsetHeight; /* refresh */
            target.style.animation = 'fadeIn 0.8s ease-out';
        }
        window.scrollTo(0, 0);
    }

    // Linklere Tıklama Olayı
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-tab');
            switchTab(targetId);
            closeNav(); // Menüyü kapat
        });
    });

    // Ana Sayfadaki "Teknoloji" kutusuna tıklayınca Etkinliklere git
    const confBtn = document.getElementById('goToConfBtn');
    if (confBtn) {
        confBtn.addEventListener('click', function() {
            switchTab('conferences-tab');
        });
    }

    // Yan Menü Aç/Kapa
    window.openNav = function() { 
        if(sidebar) sidebar.style.width = "280px";
        if(menuOverlay) menuOverlay.style.display = "block";
    }
    window.closeNav = function() {
        if(sidebar) sidebar.style.width = "0";
        if(menuOverlay) menuOverlay.style.display = "none";
    }

    document.getElementById("openNavBtn").addEventListener('click', function(){
        if(sidebar) sidebar.style.width = "280px";
        if(menuOverlay) menuOverlay.style.display = "block";
    });
    document.getElementById("closeNavBtn").addEventListener('click', closeNav);
    menuOverlay.addEventListener('click', closeNav);

    // --- 3. AKORDİYON (Hakkında) ---
    const acc = document.getElementsByClassName("accordion-btn");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active-acc");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) panel.style.maxHeight = null;
            else panel.style.maxHeight = panel.scrollHeight + "px";
        });
    }

    // --- 4. GERİ SAYIM (16 Şubat 2026) ---
    const countDownDate = new Date("Feb 16, 2026 09:00:00").getTime();
    setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        if(document.getElementById("days")) document.getElementById("days").innerText = d;
        if(document.getElementById("hours")) document.getElementById("hours").innerText = h;
        if(document.getElementById("minutes")) document.getElementById("minutes").innerText = m;
        if(document.getElementById("seconds")) document.getElementById("seconds").innerText = s;
    }, 1000);

    // --- 5. AI CHAT ---
    window.toggleChat = function() {
        const chat = document.getElementById('ai-chat-interface');
        chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
    }
    
    window.sendMessage = function() {
        const input = document.getElementById('chat-input');
        const msg = input.value.trim();
        const area = document.getElementById('messages-area');
        
        if(msg) {
            // Kullanıcı
            const uDiv = document.createElement('div');
            uDiv.className = 'bubble bubble-user';
            uDiv.innerText = msg;
            area.appendChild(uDiv);
            input.value = '';
            area.scrollTop = area.scrollHeight;

            // Bot (Basit cevap)
            setTimeout(() => {
                const bDiv = document.createElement('div');
                bDiv.className = 'bubble bubble-bot';
                bDiv.innerText = "Bu konuda yakında bilgi vereceğim.";
                if(msg.toLowerCase().includes("sponsor")) bDiv.innerText = "Sponsorluk için: gitalks.official@gmail.com";
                area.appendChild(bDiv);
                area.scrollTop = area.scrollHeight;
            }, 800);
        }
    }
    window.checkEnter = function(e) { if(e.key === 'Enter') sendMessage(); }
});
