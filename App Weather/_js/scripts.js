$(document).ready(function() {
    
    // KEY 
    const apikey = "c324d2db18325077246f42420714738b";

    // Função assíncrona usando async/await
    async function getWeatherData(city) {   
        try {    
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&lang=pt_br&units=metric`);
            const data = await res.json();
            return data;         
        } catch (error) {
            $(".result-content").html(`<p>Erro ao buscar dados: ${error.statusText}</p>`);
        }   
    }

    // Função para mostrar o clima
    async function showWeahterData(city) {
        // Pegar os dados do clima
        const data = await getWeatherData(city);

        // Mostrar a bandeira do país
        $("#country_img").attr('src',`https://flagcdn.com/48x36/${data.sys.country.toLowerCase()}.png`);

        // Mostrar o icone do clima
        $("#weather-icon").attr('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

        // Mostrar a velocidade do vento
        $("#wind").text(`${Math.round(data.wind.speed)} km/h`);

        // Mostrar a descrição do clima
        $(".description").text(data.weather[0].description);

        // Mostrar a temperatura
        $("#temp").text(Math.round(data.main.temp));

        // Mostrar as nuvens
        $("#cloud").text(data.clouds.all);

        // Mostrar a humidade
        $("#umidity").text(data.main.humidity);

        //$("#pressure").text(data.main.pressure);
        console.log(data);
    }

    // Submit form
    $("#form-search").submit(function(e) {
        e.preventDefault();
        // Pegar o valor do campo de busca
        var city = $("#city").val();
        // Mostrar o nome da cidade
        $("#city-name").text(city);

        // Mostrar o clima
        showWeahterData(city);

        // Limpar o campo de busca
        $("#city").val('');
    });

});