let menu = document.querySelector('.menu');

function open_close_menu() {
  menu.classList.toggle('active');
}


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

if (yesBtn) {
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

}
if (noBtn) {
  noBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

}

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

if (colorPicker) {
  colorPicker.value = selectedColor;
}

let clearAllPending = false; 

if(settingsBtn){
  settingsBtn.addEventListener('click', () => {
    popupSettings.style.display = 'flex';
  });
}


if(closeSettingsBtn) {
  closeSettingsBtn.addEventListener('click', () => {
    popupSettings.style.display = 'none';
    clearAllBtn.style.opacity = '1';
    clearAllPending = false;
  });
}
if(saveSettingsBtn) {
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
}

if(defaultColorBtn){
  defaultColorBtn.addEventListener('click', () => {
    selectedColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
    colorPicker.value = selectedColor;
    clearAllBtn.style.opacity = '1';
  });
}

if(clearAllBtn){
  clearAllBtn.addEventListener('click', () => {
    clearAllPending = true;
    clearAllBtn.style.opacity = '.6';
  });
}



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



// ==== AZKAR PAGE ====

const azkarTabs = document.querySelectorAll('.azkar');
const azkarSections = document.querySelectorAll('.azkar-items');

if (azkarTabs.length > 0) {
  azkarTabs.forEach(tab => {
    tab.addEventListener('click', () => {
  
      azkarSections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
      });

      
      azkarTabs.forEach(btn => {
        btn.classList.remove('active');
       
      });

      let targetClass = '';
      if (tab.classList.contains('sabahs')) targetClass = 'sabah';
      else if (tab.classList.contains('masaas')) targetClass = 'masaa';
      else if (tab.classList.contains('nooms')) targetClass = 'noom';
      else if (tab.classList.contains('esteqazs')) targetClass = 'esteqaz';
      else if (tab.classList.contains('azaans')) targetClass = 'azaan';

      
      const targetSection = document.querySelector(`.${targetClass}`);
      if (targetSection) {
        targetSection.style.display = 'flex';
        targetSection.classList.add('active');
      }

      // active btn 
      tab.classList.add('active');

    });
  });
}





const azkar = document.querySelectorAll('.zekr');

if (azkar.length > 0) {
  azkar.forEach(zekr => {

    // infoBtn click stops minus count
    const infoBtn = zekr.querySelector('.infoBtn');
    if (infoBtn) {
      infoBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
      
        Swal.fire({
          // title: "أصل الحديث",
          // text: zekr.getAttribute('data-hadeeth') || "",
          html: `<pre style="white-space: pre-line; text-align: center; direction: rtl;">${zekr.getAttribute('data-hadeeth') || "لم يتم إضافة الحديث بعد."}</pre>`,
          icon: "info",
          confirmButtonText: "تمام",
        });
      });
    }    



    // click on zekr --> minus 1
    zekr.addEventListener('click', () => {


      zekr.classList.add('shake');
      setTimeout(() => zekr.classList.remove('shake'), 200);



      const numberElement = zekr.querySelector('.number'); 
      let numberBefore = parseInt(numberElement.textContent);

      if (numberBefore > 0) {
        numberBefore -= 1;
        numberElement.textContent = numberBefore;
      }

      if (numberBefore <= 0) {
        zekr.style.display = 'none';
      }



      const parentContainer = zekr.closest('.azkar-items');

      if (!parentContainer) return; 


      const remainingAzkar = parentContainer.querySelectorAll('.zekr:not([style*="display: none"])');

      if (remainingAzkar.length === 0) {
        Swal.fire({
          title: "شاطر 👏",
          icon: "success",
          confirmButtonText: "تمام",
        });
      }



    });
  });
}


const resetBtn = document.getElementById('resetBtn');

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    location.reload(); 
  });
}

