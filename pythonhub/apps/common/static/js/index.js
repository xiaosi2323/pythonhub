$(function() {
    var $this = $("#hot");
    var scrollTimer;
    $this.hover(function() {
        clearInterval(scrollTimer);
    }, function() {
        scrollTimer = setInterval(function() {
            scrollNews($this);
        }, 800);
    }).trigger("mouseleave");

    function scrollNews(obj) {
        var $self = obj.find("ul");
        var lineHeight = $self.find("li:first").height();
        $self.animate({
            "marginTop": -lineHeight + "px"
        }, 300, function() {
            $self.css({
                marginTop: 0
            }).find("li:first").appendTo($self);
        })
    }
})

$(document).ready(function () {
    setInterval(function () {
        $.each($(".bj li strong"),function(){
            var addval=parseInt(100*Math.random());
            var oldval=parseInt($(this).find("a").text());
            var val=oldval+addval;
            $(this).find("b").css("display","block");
            $(this).find("b").text("+"+addval);
            $(this).find("a").text(val);
            $(this).find("b").fadeOut(1500);
        })
    },3000)
});

var myChartMain=(function(){
    var myChartMain = echarts.init(document.getElementById('map'));
    var data = [
        {name: '贵阳市', value: 1000},
        {name: '六盘水市', value: 120},
        {name: '遵义市', value: 120},
        {name: '安顺市', value: 520},
        {name: '毕节市', value: 740},
        {name: '铜仁市', value: 150},
        {name: '黔西南布依族苗族自治州', value: 660},
        {name: '黔东南苗族侗族自治州', value: 380},
        {name: '黔南布依族苗族自治州', value: 180}
    ];
    var geoCoordMap = {
        '贵阳市':[106.71,26.57],
        '六盘水市':[104.82,26.58],
        '遵义市':[106.9,27.7],
        '安顺市':[105.93,26.23],
        '毕节市':[105.29,27.32],
        '铜仁市':[109.21,27.73],
        '黔西南布依族苗族自治州':[104.90,25.10],
        '黔东南苗族侗族自治州':[107.99,26.58],
        '黔南布依族苗族自治州':[107.52,26.26]
    };

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    myChartMain.setOption({
        tooltip : {
            trigger: 'item'
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x:'right',
        //     data:['pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        visualMap: {
            min: 0,
            max: 1500,
            left: '10%',
            top: 'bottom',
            text: ['High','Low'],
            seriesIndex: [1],
            inRange: {
                color: ['#c0d7e8', '#055a98']
            },
            calculable : true
        },
        geo: {
            map: '贵州',
            label: {
                // normal: {
                //     show: true
                // },
                emphasis: {
                    show: true,
                    color:'#fff'
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#055a98'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series : [
            {
                name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 100;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 3)),
                symbolSize: function (val) {
                    return val[2] / 30;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f44336',
                        shadowBlur: 100,
                        shadowColor: '#f44336'
                    }
                },
                zlevel: 1
            }
        ]
    });
    return myChartMain;
})();

var myChartMain1=(function(){
    var myChartMain1 = echarts.init(document.getElementById('bar'));
    myChartMain1.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid:{
            top:'18%',
            bottom:'16%',
            left:'19%'
        },
        legend: {
            textStyle: {
                color: '#fff'
            },
            data:['合格','不合格']
        },
        xAxis: [
            {
                type: 'category',
                data: ['50前','60后','80后','00后'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    formatter: '{value} ',
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        yAxis:
        {
            type: 'value',
            // name: '总分',
            // interval: 50,
            axisLabel: {
                formatter: '{value} ',
                textStyle: {
                    color: '#fff'
                }
            }
        },
        series: [
            {
                name:'合格',
                type:'bar',

                itemStyle: {
                    normal: {
                        color:'#1178c9'
                    }
                },
                data:[1000, 5000, 600, 8000]
            },
            {
                name:'不合格',
                type:'bar',

                itemStyle: {
                    normal: {
                        color:'#00a77b'
                    }
                },
                data:[1200, 7000, 4200, 8500]
            }
        ]
    });
    return myChartMain1;
})();
var myChartMain2=(function(){
    var myChartMain2 = echarts.init(document.getElementById('line'));
    myChartMain2.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid:{
            top:'18%',
            bottom:'16%',
            left:'19%'
        },
        legend: {
            textStyle: {
                color: '#fff'
            },
            data:['用户渠道']
        },
        xAxis: [
            {
                type: 'category',
                data: ['50前','60后','80后','00后'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    formatter: '{value} ',
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        yAxis:
        {
            type: 'value',
            // name: '总分',
            // interval: 50,
            axisLabel: {
                formatter: '{value} ',
                textStyle: {
                    color: '#fff'
                }
            }
        },
        series: [
            {
                name:'合格',
                type:'line',
                smooth:true,
                itemStyle: {
                    normal: {
                        color:'#1178c9'
                    }
                },
                data:[1000, 5000, 600, 8000]
            }
        ]
    });
    return myChartMain2;
})();

var myChartMain3=(function(){
    var myChartMain3 = echarts.init(document.getElementById('pie'));
    myChartMain3.setOption({

        tooltip: {
            trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: '70%',
            y:'25%',
            textStyle: {
                color: '#fff'
            },
            data:['未知','男','女']
        },
        series: [
            {
                name:'公众推广度',
                type:'pie',
                center:['40%','50%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'未知',itemStyle: {
                        normal: {
                            color:'#1178c9'
                        }
                    }},
                    {value:310, name:'男',itemStyle: {
                        normal: {
                            color:'#00a77b'
                        }
                    }},
                    {value:234, name:'女',itemStyle: {
                        normal: {
                            color:'#25bf2b'
                        }
                    }}
                ]
            }
        ]
    });
    return myChartMain3;
})();