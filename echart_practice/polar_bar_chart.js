
function polar_bar_echart(){
    var my_score = [36,54,39,75,74,49,34,43,50];
    var team_score = [62,36,36,57,45,59,52,31,44];
    var lecture_score = [33,29,43,48,51,65,40,67,58];
    var overall_score = [64,71,58,70,63,68,44,44,57];
    var barHeight = 20;
    var barHeight_bar = new Array(9).fill(barHeight);
    
    var areas = [
        "1) 시장 분석 ",
        "2) 시장 분석 ",
        "3) 시장 분석 ",
        "4) 시장 분석 ",
        "5) 시장 분석 ",
        "6) 시장 분석 ",
        "7) 시장 분석 ",
        "8) 시장 분석 ",
        "9) 시장 분석 ",
    ];
    
    option = {
        title: {
            text: '진단 결과',
        },
        legend: {
            show: true,
            data: ['안상봉', '3조','데미초18기','전체',]
        },
        grid: {
            top: 100
        },
        // animationDuration : 1000,
        // animationEasing : "linear",
        angleAxis: {
            type: 'category',
            data: areas,
            axisTick : {
                show : false,
            },
            splitLine : {
                show : true,
                lineStyle : {
                    type : "dashed",
                }
            },
            axisLine : {
                show : false,
            },
            axisLabel: {
                show : true,
            }
        },
        radiusAxis :{
            axisTick : {
                show : false,
            },
            splitLine : {
                show : false,
            },
            axisLine : {
                show : false,
            },
            axisLabel: {
                show : false,
            }
        },
        tooltip: {
            show: true,
        },
        polar: {
        },
        series: 
        [
            // 바차트 하단 간격용 빈 데이터
            {
                type: 'bar',
                data: barHeight_bar,
                itemStyle :{
                    opacity: 1,
                    color : "#FFF",
                }, 
                coordinateSystem: 'polar',
                barGap: "-100%",
                barCategoryGap: "0%",
                stack: 'my_score',
                z:1,
            }, 
            {
                type: 'bar',
                data: barHeight_bar,
                itemStyle :{
                    opacity: 1,
                    color : "#FFF",
                }, 
                coordinateSystem: 'polar',
                barGap: "-100%",
                stack: 'team_score',
                z:1,
            }, 
            {
                type: 'bar',
                data: barHeight_bar,
                itemStyle :{
                    opacity: 1,
                    color : "#FFF",
                }, 
                coordinateSystem: 'polar',
                barGap: "-100%",
                stack: 'lecture_score',
                z:1,
            }, 
            {
                type: 'bar',
                data: barHeight_bar,
                itemStyle :{
                    opacity: 1,
                    color : "#FFF",
                }, 
                coordinateSystem: 'polar',
                barGap: "-100%",
                stack: 'overall_score',
                z:1,
            }, 
            // 실데이터
            {
                type: 'bar',
                data: my_score,
                itemStyle :{
                    opacity: 0.6,
                    color : "#aaa",
                }, 
                coordinateSystem: 'polar',
                name: '안상봉',
                stack: 'my_score',
                barGap: "-100%",
            }, 
            {
                type: 'bar',
                data: team_score,
                itemStyle :{
                    opacity: 0.6,
                    borderColor: 'skyblue',
                    color: {
                        type: 'radial',
                        x: 400,
                        y: 400,
                        r: 250,
                        colorStops: [
                            {offset: 0, color: '#FFFFFF'},
                            {offset: 1, color: 'skyblue'},
                        ],
                        global: true
                    }, 
                },
                coordinateSystem: 'polar',
                name: '3조',
                stack: 'team_score',
                barGap: "-100%",
            },
            {
                type: 'bar',
                data: lecture_score,
                itemStyle :{
                    opacity: 0.6,
                    borderColor: 'gold',
                    color: {
                        type: 'radial',
                        x: 400,
                        y: 400,
                        r: 250,
                        colorStops: [
                            {offset: 0, color: '#FFFFFF'},
                            {offset: 1, color: 'gold'},
                        ],
                        global: true
                    }, 
                },
                coordinateSystem: 'polar',
                name: '데미초18기',
                stack: 'lecture_score',
                barGap: "-100%",
            },
            {
                type: 'bar',
                data: overall_score,
                itemStyle :{
                    opacity: 0.3,
                    borderColor: 'salmon',
                    color: {
                        type: 'radial',
                        x: 400,
                        y: 400,
                        r: 250,
                        colorStops: [
                            {offset: 0, color: '#FFFFFF'},
                            {offset: 1, color: 'salmon'},
                        ],
                        global: true
                    }, 
                },
                coordinateSystem: 'polar',
                name: '전체',
                stack: 'overall_score',
                barGap: "-100%",
            },
        ]
    };
    
    // 2.2 차트 렌더링
    var dom = document.querySelector("#polar-bar-chart");
    var myChart = echarts.init(dom);
    myChart.setOption(option, true);
}

polar_bar_echart();