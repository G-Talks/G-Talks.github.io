document.addEventListener("DOMContentLoaded", function() {
    // 1. HTML Elementlerini Seçelim (Sınıf isimlerin HTML ile aynı olmalı)
    const introSection = document.querySelector('.intro'); // İntro kapsayıcısı
    const mainContent = document.querySelector('.main-content'); // Ana site içeriği
    
    // Logonun HTML'de <a href="index.html" class="logo">...</a> olduğunu varsayıyorum.
    // GitHub'da sayfa yenilense bile sessionStorage silinmez (tarayıcı kapanana kadar).

    // 2. KONTROL: Kullanıcı şu anki oturumda introyu izledi mi?
    if (sessionStorage.getItem('intro_izlendi') === 'true') {
        
        // EVET İZLEMİŞ (Logoya basıp gelmiş veya sayfayı yenilemiş)
        // İntroyu anında yok et, hiç gözükmesin.
        if (introSection) {
            introSection.style.display = 'none'; 
        }
        if (mainContent) {
            mainContent.style.display = 'block'; // veya 'flex'
            mainContent.style.opacity = '1';
        }

    } else {
        
        // HAYIR İZLEMEMİŞ (Siteye yeni girdi)
        // İntro oynasın, süre bitince kapansın.
        
        // İntro süresi (Milisaniye cinsinden - Örn: 4000 = 4 saniye)
        // İntro videon veya animasyonun kaç saniye sürüyorsa burayı ona göre ayarla.
        const introSuresi = 4000; 

        setTimeout(() => {
            // İntroyu yavaşça kaybet
            if (introSection) {
                introSection.style.transition = "opacity 0.5s ease";
                introSection.style.opacity = '0';
                
                // Animasyon bitince tamamen kaldır
                setTimeout(() => {
                    introSection.style.display = 'none';
                    
                    // Ana içeriği göster
                    if (mainContent) {
                        mainContent.style.display = 'block';
                        setTimeout(() => mainContent.style.opacity = '1', 50);
                    }
                }, 500); // Opacity geçiş süresi kadar bekle
            }

            // ÖNEMLİ: İntro bitti, hafızaya "izlendi" diye not al.
            sessionStorage.setItem('intro_izlendi', 'true');

        }, introSuresi);
    }
});
