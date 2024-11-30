let mychart1 ;
let mychart2 ;
let  EficiencaPaneles = "";
// Definición de los electrodomésticos y su consumo en Watts
const electrodomesticos = {
    Cardadoras : 30, //30000,
    Hilanderas: 125 ,//125000,
    Bobinadoras : 10 ,//10000,
    Telares: 22.5,//22500,
    MaquinaTricotar :15 ,//15000 ,
    TejidoRectilinasCirculares :35, //35000,
    Estampado :12.5, //12.500,
    Tintura :  75 ,//75000,
    Planchado : 6.5, //6500,
    Corte : 10,//10000,
    Costura: 1.25, //1250,
    bordado: 3,//3000,
//------------------------------------------------------------------------------
    televisor: 100,              // Televisor consume 100 Watts.
    refrigerador: 150,           // Refrigerador consume 150 Watts.
    microondas: 800,             // Microondas consume 800 Watts.
    lavadora: 500,               // Lavadora consume 500 Watts.
    bombilla: 60,                // Bombilla consume 60 Watts.
    computadora: 200,            // Computadora consume 200 Watts.
    aire_acondicionado: 1500,    // Aire acondicionado consume 1500 Watts.
};

// Lista para almacenar los electrodomésticos
let listaElectrodomesticos = [];
/* 
   Se inicializa un arreglo vacío para almacenar los electrodomésticos ingresados 
   junto con sus detalles de consumo.
*/

// Agregar electrodoméstico
document.getElementById('agregar-electrodomestico').addEventListener('click', () => {
    /* 
       Se añade un evento 'click' al botón con id 'agregar-electrodomestico'. 
       Este evento se ejecuta cuando el usuario hace clic en el botón.
    */
    const electrodomestico = document.getElementById('electrodomestico').value;
    /* Obtiene el valor seleccionado del elemento <select> con id 'electrodomestico'. */
    let cantidad = Number(document.getElementById('cantidad').value);
    /* Convierte el valor del campo <input> 'cantidad' a número. */
    let horas = Number(document.getElementById('horas').value);
    /* Convierte el valor del campo <input> 'horas' a número. */
    let diasSemana = Number(document.getElementById('dias-semana').value);
    /* Convierte el valor del campo <input> 'dias-semana' a número. */
   /*  let costoKwh = Number(document.getElementById('costo-kwh').value); */
    /* Convierte el valor del campo <input> 'costo-kwh' a número. */

    if (!cantidad || !diasSemana ) { //validacion de campos
        /* 
           Valida que los campos requeridos no estén vacíos ni sean cero.
           Si alguno es inválido, muestra un mensaje de alerta.
        */
        alert('Por favor, completa todos los campos correctamente.');
        return; // Sale de la función si hay campos inválidos.
    }

    const potencia = electrodomesticos[electrodomestico]; //  va al arreglo y mira cual es su comsumo en watts
    /* Obtiene la potencia en Watts del electrodoméstico seleccionado. */
    const consumoDiario = (potencia * cantidad * horas) /1000;
    console.log("consumo diario"+consumoDiario);
    /* 
       Calcula el consumo diario en kWh:
       (Potencia en Watts * Cantidad de electrodomésticos * Horas de uso diario) / 1000.
    */
    const consumoSemanal = consumoDiario * diasSemana;
    console.log("consumo semanal"+consumoSemanal);
    /* Calcula el consumo semanal en kWh (consumo diario * días de uso semanal). */
    const consumoMensual = consumoSemanal * 4.33;
    console.log("consumo mensual"+consumoMensual);
    /* Calcula el consumo mensual aproximado (4.33 semanas por mes). */
    const consumoAnual = consumoMensual * 12;
    console.log("consumo anual"+consumoAnual);
    /* Calcula el consumo anual en kWh (12 meses por año). */

    listaElectrodomesticos.push({
        /* 
           Agrega un objeto al arreglo 'listaElectrodomesticos' que contiene:
           - Nombre del electrodoméstico.
           - Cantidad.
           - Consumo diario, mensual y anual.
        */
        nombre: electrodomestico,
        cantidad,
        consumoDiario,
        consumoMensual,
        consumoAnual,
    });

    const lista = document.getElementById('lista');
    /* Selecciona el elemento <ul> donde se listarán los electrodomésticos. */
    const li = document.createElement('li');
    /* Crea un nuevo elemento de lista (<li>). */
    li.textContent = `${cantidad} x ${electrodomestico} | Diario: ${consumoDiario.toFixed(2)} MWh | Semanal: ${diasSemana} días`;
    /* Define el contenido del elemento de lista con detalles del electrodoméstico. */
    lista.appendChild(li);
    /* Añade el nuevo elemento <li> al <ul> en el DOM. */

    cantidad = ''
    horas = ''
    diasSemana = ''
    /* costoKwh  = '' */

});

//calculo eficienca panles

document.getElementById("ConsumoPaneles").addEventListener("click",(e)=>{

    e.preventDefault()

    const boton = e.target.tagName

    if(boton === "BUTTON"){
        
        let EnergiaDiaria = "";
        let EnergiaMensual = "";
        let EficienciaTotalPaneles = "";
        let EnergiaAnual = "";
        const Eficiencia = Number(document.getElementById("Eficiencia").value)
        const Npanes = Number(document.getElementById("Npaneles").value)
        const HorasSol = Number(document.getElementById("HorasSol").value)
        EficiencaPaneles = "";
        
        EficienciaTotalPaneles = Eficiencia * Npanes 
        EnergiaDiaria = EficienciaTotalPaneles * HorasSol /1000
        EnergiaMensual = (EnergiaDiaria * 30 / 1000).toFixed(2)
        EnergiaAnual = (EnergiaDiaria * 365 / 1000).toFixed(2)
    
        EficiencaPaneles = EnergiaAnual
    
         document.getElementById("EficiencaEnpaneles").innerText = ` Eficiencia en paneles estimados en MW al año${EficiencaPaneles} MW`

    }
   

})


// Generar gráficos
document.getElementById('generar-grafico').addEventListener('click', () => {
    if(mychart1 && mychart2){

        mychart1.destroy()
        mychart2.destroy()
    }
  
    /* console.log(mychart1); */
    /* 
       Agrega un evento 'click' al botón con id 'generar-grafico'.
       Este evento genera los gráficos y muestra los resultados.
    */
    const consumoTotalAnual = listaElectrodomesticos.reduce((sum, item) => sum + item.consumoAnual, 0);
    /* 
       Calcula el consumo total anual sumando el consumo anual de cada electrodoméstico 
       en 'listaElectrodomesticos' usando el método 'reduce'.
    */
   console.log(EficiencaPaneles);
    const PorcentajePaneles = parseFloat(EficiencaPaneles)* 100 / consumoTotalAnual /100;  
    console.log(PorcentajePaneles.toFixed(2));
    const ahorroPanelesSolares = consumoTotalAnual * PorcentajePaneles;
    /* Calcula el ahorro estimado con paneles solares (80% del consumo total). */

    const etiquetas = listaElectrodomesticos.map(e => e.nombre).concat('Total');
    /* Genera un arreglo con los nombres de los electrodomésticos y añade 'Total'. */
    const datosConsumo = listaElectrodomesticos.map(e => e.consumoAnual).concat(consumoTotalAnual);
    /* Genera un arreglo con el consumo anual de cada electrodoméstico y añade el total. */
    const datosAhorro = listaElectrodomesticos.map(e => e.consumoAnual * 0.2).concat(ahorroPanelesSolares);
    /* Genera un arreglo con el ahorro de cada electrodoméstico y añade el ahorro total. */

    // Gráfico de torta
    const ctxTorta = document.getElementById('graficoConsumo').getContext('2d');

    
    
    /* Obtiene el contexto 2D del lienzo para el gráfico de torta. */
    mychart1 = new Chart(ctxTorta, {
        type: 'pie', // Define el tipo de gráfico como torta (pie chart).
        data: {
            labels: etiquetas, // Etiquetas para las secciones del gráfico.
            datasets: [{
                label: 'Consumo Anual (MWh)', // Etiqueta del conjunto de datos.
                data: datosConsumo, // Datos a graficar (consumo anual).
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#D3D3D3'],
                /* Colores asignados a cada sección del gráfico. */
            }],
        },
    });

   
    // Gráfico de barras
    const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
    /* Obtiene el contexto 2D del lienzo para el gráfico de barras. */
    mychart2 =  new Chart(ctxBarras, {
        type: 'bar', // Define el tipo de gráfico como barras.
        data: {
            labels: etiquetas, // Etiquetas para las barras.
            datasets: [
                { label: 'Consumo Anual Normal (MWh)', data: datosConsumo, backgroundColor: '#36A2EB' },
                { label: 'Ahorro con Paneles Solares (MWh)', data: datosAhorro, backgroundColor: '#FFCE56' },
            ],
            /* Dos conjuntos de datos: consumo normal y ahorro con paneles solares. */
        },
    });

    
    // Mostrar resultados
    document.getElementById('totales').innerHTML = `
        Consumo anual total: ${consumoTotalAnual.toFixed(2)} MWh<br>
        Ahorro estimado con paneles solares: ${ahorroPanelesSolares.toFixed(2)} MWh.<br>
    `;
    /* 
       Inserta en el elemento con id 'totales' los resultados calculados:
       - Consumo anual total.
       - Ahorro estimado con paneles solares.
    */
       
});
