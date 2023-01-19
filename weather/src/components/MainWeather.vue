<template>
    <div>
        <div id="info" v-if ="this.weatherData?.name">
            <div class="container">
                <div class="section">
                    <h2>ДОДАВАННЯ МІСТА</h2>
                    <hr>
                    <h4>ВВЕДІТЬ НАЗВУ МІСТА</h4>
                    <input type="text" v-model="addCity"><br>
                    <button @click="addCityToArr">Додати</button>
                </div>
                <div class="section">
                    <h2>ВИБІР МІСТА</h2>
                    <hr>
                    <h4>  ОБEРІТЬ МІСТО</h4>
                    <select v-model="selectedCity">
                        <option v-for="city in userCityArr">{{city}}</option>
                    </select><br>

                    <div v-if="this.selectedCity != ''">
                        <router-link :to="'/city-weather/' + selectedCity">
                            <button>Погода</button>
                        </router-link>
                    </div>
                    <div v-else>
                        <button>Погода</button>
                    </div>
                    
                </div>
            </div>
            <div class="container">
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
    </div>
</template>

<script>

export default {
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    //https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=7914d5a440960cfd5df3bd0388a7ad0f

    data(){
        return{
            weatherData:{},
            addCity:'',
            userCityArr:[],
            
            isOpen: false,
            API_KEY: '7914d5a440960cfd5df3bd0388a7ad0f',
            //cityName: 'Zaporizhia',

            selectedCity:'',

            coord:{
                // lat: '47.8347264',
                // lon: '35.1469568',

                lat: '',
                lon: '',
            }
        };
    },
    created: function () {
        var getPosition = function (options) {
            return new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
        }
        getPosition().then((position) => {
            this.axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${this.API_KEY}`)
                .then((response) => {
                    this.weatherData = response.data;
                    console.log(response.data);
                });
        })       
    },
    mounted(){
        this.test2()
        console.log(JSON.parse(localStorage.getItem("cityArr")));
    },
    // computed: {
    //     isDonePrOfStudent() {
    //         return this.student.isDonePr ? 'здана' : 'не здана'
    //     },
    // },
    methods: {
        test2(){
            if(localStorage.getItem ('cityArr')){
                this.userCityArr = JSON.parse(localStorage.getItem("cityArr"));
            }
        },
        addCityToArr(){
            console.log('hello');

            if (this.addCity !='') {
                this.userCityArr.push(this.addCity);
                console.log(this.userCityArr);
                localStorage.setItem("cityArr", JSON.stringify(this.userCityArr));
                this.addCity = '';
            }
            else{
                localStorage.clear();
                this.userCityArr = [];
            }
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position)=>{
                    this.coord.lat = position.coords.latitude;
                    this.coord.lon = position.coords.longitude;
                    console.log(this.coord.lat +" "+ this.coord.lon);
                });
            } else { 
                console.log("Geolocation is not supported by this browser.");
            }

        },
        test() {
            console.log("Latitude: " + this.coord.lat + "Longitude: " + this.coord.lon);

            this.axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.coord.lat}&lon=${this.coord.lon}&appid=${this.API_KEY}`)
            .then((response) => {
                this.weatherData = response.data;
                console.log(response.data);
            });
        }
    },
}

</script>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        width: 100%;
        height: 100vh;
        
        background-color: violet;
        background-image: url("https://wallpapercave.com/wp/wp7719524.jpg"); 
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .title{
        position: absolute;
        margin:20px;
        color:whitesmoke
    }

    #info{

        width: 100%;
        height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

    }

    .container{
        min-width: 600px;
        max-width: 1000px;
        
        min-height: 20%;
        max-height: 40%;

        background-color: darkslateblue;
        opacity: 0.8;

        border-radius: 20px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items:center;
        color:whitesmoke;
    }

    .section{
        width:50%;
        color:whitesmoke;
        margin: 20px;
    }
    .section>hr{
        width: 50px;
        border:1px solid royalblue;
    }
    .section>h4{
        margin: 5px;
    }
    .section>input,select{
        width: 100%;
        font-size: 20px;
        border-radius:20px;
        border:0;
        margin-block: 5px;
        padding-left: 5px;
    }
    button{
        color:whitesmoke;
        background-color:rgb(33, 22, 131);
        padding: 7px;
        border-radius:5px;
        border:0;
        margin-top: 5px;
    }
    .section>img{
        max-width: 10%;
        max-height: 10%;
    }
    table{
        padding: 50px;
        width: 100%;
        height: 100%;
        
    }

    /* col:nth-child(2n+1) {color: red}
    table>tr{
        height:10%;
    } */
    table>tr>td{
        height:15%;
        width:33%;
    }
    table>tr>td>img{
        /* height: 10%; */
        width:25px;
    }
    .colorbl{
        color:mediumpurple;
        color:plum;
        color:thistle;
    }
    button:hover{
        cursor:pointer;
        background-color: violet;
    }

</style>


<!-- <div v-if ="this.weatherData?.name" class="container">
            <div class="section colorbl">
                {{this.weatherData.name}}<br>
                <img src="https://img.icons8.com/fluency/48/null/blur.png"/><br>
                <img src="https://img.icons8.com/external-flat-vol-2-vectorslab/68/null/external-Thermometer-power-and-energy-flat-vol-2-vectorslab.png"/><br>
                <img src="https://img.icons8.com/fluency/48/null/partly-cloudy-day.png"/><br>
                <img src="https://img.icons8.com/external-fauzidea-flat-fauzidea/64/null/external-fog-weather-fauzidea-flat-fauzidea.png"/><br>
                <img src="https://img.icons8.com/external-tulpahn-flat-tulpahn/64/null/external-cloudy-weather-tulpahn-flat-tulpahn.png"/><br>
            </div>
            <div class="section">
                {{this.weatherData.sys.country}}
                <p>humidity</p>
                <p>temp</p>
                <p>main</p>
                <p>pressure</p>
                <p>descripttion</p>
            </div>
            <div class="section colorbl">
                [{{this.weatherData.coord.lon}};{{this.weatherData.coord.lat}}]<br>
                {{this.weatherData.main.humidity}}<br>
                {{this.weatherData.main.temp}}℃<br>
                {{this.weatherData.base}}<br>
                {{}}<br>
                {{this.weatherData.main.pressure}} hpa<br>
                {{}}<br>
            </div>
        </div> -->