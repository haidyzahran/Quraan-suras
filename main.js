const suras = document.querySelectorAll('.sura');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popupText');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
let currentSura = null;

let savedSuras = JSON.parse(localStorage.getItem('suras')) || [];


suras.forEach(sura => {
  const name = sura.dataset.name;
  const found = savedSuras.find(item => item.name === name);

  if (found && found.active) {
    sura.classList.add('active');
    const activeColor = localStorage.getItem('suraColor') || '#ff8716';
    sura.style.backgroundColor = activeColor;
    sura.style.border = `2px solid ${activeColor}`;
  }


  sura.addEventListener('click', () => {
    currentSura = sura;
    const isActive = sura.classList.contains('active');
    popupText.textContent = isActive ? "أشيل اللون ؟" : "ألونها ؟";
    popup.style.display = 'flex';
  });
});


yesBtn.addEventListener('click', () => {
  if (!currentSura) return;

  const name = currentSura.dataset.name;
  const index = savedSuras.findIndex(item => item.name === name);
  const isActive = currentSura.classList.contains('active');
  const selectedColor = localStorage.getItem('suraColor') || '#ff8716';

  if (isActive) {
    currentSura.classList.remove('active');
    currentSura.style.backgroundColor = '#fff';
    currentSura.style.border = '1px solid #e5e5e5d5';
    if (index !== -1) savedSuras[index].active = false;
    else savedSuras.push({ name, active: false });
  } else {
    currentSura.classList.add('active');
    currentSura.style.backgroundColor = selectedColor;
    currentSura.style.border = `1px solid ${selectedColor}`;
    if (index !== -1) savedSuras[index].active = true;
    else savedSuras.push({ name, active: true });
  }

  localStorage.setItem('suras', JSON.stringify(savedSuras));
  popup.style.display = 'none';
});


noBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});



// popup-settings


const settingsBtn = document.getElementById('settingsBtn');
const popupSettings = document.getElementById('popup-settings');
const colorPicker = document.getElementById('colorPicker');
const defaultColorBtn = document.getElementById('defaultColorBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');

let selectedColor = localStorage.getItem('suraColor') ||
  getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();

colorPicker.value = selectedColor;

let clearAllPending = false; 


settingsBtn.addEventListener('click', () => {
  popupSettings.style.display = 'flex';
});


closeSettingsBtn.addEventListener('click', () => {
  popupSettings.style.display = 'none';
  clearAllBtn.style.opacity = '1';
  clearAllPending = false;
});


saveSettingsBtn.addEventListener('click', () => {
  if (clearAllPending) {
    clearAllSuras(); 
  } else {
    
    selectedColor = colorPicker.value;
    localStorage.setItem('suraColor', selectedColor);
    document.querySelectorAll('.sura.active').forEach(sura => {
      sura.style.backgroundColor = selectedColor;
      sura.style.border = `1px solid ${selectedColor}`;
    });
  }

  popupSettings.style.display = 'none';
  clearAllPending = false;
  clearAllBtn.style.opacity = '1';
});


defaultColorBtn.addEventListener('click', () => {
  selectedColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
  colorPicker.value = selectedColor;
  clearAllBtn.style.opacity = '1';
});


clearAllBtn.addEventListener('click', () => {
  clearAllPending = true;
  clearAllBtn.style.opacity = '.6';
});




function clearAllSuras() {
  
  document.querySelectorAll('.sura').forEach(sura => {
    sura.classList.remove('active');
    sura.style.backgroundColor = '#fff';
    sura.style.border = '1px solid #e5e5e5d5';
  });
  clearAllBtn.style.opacity = '1';

  savedSuras = [];
  localStorage.removeItem('suras');
}