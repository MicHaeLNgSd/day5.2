<template>
    <div id="info">
        <div class="container" v-if ="this.weatherData?.name">
            <table>
                <tr>
                    <td>{{this.weatherData.name}}<br></td>
                    <td>{{this.weatherData.sys.country}}</td>
                    <td> [{{this.weatherData.coord.lon}};{{this.weatherData.coord.lat}}]<br></td>
                </tr>
                <tr>
                    <td><img src="https://img.icons8.com/fluency/48/null/blur.png"/><br></td>
                    <td><p>humidity</p></td>
                    <td>{{this.weatherData.main.humidity}}<br></td>
                </tr>
                <tr>
                    <td><img src="https://img.icons8.com/external-flat-vol-2-vectorslab/68/null/external-Thermometer-power-and-energy-flat-vol-2-vectorslab.png"/><br></td>
                    <td><p>temp</p></td>
                    <td>{{this.weatherData.main.temp}}℃<br></td>
                </tr>
                <tr>
                    <td><img src="https://img.icons8.com/fluency/48/null/partly-cloudy-day.png"/><br></td>
                    <td><p>main</p></td>
                    <td>{{this.weatherData.weather[0].main}}<br></td>
                </tr>
                <tr>
                    <td><img src="https://img.icons8.com/external-fauzidea-flat-fauzidea/64/null/external-fog-weather-fauzidea-flat-fauzidea.png"/><br></td>
                    <td><p>pressure</p></td>
                    <td>{{this.weatherData.main.pressure}} hpa<br></td>
                </tr>
                <tr>
                    <td><img src="https://img.icons8.com/external-tulpahn-flat-tulpahn/64/null/external-cloudy-weather-tulpahn-flat-tulpahn.png"/><br></td>
                    <td><p>descripttion</p></td>
                    <td>{{this.weatherData.weather[0].description}}<br></td>
                </tr>
            </table>
        </div>
    </div>
</template>
 
<script>
  export default {
    props: ['city'],
    data(){
        return{
            weatherData:{},
            addCity:'',
            userCityArr:[],

            API_KEY: '7914d5a440960cfd5df3bd0388a7ad0f',

            selectedCity:'',

            coord:{
                lat: '',
                lon: '',
            }
        };
    },
    created: function () {
        
    },
    mounted: function (){
        console.log('hello',this.city);
        this.NewCityWeather()
    },
    methods: {
        NewCityWeather(){
            console.log('hello',this.city);
            this.axios.get(` https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.API_KEY}`)
            .then((response) => {
                this.weatherData = response.data;
                console.log(response.data);
            });

        },
    },
}

</script>

<style>

</style>