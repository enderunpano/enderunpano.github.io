// Haftalık imam ve müezzin isimleri için nesneler
const imamNames = JSON.parse(localStorage.getItem('imamNames')) || {  
    "Cumartesi": [],
    "Pazar": [],
    "Pazartesi": [],
    "Salı": [],
    "Çarşamba": [],
    "Perşembe": [],
    "Cuma": []
};  

const muezzinNames = JSON.parse(localStorage.getItem('muezzinNames')) || {
    "Cumartesi": [],
    "Pazar": [],
    "Pazartesi": [],
    "Salı": [],
    "Çarşamba": [],
    "Perşembe": [],
    "Cuma": []
};

// İmam ve müezzin isimlerini güncelleyen fonksiyon
function updateImamAndMuezzin() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const days = ["Cumartesi", "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
    const dayName = days[dayOfWeek];

    document.getElementById('imam-name').textContent = imamNames[dayName].join(', ') || "İsim yok";
    document.getElementById('muezzin-name').textContent = muezzinNames[dayName].join(', ') || "İsim yok";
}

// Tarih ve saati güncelleyen fonksiyon
function updateDateTime() {
    const now = new Date();
    const days = ["Bir", "İki", "Üç", "Dört", "Beş", "Altı", "Yedi", "Sekiz", "Dokuz", "On", "On Bir", "On İki", "On Üç", "On Dört", "On Beş", "On Altı", "On Yedi", "On Sekiz", "On Dokuz", "Yirmi", "Yirmi Bir", "Yirmi İki", "Yirmi Üç", "Yirmi Dört", "Yirmi Beş", "Yirmi Altı", "Yirmi Yedi", "Yirmi Sekiz", "Yirmi Dokuz", "Otuz", "Otuz Bir"];
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    const day = days[now.getDate() - 1];
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    document.getElementById('date').textContent = `${day} ${month} ${year}`;
    document.getElementById('time').textContent = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Slaytları yükle ve göster
function loadSlides() {
    const slides = JSON.parse(localStorage.getItem('slides')) || [];
    const slideList = document.getElementById('slide-list');
    slideList.innerHTML = '';

    slides.forEach((slide, index) => {
        const slideItem = document.createElement('div');
        slideItem.className = 'slide-item';
        slideItem.innerHTML = `
            <img src="${slide}" alt="Slide ${index + 1}">
            <button class="delete-slide-btn" data-index="${index}">Sil</button>
        `;
        slideList.appendChild(slideItem);
    });
}

// Slayt ekleme fonksiyonu
document.getElementById('add-slide-btn').addEventListener('click', () => {
    const slideInput = document.getElementById('slide-input');
    const file = slideInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgSrc = e.target.result;
            const slides = JSON.parse(localStorage.getItem('slides')) || [];
            slides.push(imgSrc);
            localStorage.setItem('slides', JSON.stringify(slides));

            loadSlides();
            slideInput.value = '';
        };
        reader.readAsDataURL(file);
    }
});

// Slayt silme işlemi
document.getElementById('slide-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-slide-btn')) {
        const index = event.target.dataset.index;
        const slides = JSON.parse(localStorage.getItem('slides')) || [];
        slides.splice(index, 1);
        localStorage.setItem('slides', JSON.stringify(slides));

        loadSlides();
    }
});

// Modal ve olay dinleyicileri
const imamMuezzinListBtn = document.getElementById('imam-muezzin-list-btn');
const imamMuezzinModal = document.getElementById('imam-muezzin-modal');
const closeImamMuezzinModal = document.getElementById('close-imam-muezzin-modal');
const saveNamesBtn = document.getElementById('save-names-btn');

imamMuezzinListBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const allImamNames = Object.values(imamNames).flat().join(', ');
    const allMuezzinNames = Object.values(muezzinNames).flat().join(', ');
    document.getElementById('imam-input').value = allImamNames; 
    document.getElementById('muezzin-input').value = allMuezzinNames; 
    imamMuezzinModal.style.display = 'block'; 
});

closeImamMuezzinModal.addEventListener('click', function() {
    imamMuezzinModal.style.display = 'none'; 
});

window.addEventListener('click', function(event) {
    if (event.target == imamMuezzinModal) {
        imamMuezzinModal.style.display = 'none'; 
    }
});

// Kaydet butonuna tıklanınca isimleri kaydet
saveNamesBtn.addEventListener('click', function() {
    const imamList = document.getElementById('imam-input').value.split(',');
    const muezzinList = document.getElementById('muezzin-input').value.split(',');

    for (const day in imamNames) {
        imamNames[day] = imamList.map(name => name.trim());
        muezzinNames[day] = muezzinList.map(name => name.trim());
    }

    localStorage.setItem('imamNames', JSON.stringify(imamNames));
    localStorage.setItem('muezzinNames', JSON.stringify(muezzinNames));

    updateImamAndMuezzin();
    imamMuezzinModal.style.display = 'none'; 
});

// Başlangıçta güncellemeleri yap
updateImamAndMuezzin();

// Tarih ve saati başlat
updateDateTime();
setInterval(updateDateTime, 1000);

// Slaytları yükle
loadSlides(); 

// Slayt gösterimi
let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000);
}

showSlides(); 

const footerYear = new Date().getFullYear();
document.querySelector('footer p').textContent = `© ${footerYear} Huzur Enderun`;

// Menü açma kapama
const toggleNavBtn = document.querySelector('.toggle-nav');
const navbar = document.getElementById('navbar');

toggleNavBtn.addEventListener('click', () => {
    navbar.classList.toggle('open');
});

const apiKey = '9985f6093632087a93bd849d207277c5'; // Buraya kendi API anahtarınızı ekleyin
const city = 'Adana'; // Hava durumunu almak istediğiniz şehir

// Hava durumunu güncelle
async function updateWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=tr&units=metric`);
        const data = await response.json();

        if (data.main) {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            document.getElementById('weather-info').innerText = `Sıcaklık: ${temperature}°C, Durum: ${description}`;
        } else {
            document.getElementById('weather-info').innerText = 'Hava durumu bilgisi alınamadı.';
        }
    } catch (error) {
        document.getElementById('weather-info').innerText = 'Hava durumu bilgisi alınamadı.';
        console.error(error);
    }
}

// Hava durumunu her 30 dakikada bir güncelle
setInterval(updateWeather, 1800000); // 30 dakika
updateWeather(); // Sayfa yüklendiğinde hava durumunu güncelle
