

class dhcChart {
    // 클래스 생성자
    constructor(chart_param){
        this.startDate = chart_param.startDate
        this.endDate = chart_param.endDate
        this.monthDaily = chart_param.monthDaily
        this.chartData = chart_param.data
        this.channelKind = chart_param.channelKind
        this.channelName = chart_param.channelName
        this.channelId = chart_param.channelId
        this.indexName = chart_param.channelId
    }

    // dom 위치에 차트 렌더링
    render(responsedata_array, dom){
        // 1. 함수 선언
        // 1.1 1차원배열 평균값 구하기
        function getArrayAverage(arr) {
            let result = 0

            arr.forEach((elem,idx) => {
                result += elem
            })
            return (result / arr.length)
        }

        // 1.2 평균선 삽입용 가운데 빈 array : [value ,,,,,,value] 
        function getBlankArray(length,value) {
            var result = new Array(length)
            result[0] = value
            result[result.length-1] = value
            return result        
        }

        // 1.3 get_arr_data_avg 를 echart 삽입용 series로 변환
        function convertAverageLineToSeries(data_raw) {
            var arr_average_real = data_raw[0]
            var averageLineBlankArray = getBlankArray(data_raw.length, arr_average_real)

            var series_data_markline = {
                type: "line",
                name: "markline_name",
                data: averageLineBlankArray,
                channel_name: "평균",
                "color": "#3F3F3F",
                markLine: {
                    data: [
                        {
                            yAxis : arr_average_real,
                            name: "평균"
                        }
                    ],
                    label:{
                        show:true,
                        position:'end',
                        formatter:function(params){
                            let result_value =  params.value.toLocaleString('en');
                            return  "평균\n" + result_value;
                        }
                    },
                    lineStyle :{
                        type:"solid",
                        width:1,
                        color: "rgb(248,169,166)" 
                    },    
                }
            }
            return series_data_markline
        }
        
        // 1.4 setOption 된 echart 인스턴스에서 seriesIndex 번째 데이터의 X_index 번째 점의 캔버스 좌표값 가져오기
        function getCoordFromSeriesPoint(chartInstance, seriesIndex, X_index){
            var series_data = chartInstance.getOption().series[seriesIndex].data;
            var pixel = chartInstance.convertToPixel(
                {
                    seriesIndex : seriesIndex,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                },
                [X_index,series_data[X_index]]
            )
            return pixel
        }

        // 1.5 x축에 입력할 날짜 구하기
        function getXaxisDateArray(startDate, endDate, monthDaily){
            var addMonth = (date, months) => {
                return new Date(date.setMonth(date.getMonth() + months))
            }
            var addDay = (date, days) => {
                return new Date(date.setDate(date.getDate() + days))
            }

            var dateArray = new Array();
            var startDate_dt = new Date(startDate);
            var endDate_dt = new Date(endDate);
            var currentDate_dt = new Date(startDate);
            // // var dateInterval = monthDaily === "month" ? endDate_dt.getMonth() - startDate_dt.getMonth() : endDate_dt.getDate() - startDate_dt.getDate()

            while (currentDate_dt <= endDate_dt) {
                if (monthDaily === "month") {
                    dateArray.push(currentDate_dt.toISOString().slice(0,7));
                    currentDate_dt = addMonth(currentDate_dt, 1)
                } else {
                    dateArray.push(currentDate_dt.toISOString().slice(0,10));
                    currentDate_dt = addDay(currentDate_dt, 1)
                }
            }
            return dateArray;
        }

        // 1.6 차트 배경색 넣기 ( echart graphic 사용 )
        function render_linechart_area(myChart, data_raw) {
            // 0. 변수 선언
            // 평균 위치 ( 왼, 오 )
            var average_point_left = getCoordFromSeriesPoint(myChart, 1, 0)
            var average_point_right = getCoordFromSeriesPoint(myChart, 1, data_raw.length-1)

            // series 실데이터 
            var series_realdata = myChart.getOption().series[0].data

            // 평균 값
            let avg = myChart.getOption().series[1].data[0]

            // 1. 교점좌표 구하기
            var cross_arr = []
            function get_intersection(chartInstance, series) {
                let result_arr = []
                // let avg = data_avg(series)
                // 1.1. 교점은 몇개? 시리즈 몇번째 데이터에?
                let intersection_arr = []
                for (let i=0 ; i < series.length-1; i++){
                    let s_min = Math.min(series[i],series[i+1] )
                    let s_max = Math.max(series[i],series[i+1] )

                    if (s_min < avg && s_max > avg){
                        intersection_arr.push({
                            seriesValue : series[i], 
                            index : i
                        })
                    } 
                }
                // 1.2. 교점좌표 계산
                for (let i=0; i < intersection_arr.length ; i++) {
                    let cor_1 = getCoordFromSeriesPoint(chartInstance, 0, intersection_arr[i].index)
                    let cor_2 = getCoordFromSeriesPoint(chartInstance, 0, (intersection_arr[i].index)+1)
                    let slope = (-1) * (cor_2[1]-cor_1[1]) / (cor_2[0]-cor_1[0]) // 캔버스 원점은 "좌상" 에 유의. 기울기에 -1 곱함
                    result_arr.push(
                        [((average_point_left[1] - cor_1[1]) / (-1*slope) ) + cor_1[0], average_point_left[1]]
                    )
                }
                return result_arr
            }
            var intersection_arr = get_intersection(myChart,series_realdata)

            // 2. 폴리곤 shape 만들기
            // 렌더링 후 그래픽 표시용 series
            var data_series_graphic_up = []
            var data_series_graphic_down = []
            // 평균보다 큰 값 넣기
            for (let i=0; i < series_realdata.length ; i++){
                // 넣을 좌표 [x,y]
                let coord_to_push = getCoordFromSeriesPoint(myChart, 0, i)
                if (series_realdata[i] > avg){ 
                    data_series_graphic_up.push(coord_to_push)
                }
                else {
                    data_series_graphic_down.push(coord_to_push)
                }
            }

            // 교점 넣기
            data_series_graphic_up = data_series_graphic_up.concat(intersection_arr)
            data_series_graphic_down = data_series_graphic_down.concat(intersection_arr)

            // series 중 평균보다 큰 값, 교점 값 전부 넣고 x축 좌표 기준 정렬 
            data_series_graphic_up = data_series_graphic_up.sort(function(a,b){
                return a[0]-b[0]
            })
            data_series_graphic_down = data_series_graphic_down.sort(function(a,b){
                return a[0]-b[0]
            })

            // 배열 양끝 평균점 넣기
            data_series_graphic_up.unshift(average_point_left)
            data_series_graphic_up.push(average_point_right)
            data_series_graphic_down.unshift(average_point_left)
            data_series_graphic_down.push(average_point_right)

            // 3. 차트 옵션 생성
            var graphic = {
                type: 'group',
                bounding: 'raw',
                left: 0,
                top: 0,
                z: 100,
                children: [
                    {
                        type: 'polygon',
                        shape: {
                            points : data_series_graphic_down
                        },
                        style: {
                            fill:
                            new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(255, 255, 255)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(22, 119, 252, 0.3)'
                            }])
                        }
                    },
                    {
                        type: 'polygon',
                        shape: {
                            points : data_series_graphic_up
                        },
                        style: {
                            fill:   
                                new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(229, 32, 86, 0.3)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 255, 255)'
                                }])
                        }
                    },

                ]
            }

            //4. 차트옵션에 추가후 렌더링 다시
            var chart_opt = myChart.getOption()
            chart_opt['graphic'] = graphic
            myChart.setOption(chart_opt, true);
        }
        
        // 2. 변수 선언
        // 2.1 실데이터 평균값
        var arr_average_real = getArrayAverage(responsedata_array)

        // 2.2 날짜표시용 x축
        var arr_xAxis_date = getXaxisDateArray(this.startDate, this.endDate, this.monthDaily)

        // 2.3 평균선 표시용 가운데 빈 데이터
        var arr_average_line = convertAverageLineToSeries(
            getBlankArray(responsedata_array.length,arr_average_real)
        )

        // 3. 차트 옵션 선언 및 1차 렌더링 ( 배경색 없음 )
        // 3.1 차트 옵션 선언
        var option = {
            title: {
                text: 'DHC 커스텀 라인차트',
            },

            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            toolbox: {
                show:false,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: arr_xAxis_date,
                axisLabel:{
                    interval:1,
                    fontSize:6,
                    rotate:45,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgb(200,200,200,0.3)',
                        type:"dotted"
                    },
                    interval:'auto',
                },
                minorSplitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgb(200,200,200,0.3)',
                        type:"dotted"
                    }
                },    
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                data : [
                    "a",
                ],
                axisLabel: {
                    formatter: function (val) {
                        return (val);
                    }
                },
                splitLine: {
                    show: false,
                },
                minorSplitLine: {
                    show: false,
                },    
            },
            series: [
                {
                    name: '실데이터',
                    type: 'line',
                    smooth: false,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: 'rgb(0, 0, 0)'
                    },
                    lineStyle:{
                        width:"1",
                        type:"solid",
                        color :"#BBB",
                    },
                    data: responsedata_array
                },
                arr_average_line // 평균선 표시용 빈 데이터
            ]
        };

        // 3.2 차트 1차 렌더링
        var myChart = echarts.init(dom);
        myChart.setOption(option, true);

        // 4. 차트 2차 렌더링 ( 배경색 graphic 삽입 )
        // 차트 배경색 넣기 실행
        render_linechart_area(myChart, responsedata_array)
    }
}


// TEST 실행
var responsedata_array = new Array(24)
responsedata_array.fill(1)
responsedata_array =responsedata_array.map(
    function(elem){
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    
        return elem * getRandomArbitrary(10, 40)
    }
)

var params_temp = {
    startDate : ["2020-01"],
    endDate : ["2021-12"],
    monthDaily : "month",
    chartData : [],
    channelKind : "facebook",
    channelName : "세바시",
    channelId : "12314453",
    indexName : "dpi",
}

var dom = document.querySelector("#line-chart")
var dhc_chart = new dhcChart(params_temp)
dhc_chart.render(responsedata_array, dom)
