//  
// Ukrit Fongsomboon 
// Kobori4268@gmail.com 
// 


// Highcharts.setOptions({
//   global: {
//       useUTC: false
//   }
// });

// Highcharts.chart('container', {
//   chart: {
//       type: 'spline',
//       animation: Highcharts.svg, // don't animate in old IE
//       marginRight: 20,
//       events: {
//           load: function () {

//             // set up the updating of the chart each second
//             var series = this.series[0];
//             setInterval(function () {
//                 // Getdata();
//                 var x = (new Date()).getTime(), // current time
//                     // y = Math.random();
//                     y = ((Math.random()*100)%30)+10;
                  
//                 series.addPoint([x, y], true, true);
//             }, 1000);
//           }
//       },
//           backgroundColor: {
//                 linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
//                   stops: [
//                       [0, '#363636'],
//                       [1, '#363636']
//                   ],
//           }
//   },
//   // title: {
//           //     text: 'Temparature Now',
//           //     style: {
//           //         color: '#E0E0E3',  
//           //         fontSize: '16px'
//           //     }
//           // },

//   xAxis: {
//       type: 'datetime',
//       tickPixelInterval: 80,
              
//       labels: {
//           style: {
//                 color: '#E0E0E3'
//           }
//       },

//   },


//   yAxis: {
//       title: {
//           text: 'Celcius',
//           style: {
//               color: '#E0E0E3',
//               fontSize: '10px'
//           }
//       },
//       plotLines: [{
//           value: 0,
//           width: 1,
//           color: '#E0E0E3'
//       }]
//   },


//   tooltip: {
//       formatter: function () {
//           // return '<b>' + this.series.name + '</b><br/>' +
//           return '<b>' + this.series.name + '</b><br/>' +
//           Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
//           Highcharts.numberFormat(this.y, 1);
//       }
//   },


//   legend: {
//       enabled: false
//   },


//   exporting: {
//       enabled: false
//   },
          

//   series: [{
//       name: 'Temparature',
//       data: (function () {
//         // generate an array of random data
//           var data = [],time = (new Date()).getTime(),i;
//           for (i = -19; i <= 0; i += 1) {
//               data.push({
//                   x: time + i * 1000,
//                   // y: Math.random()
//                   y:0
//               });
//           }
//           return data;
//       }())
//   }]
// });


var usertemp;
var userhum;
var usertime;

get_setting()


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
}  

var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("demo1");
output1.innerHTML = slider1.value;
slider1.oninput = function() {
    output1.innerHTML = this.value;
}  

function Get_data(){
  console.log("data");
}

function send_data(){
    var socket = io.connect();
    socket.emit('Recive-data-web', { user_temp: slider.value,user_hum:slider1.value});
    var text   = document.getElementById("textupdate"); 
    socket.on('recive_timeupdate',function(time){
        var text   = document.getElementById("textupdate"); 
        text.innerHTML ="Update : "+ time.time; 
    });
    text.innerHTML ="Update : "+  data.time; 
}

function get_setting(){
   var socket = io.connect();
    socket.on('get_setting', function (data) {
       usertemp   = data.user_temp;
       userhum    = data.user_hum;
       usertime   = data.time;
        console.log("time update :"+data.time+"/"+"temp:"+data.user_temp+"//"+"hum:"+data.user_hum);
        
        var text   = document.getElementById("textupdate"); 
        text.innerHTML ="Update : "+  data.time; 
        var slider = document.getElementById("myRange");
        var output = document.getElementById("demo");
        slider.value = usertemp;
        output.innerHTML = slider.value;
        slider.oninput = function() {
            output.innerHTML = this.value;
        }  

        var slider1 = document.getElementById("myRange1");
        var output1 = document.getElementById("demo1");
        slider1.value = userhum;
        output1.innerHTML = slider1.value;
        slider1.oninput = function() {
            output1.innerHTML = this.value;
        }  
    });
}
