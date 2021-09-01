

class sunburstChart {
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
        // 1. 데이터 세팅
        var item1 = {
            color: '#F54F4A'
        };
        var item2 = {
            color: '#FF8C75'
        };
        var item3 = {
            color: '#FFB499'
        };
        
        var data = [
            {
                name:"1",
                value : 10,
                children : [{
                    name:"1-1",
                    value : 8,
                    itemStyle: { color: "#F54F4A"},
                    children : [
                        {
                        name:"1-1-2",
                        value : 4,
                        }
                    ]
                }]
            },
            {
                name:"1",
                value : 10,
                children : [{
                    name:"1-1",
                    value : 7,
                    itemStyle: { color: "#F54F4A"},
                    children : [
                        {
                        name:"1-1-2",
                        value : 3,
                        }
                    ]
                }]

            },
            {
                name:"1",
                value : 10,
            },
            {
                name:"1",
                value : 10,
            },
            {
                name:"1",
                value : 10,
                children : [{
                    name:"1-1",
                    value : 6,
                    itemStyle: { color: "#F54F4A"},
                    children : [
                        {
                        name:"1-1-2",
                        value : 5,
                        }
                    ]
                }]

            },
            {
                name:"1",
                value : 10,
            },
            {
                name:"1",
                value : 10,
            },
            {
                name:"1",
                value : 10,
                children : [{
                    name:"1-1",
                    value : 8,
                    itemStyle: { color: "#F54F4A"},
                    children : [
                        {
                        name:"1-1-2",
                        value : 4,
                        }
                    ]
                }]

            },
            {
                name:"1",
                value : 10,
            },

        ];
        
        // 2. 차트 옵션 선언 및 1차 렌더링 ( 배경색 없음 )
        // 2.1 차트 옵션 선언
        var option = {
            title: {
                text: '썬버스트 차트',
            },
        
            series: {
                radius: ['15%', '80%'],
                type: 'sunburst',
                sort: null,
                highlightPolicy: 'ancestor',
                data: data,
                label: {
                    rotate: 'radial'
                },
                levels: [],
                itemStyle: {
                    color: '#ddd',
                    borderWidth: 2
                }
            }
        };
        // 2.2 차트 렌더링
        var myChart = echarts.init(dom);
        myChart.setOption(option, true);

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

var dom = document.querySelector("#sunburst-chart")
var dhc_chart = new sunburstChart(params_temp)
dhc_chart.render(responsedata_array, dom)
