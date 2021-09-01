var response_data = {
   my_score : [
      {
         score: [36,54,39,75,74,49,34,43,50],
         average: 50.444,
      },
      {
         score:[62,36,36,57,45,59,52,31,44],
         average: 46.889,
      },
      {
         score: [33,29,43,48,51,65,40,67,58],
         average: 48.222,
      }
   ],
   areas : [
         "1) 시장 분석 ",
         "2) 시장 분석 ",
         "3) 시장 분석 ",
         "4) 시장 분석 ",
         "5) 시장 분석 ",
         "6) 시장 분석 ",
         "7) 시장 분석 ",
         "8) 시장 분석 ",
         "9) 시장 분석 ",
   ],
}

function bar_echart(response_data){
   var colors = [
      "#F76F7E",
      "#5CB1FB",
      "#8DE954",
   ]

    var make_series = (response) => {
         result = [];
         response.my_score.forEach((elem,idx) => {
            var each_series = {
               "name": (idx + 1) + "회차",
               "type":"bar",
               "data":elem.score,
               "barWidth" : "10",
               "barGap" : "50%",
               "itemStyle":{
                   color : colors[idx],
                   barBorderRadius : [10,10,0,0],
               },
               "markLine" : {
                  symbol:"none",

                  data:[
                     {
                        name: (idx + 1) + "회차 평균",
                        yAxis : elem.average,
                     },
                  ],
                  label :{
                     formatter : (idx + 1) + "회차 평균",
                     fontSize : 10,
                  }
               },
            };
            result.push(each_series)
        })
        return result;
    };

    var make_markline = (response_data) => {
      result = [];
      response.my_score.forEach((elem,idx) => {
         var each_markline = {
            "name": (idx + 1) + "회차",
            "type":"bar",
            "data":elem,
            "barWidth" : "10",
            "barGap" : "50%",
            "itemStyle":{
                color : colors[idx],
                barBorderRadius : [10,10,0,0],
            },
         };
         result.push(each_series)
     })
     return result;
 };

    var option = {
        "tooltip":[
           {
              "show":true,
           }
        ],
        "yAxis":[
           {
              splitLine:{
                 show:false,
              },
              "show":true,
              "axisLabel":{
                 "show":true,
              },
              min:0,
              max:100,
           }
        ],
        "xAxis":[
           {
            "axisLabel" : {
               show:true,
               interval:0,
               fontSize:9,
            },
            "splitLine":{
               "show":true,
               "interval" : 0,
               "lineStyle":{
                  "color":[
                     "#ccc"
                  ],
                  "width":1,
                  "type":"dashed",
               }
            },
            "data":response_data.areas,
            "show":true,
           }
        ],
        "series":make_series(response_data),
        "legend":[
           {
              "data":[
                 "1회차","2회차","3회차",
              ],
           }
        ],
    };
    
    // 2.2 차트 렌더링
    var dom = document.querySelector("#bar-chart");
    var myChart = echarts.init(dom);
    myChart.setOption(option, true);
}
bar_echart(response_data);