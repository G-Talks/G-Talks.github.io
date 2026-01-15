/* --- GITALKS YEREL YAPAY ZEKA MOTORU (NO-API) --- */

// 1. EĞİTİM VERİ SETİ (BİLGİ BANKASI)
const knowledgeBase = [
    {
        keywords: ["merhaba", "selam", "hi", "hey", "naber"],
        response: "Merhaba! 👋 Ben GıTalks asistanıyım. Zirve tarihi, konumu, ulaşım veya konular hakkında bana soru sorabilirsin."
    },
    {
        keywords: ["ne zaman", "tarih", "saat", "gün", "zaman", "takvim"],
        response: "📅 GıTalks Global Teknoloji Zirvesi, **16 Şubat 2026** tarihinde gerçekleşecek. Kapılar sabah saat **09:00'da** açılıyor."
    },
    {
        keywords: ["nerede", "konum", "yer", "adres", "lokasyon", "nasıl gidilir", "ulaşım", "konya"],
        response: "📍 Etkinliğimiz **Konya Gıda ve Tarım Üniversitesi (KGTÜ) Konferans Salonu'nda** düzenlenecek. Konya merkezden toplu taşıma veya özel araçla kolayca ulaşabilirsin."
    },
    {
        keywords: ["kim", "konuşmacı", "konuk", "davetli", "katılımcı"],
        response: "🎙️ Ana konuklarımız ve konuşmacı listemiz şu an **'Yakında Açıklanacak'** statüsündedir. Sektörün öncü isimleriyle görüşmelerimiz sürüyor, takipte kal!"
    },
    {
        keywords: ["ücret", "bilet", "fiyat", "para", "kayıt", "başvuru"],
        response: "🎫 Etkinlik katılım detayları ve kayıt süreçleri çok yakında web sitemiz ve sosyal medya hesaplarımızdan duyurulacaktır."
    },
    {
        keywords: ["konu", "içerik", "tema", "ne hakkında", "teknoloji", "tarım"],
        response: "GıTalks 2026'nın ana temaları şunlardır:\n🔹 **Teknoloji:** Yapay Zeka ve Dijital Dönüşüm\n🔹 **Tarım:** Sürdürülebilir Tarım Teknolojileri\n🔹 **Akademi:** Bilimsel Araştırmalar\n🔹 **Sosyal Etki:** Toplumsal Fayda Projeleri"
    },
    {
        keywords: ["sponsor", "destek", "marka"],
        response: "🤝 Sponsorluk görüşmelerimiz devam etmektedir. Vizyoner markalar çok yakında 'Sponsorlar' sekmesinde yerini alacak."
    },
    {
        keywords: ["iletişim", "mail", "eposta", "bize ulaş", "telefon", "instagram"],
        response: "📩 Bizimle resmi iletişim için **gitalks.official@gmail.com** adresini kullanabilirsin. Ayrıca bizi Instagram'da **@gitalks.official** olarak bulabilirsin."
    },
    {
        keywords: ["vizyon", "misyon", "amaç", "nedir"],
        response: "🚀 **GıTalks;** teknoloji, akademi, tarım, ekonomi ve sosyal etki alanlarında geleceği şekillendiren fikirlerin buluştuğu, üniversite öğrencileri tarafından yürütülen bağımsız bir platformdur."
    },
    {
        keywords: ["kvkk", "gizlilik", "veri", "çerez", "güvenlik"],
        response: "🔒 Sitemiz GitHub Pages altyapısını kullanır. Herhangi bir kişisel veri kaydı tutmuyoruz (form, üyelik yok). Sadece teknik çerezler çalışır."
    }
];

// 2. YEREL ZEKA FONKSİYONLARI
function findAnswer(userText) {
    const cleanText = userText.toLowerCase();
    for (let item of knowledgeBase) {
        if (item.keywords.some(keyword => cleanText.includes(keyword))) {
            return item.response;
        }
    }
    return "🤔 Bu konuda şu an net bir bilgim yok veya henüz açıklanmadı. Ancak tarih, konum veya genel vizyonumuz hakkında sorularını yanıtlayabilirim.";
}

function toggleChat() {
    const ui = document.getElementById("ai-chat-interface");
    const btn = document.getElementById("ai-btn-trigger");
    if (ui.style.display === "flex") {
        ui.style.display = "none";
        btn.style.transform = "scale(1)";
    } else {
        ui.style.display = "flex";
        btn.style.transform = "scale(0.9)";
        if(window.innerWidth > 600) document.getElementById("chat-input").focus();
    }
}

function checkEnter(e) { if(e.key === "Enter") sendMessage(); }

async function sendMessage() {
    const input = document.getElementById("chat-input");
    const area = document.getElementById("messages-area");
    const text = input.value.trim();

    if (text === "") return;

    addBubble(text, "bubble-user");
    input.value = "";

    const loadingId = "load-" + Date.now();
    const loadingBubble = document.createElement("div");
    loadingBubble.className = "bubble bubble-bot";
    loadingBubble.innerHTML = "<span style='opacity:0.6'><i>Yazıyor...</i></span>";
    loadingBubble.id = loadingId;
    area.appendChild(loadingBubble);
    area.scrollTop = area.scrollHeight;

    setTimeout(() => {
        document.getElementById(loadingId).remove();
        const response = findAnswer(text);
        addBubble(response, "bubble-bot");
    }, 600); 
}

function addBubble(txt, cls) {
    const area = document.getElementById("messages-area");
    const div = document.createElement("div");
    div.className = `bubble ${cls}`;
    div.innerHTML = txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
}
