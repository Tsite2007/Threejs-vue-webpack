<!--
    by:
    name: 连线测试
    notes:
-->
<template lang="html">
    <div class="testFrame">
        <div class="returnBack" @click="backEvent">返回</div>
        <div class="testTitle">
            <span class="animated zoomIn">连线测试</span>
        </div>
        <div class="testBody">
            <div class="svgBox" ref="myDiv">
                <!-- <svg
                    width="1000" 
                    height="800" 
                    xmlns="http://www.w3.org/2000/svg" 
                    style="border:1px solid black">
                    <g class="xAxis">
                        <line x1="100" y1="700" x2="930" y2="700" stroke="black" stroke-width="1"></line>
                        <polyline points="925,695 930,700 925,705" fill="none" stroke="black" stroke-width="1"></polyline>
                        <text x="80" y="720">0</text>
                        <text x="195" y="720">1</text>
                        <text x="295" y="720">2</text>
                        <text x="395" y="720">3</text>
                        <text x="495" y="720">4</text>
                        <text x="595" y="720">5</text>
                        <text x="695" y="720">6</text>
                        <text x="795" y="720">7</text>
                        <text x="895" y="720">8</text>
                    </g>
                    <g class="yAxis">
                        <line x1="100" y1="700" x2="100" y2="70" stroke="black" stroke-width="1"></line>
                        <polyline points="95,75 100,70 105,75" fill="none" stroke="black" stroke-width="1"></polyline>
                        <text x="80" y="605">1</text>
                        <text x="80" y="505">2</text>
                        <text x="80" y="405">3</text>
                        <text x="80" y="305">4</text>
                        <text x="80" y="205">5</text>
                        <text x="80" y="105">6</text>
                    </g>
                    <g class="layer">
                        <line x1="100" y1="100" x2="900" y2="100" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="100" y1="200" x2="900" y2="200" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="100" y1="300" x2="900" y2="300" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="100" y1="400" x2="900" y2="400" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="100" y1="500" x2="900" y2="500" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="100" y1="600" x2="900" y2="600" stroke="black" stroke-width="1" stroke-dasharray="5"></line>

                        <line x1="200" y1="100" x2="200" y2="700" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="300" y1="100" x2="300" y2="700" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="400" y1="100" x2="400" y2="700" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="500" y1="100" x2="500" y2="700" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="600" y1="100" x2="600" y2="700" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="700" y1="100" x2="700" y2="700" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="800" y1="100" x2="800" y2="700" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                        <line x1="900" y1="100" x2="900" y2="700" stroke="black" stroke-width="1" stroke-dasharray="5"></line>
                    </g>
                </svg> -->
            </div>
        </div>
    </div>
</template>

<script>
const d3 = require("d3");
export default {
    data(){
        return {
            dom:{
                svg:"",
                gX:"",
                gY:"",
                gLayer:"",
                x1:0,
                y1:0,
                x2:0,
                y2:0,
                first:false, // 是不是首次进入layer
                activeLine:"",
                points:[], // 所有点击的坐标
                clickNumber:0, // 点击次数
            }
        };
    },
    mounted(){
        // 创建SVG
        this.dom.svg = d3.select(this.$refs.myDiv).append("svg").attr("width", "1000").attr("height", "800").attr("xmlns","http://www.w3.org/2000/svg").attr("style","border:1px solid black");
        // x轴
        this.dom.gX = this.dom.svg.append('g').attr('class',"xAxis");
        this.dom.gX.append('line').attr('x1',"100").attr('y1',"700").attr('x2',"930").attr('y2',"700").attr('stroke',"black").attr('stroke-width',"1");
        this.dom.gX.append('polyline').attr('points',"925,695 930,700 925,705").attr('fill',"none").attr('stroke',"black");
        this.dom.gX.append('text').attr('x',"80").attr('y',"720").attr('fill',"black").text("0");
        for (let i = 1; i < 9; i++) {
            this.dom.gX.append('text').attr('x',i + "95").attr('y',"720").attr('fill',"black").text(i.toString());
        }
        // y轴
        this.dom.gY = this.dom.svg.append('g').attr('class',"yAxis");
        this.dom.gY.append('line').attr('x1',"100").attr('y1',"700").attr('x2',"100").attr('y2',"70").attr('stroke',"black").attr('stroke-width',"1");
        this.dom.gY.append('polyline').attr('points',"95,75 100,70 105,75").attr('fill',"none").attr('stroke',"black");
        for (let j = 6; j > 0; j--) {
            this.dom.gY.append('text').attr('x',"80").attr('y',j +"20").attr('fill',"black").text(j.toString());
        }
        // layer层
        this.dom.gLayer = this.dom.svg.append('g').attr('class',"layer");
        for (let k = 1; k < 7; k++) {
            this.dom.gLayer.append('line').attr('x1',"100").attr('y1',k + "00").attr('x2',"900").attr('y2',k + "00").attr('stroke-width',"1").attr('stroke-dasharray',"5").attr("stroke","black");
        }
        for (let m = 2; m < 10; m++) {
            this.dom.gLayer.append('line').attr('x1',m + "00").attr('y1',"100").attr('x2',m + "00").attr('y2',"700").attr('stroke-width',"1").attr('stroke-dasharray',"5").attr("stroke","black");
        }

        
        let _this = this;
        _this.$nextTick(function(){
            _this.dom.gLayer.on("click",function(e){
                // console.log(d3.event.offsetX);
                // console.log(d3.event.offsetY);
                _this.dom.clickNumber++;
                if (_this.dom.clickNumber > 4) return;
                _this.dom.x1 = d3.event.offsetX;
                _this.dom.y1 = d3.event.offsetY;
                _this.dom.points.push(_this.dom.x1 + ',' + _this.dom.y1);
                _this.dom.first = false;
                _this.dom.gLayer.append('circle').attr('cx',d3.event.offsetX).attr('cy',d3.event.offsetY).attr('r',"10").attr('fill',"red");
                if(_this.dom.clickNumber === 4) {
                    _this.dom.gLayer.selectAll('.activeLine').remove();
                    _this.dom.gLayer.append('polygon').attr('points',_this.dom.points.join(' ')).attr('fill','none').attr('stroke','red').attr('stroke-width',"2");
                }
            });
            _this.dom.gLayer.on("mousemove",function(e){
                if (!_this.dom.x1) return;
                if (_this.dom.clickNumber >= 4) return;
                _this.dom.x2 = d3.event.offsetX;
                _this.dom.y2 = d3.event.offsetY;
                // _this.dom.gLayer.select(".activeLine").remove();
                if (!_this.dom.first) {
                    _this.dom.first = true;
                    _this.dom.activeLine = _this.dom.gLayer.append('line').attr("x1",_this.dom.x1).attr("y1",_this.dom.y1).attr("x2",_this.dom.x2).attr("y2",_this.dom.y2).attr('stroke',"red").attr("stroke-width","2").attr('class',"activeLine");
                } else {
                    _this.dom.activeLine.attr("x2",_this.dom.x2).attr("y2",_this.dom.y2);
                }
            })
        })

        // console.log(d3.select(this.dom.svg));
        // d3.select(this.dom.svg).on("click",this.dragmove);
    },
    methods:{
        backEvent(){
            this.$router.push({name:"/"})
        }
    }
}
</script>
<style lang="less" scoped>
.testFrame {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.returnBack {
    position: fixed;
    z-index: 3;
    left: 10px;
    top: 20px;
    height: 25px;
    line-height: 25px;
    background: #eee;
    padding: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        background: #3988f7;
        color: #fff;
    }
}
.testTitle {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
    font-size: 30px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    box-shadow: 0 0 10px rgba(0,0,0,0.07);
    span{
        display: block;
    }
}
.testBody {
    position: fixed;
    left: 10px;
    top: 60px;
    right: 10px;
    bottom: 10px;
    background-color: #f5f5f5;
    z-index: 1;
}

.svgBox{
    width: 1000px;
    height: 800px;
    margin: 0 auto;
}
</style>
