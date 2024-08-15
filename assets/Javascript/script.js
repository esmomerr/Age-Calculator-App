// Bir ayın kaç gün çektiğini hesaplayan fonksiyon
function getDaysInMonth(month, year) {
    // new Date(year, month, 0) ifadesi, belirtilen yıl ve ay için o ayın son gününü döndürür.
    // Örneğin, month=2 (Şubat) ve year=2024 verilirse, 2024 yılının Şubat ayı 29 gün çeker.
    // Bu nedenle 29 döndürülür.
    return new Date(year, month, 0).getDate();
}

// Form elemanını seçiyoruz ve ona bir 'submit' olay dinleyici ekliyoruz.
document.querySelector('.age_form').addEventListener('submit', function(e) {
    // Formun varsayılan davranışını (sayfanın yeniden yüklenmesi) engelliyoruz.
    e.preventDefault();

    // Kullanıcı tarafından girilen gün, ay ve yıl değerlerini alıyoruz.
    const day = parseInt(document.querySelector('#day').value); // Gün değeri
    const month = parseInt(document.querySelector('#month').value); // Ay değeri
    const year = parseInt(document.querySelector('#year').value); // Yıl değeri

    let isValid = true; // Girdi doğrulaması için başlangıçta geçerli kabul ediyoruz.

    // Hata mesajlarını gizliyoruz, böylece her yeni girişte temiz bir başlangıç yapılıyor.
    document.getElementById('dayError').style.visibility = 'hidden';
    document.getElementById('monthError').style.visibility = 'hidden';
    document.getElementById('yearError').style.visibility = 'hidden';

    // **Ay Doğrulaması**: Ay değeri 1 ile 12 arasında olmalıdır.
    if (month < 1 || month > 12) {
        document.getElementById('monthError').textContent = "Must be a valid month"; // Hata mesajı ayarlanıyor
        document.getElementById('monthError').style.visibility = 'visible'; // Hata mesajı görünür yapılıyor
        isValid = false; // Geçersiz giriş olarak işaretleniyor
    }

    // **Yıl Doğrulaması**: Yıl değeri içinde bulunduğumuz yıldan büyük olamaz.
    const currentYear = new Date().getFullYear(); // Geçerli yıl alınır
    if (year > currentYear) {
        document.getElementById('yearError').textContent = `Must be in the past ${currentYear}.`; // Hata mesajı ayarlanıyor
        document.getElementById('yearError').style.visibility = 'visible'; // Hata mesajı görünür yapılıyor
        isValid = false; // Geçersiz giriş olarak işaretleniyor
    }

    // **Gün Doğrulaması**: Girilen ay ve yıl için geçerli gün olup olmadığını kontrol eder.
    const daysInMonth = getDaysInMonth(month, year); // Ayın gün sayısını hesapla
    if (day < 1 || day > daysInMonth) {
        document.getElementById('dayError').textContent = `Must be a valid month`; // Hata mesajı ayarlanıyor
        document.getElementById('dayError').style.visibility = 'visible'; // Hata mesajı görünür yapılıyor
        isValid = false; // Geçersiz giriş olarak işaretleniyor
    }

    // Tüm doğrulamalar geçerse, yaş hesaplamasını yapıyoruz.
    if (isValid) {
        const today = new Date(); // Bugünün tarihini alıyoruz.
        let ageYear = today.getFullYear() - year; // Yaş yılını hesapla
        let ageMonth = today.getMonth() + 1 - month; // Yaş ayını hesapla (0 tabanlı indeksi +1 ile düzeltiyoruz)
        let ageDay = today.getDate() - day; // Yaş gününü hesapla

        // Eğer gün negatifse, önceki aydan gün ekleyip ayı bir azaltıyoruz.
        if (ageDay < 0) {
            ageMonth--; // Ayı bir azaltıyoruz
            ageDay += getDaysInMonth(month - 1, year); // Önceki ayın gün sayısını ekliyoruz
        }

        // Eğer ay negatifse, yılı bir azaltıp ayı 12 ekliyoruz.
        if (ageMonth < 0) {
            ageYear--; // Yılı bir azaltıyoruz
            ageMonth += 12; // Ayı 12 ay ekleyerek düzeltiyoruz
        }

        // Hesaplanan yıl, ay ve gün değerlerini ekrana yazdırıyoruz.
        document.querySelector('#years').textContent = ageYear;
        document.querySelector('#months').textContent = ageMonth;
        document.querySelector('#days').textContent = ageDay;
    }
});
