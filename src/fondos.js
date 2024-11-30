document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.header__energia');
    const body = document.body;
  
    const colors = {
      solar: '#C7E3E1', // Color suave para energía solar
      eolica: '#E0A18B', // Color suave para energía eólica
      hidroelectrica: '#C8CFE3', // Color suave para energía hidroeléctrica
      biomasa: '#C5DFC6', // Color suave para energía de biomasa
      geotermica: '#A0A0A0' // Color suave para energía geotérmica
    };
  
    function changeBackgroundColor() {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
          const id = section.id;
          if (id.includes('header__solar')) {
            body.style.backgroundColor = colors.solar;
          } else if (id.includes('header__eolica')) {
            body.style.backgroundColor = colors.eolica;
          } else if (id.includes('header__hidroelectrica')) {
            body.style.backgroundColor = colors.hidroelectrica;
          } else if (id.includes('header__biomasa')) {
            body.style.backgroundColor = colors.biomasa;
          } else if (id.includes('header__geotermica')) {
            body.style.backgroundColor = colors.geotermica;
          }
        }
      });
    }
  
    window.addEventListener('scroll', changeBackgroundColor);
    window.addEventListener('resize', changeBackgroundColor);
    changeBackgroundColor(); // Llama a la función al cargar la página
  });