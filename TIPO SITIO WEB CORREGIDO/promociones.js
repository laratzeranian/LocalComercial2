
// promociones.js
// Calculadora de ahorro para las promos de Casa Arturo

function formato(n){
  return "$" + n.toLocaleString('es-AR');
}

function calcPromos(){
  // Promo correas: 50% en la segunda
  {
    const cant = document.querySelector('.promo-cant[data-promo="2x1"]');
    const precio = document.querySelector('.promo-precio[data-promo="2x1"]');
    const box = document.querySelector('[data-res="2x1"]');
    if(cant && precio && box){
      const c = parseInt(cant.value)||0;
      const p = parseFloat(precio.value)||0;
      const subtotal = c * p;

      // Por cada 2 correas: la segunda va al 50%
      const parejas = Math.floor(c/2);
      const descuento = parejas * (p * 0.5);
      const total = subtotal - descuento;

      box.querySelector('.sin-desc').textContent = formato(subtotal);
      box.querySelector('.desc-aplicado').textContent = "- " + formato(descuento);
      box.querySelector('.total-final').textContent = formato(total);
    }
  }

  // Promo cambio de pila 3x2
  {
    const cant = document.querySelector('.promo-cant[data-promo="3x2"]');
    const precio = document.querySelector('.promo-precio[data-promo="3x2"]');
    const box = document.querySelector('[data-res="3x2"]');
    if(cant && precio && box){
      const c = parseInt(cant.value)||0;
      const p = parseFloat(precio.value)||0;
      const subtotal = c * p;

      // Cada 3 cambios de pila, pagás 2
      const grupos = Math.floor(c/3);
      const descuento = grupos * p; // 1 servicio bonificado por grupo de 3
      const total = subtotal - descuento;

      box.querySelector('.sin-desc').textContent = formato(subtotal);
      box.querySelector('.desc-aplicado').textContent = "- " + formato(descuento);
      box.querySelector('.total-final').textContent = formato(total);
    }
  }

  // Promo despertadores / pared: 10% off si supera 30000
  {
    const cant = document.querySelector('.promo-cant[data-promo="10off"]');
    const precio = document.querySelector('.promo-precio[data-promo="10off"]');
    const box = document.querySelector('[data-res="10off"]');
    if(cant && precio && box){
      const c = parseInt(cant.value)||0;
      const p = parseFloat(precio.value)||0;
      const subtotal = c * p;

      let descuento = 0;
      if(subtotal > 30000){
        descuento = subtotal * 0.10;
      }
      const total = subtotal - descuento;

      box.querySelector('.sin-desc').textContent = formato(subtotal);
      box.querySelector('.desc-aplicado').textContent = "- " + formato(descuento);
      box.querySelector('.total-final').textContent = formato(total);
    }
  }
}

// menú hamburguesa + año footer
function setupMenuYFooter(){
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav');
  if (toggleBtn && navMenu){
    toggleBtn.addEventListener('click', ()=>{
      navMenu.classList.toggle('open');
    });
  }
  const y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }
}

// init
document.addEventListener('DOMContentLoaded', ()=>{
  setupMenuYFooter();
  calcPromos();
  const inputs = document.querySelectorAll('.promo-cant, .promo-precio');
  inputs.forEach(i=>{
    i.addEventListener('input', calcPromos);
  });
});
