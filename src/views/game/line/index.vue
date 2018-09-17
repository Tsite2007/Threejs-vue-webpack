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
                scaleNum: 0.6 , //缩小倍速,由1000变成600
                allPointX:[], // 所有的点的x轴
                allPointY:[], // 所有的点的y轴
            }
        };
    },
    mounted(){
        this.createSvg();
        this.createX();
        this.createY();
        this.createLayer();
        
        let _this = this;
        _this.$nextTick(function(){
            _this.dom.gLayer.on("mousemove",function(e){
                if (!_this.dom.x1) return;
                if (_this.dom.clickNumber >= 5) return;
                _this.dom.x2 = d3.event.offsetX;
                _this.dom.y2 = d3.event.offsetY;                    
                if (!_this.dom.first) {
                    _this.dom.first = true;
                    _this.dom.activeLine = _this.dom.gLayer.append('line')
                        .attr("x1",_this.dom.x1)
                        .attr("y1",_this.dom.y1)
                        .attr("x2",_this.dom.x2)
                        .attr("y2",_this.dom.y2)
                        .attr('stroke',"red")
                        .attr("stroke-width","2")
                        .attr('class',"activeLine");
                } else {
                    _this.dom.activeLine.attr("x2",_this.dom.x2)
                        .attr("y2",_this.dom.y2);
                }
            }).on("click",function(d,i){
                _this.dom.first = false;
                if (_this.dom.clickNumber >= 5) return;
                _this.dom.clickNumber++;
                console.log(d3.event);
                _this.dom.x1 = _this.getLatestNum(d3.event.offsetX,_this.dom.allPointX);
                _this.dom.y1 = _this.getLatestNum(d3.event.offsetY,_this.dom.allPointY);
                console.log(_this.dom.x1,_this.dom.y1);
                if (!!_this.dom.activeLine) {
                    _this.dom.activeLine.attr("x2",_this.dom.x1).attr("y2",_this.dom.y1);
                }
                if (_this.dom.points.includes(`${_this.dom.x1},${_this.dom.y1}`)) {
                    return;
                }
                _this.dom.points.push(`${_this.dom.x1},${_this.dom.y1}`);
                _this.dom.gLayer.append('circle')
                    .attr('cx',_this.dom.x1)
                    .attr('cy',_this.dom.y1)
                    .attr('r','10' * _this.dom.scaleNum)
                    .attr('fill','red')
                    .attr('opacity',1)
                    .attr('class','selectedCircle');
            });
        })
    },
    methods:{
        backEvent(){
            this.$router.push({name:"/"})
        },
        createSvg(){ // 创建SVG
            this.dom.svg = d3.select(this.$refs.myDiv)
                            .append("svg")
                            .attr("width", "1000" * this.dom.scaleNum)
                            .attr("height", "800" * this.dom.scaleNum)
                            .attr("xmlns","http://www.w3.org/2000/svg")
                            .attr("style","border:1px solid black;");
        },
        createX(){ // 创建x轴和坐标圆点
            this.dom.gX = this.dom.svg.append('g')
                            .attr('class',"xAxis");
            this.dom.gX.append('line')
                        .attr('x1',"100" * this.dom.scaleNum)
                        .attr('y1',"700" * this.dom.scaleNum)
                        .attr('x2',"930" * this.dom.scaleNum)
                        .attr('y2',"700" * this.dom.scaleNum)
                        .attr('stroke',"black")
                        .attr('stroke-width',"1");
            this.dom.gX.append('polyline')
                        .attr('points',`${925  * this.dom.scaleNum},${695  * this.dom.scaleNum} ${930 * this.dom.scaleNum},${700  * this.dom.scaleNum} ${925 * this.dom.scaleNum},${705 * this.dom.scaleNum}`)
                        .attr('fill',"none")
                        .attr('stroke',"black");
            this.dom.gX.append('text')
                        .attr('x',"80" * this.dom.scaleNum)
                        .attr('y',"725" * this.dom.scaleNum)
                        .attr('fill',"black")
                        .text("0");
            for (let i = 1; i < 9; i++) {
                this.dom.gX.append('text')
                            .attr('x',(i + "94") * this.dom.scaleNum)
                            .attr('y',"725" * this.dom.scaleNum)
                            .attr('fill',"black")
                            .text(i.toString());
            }
        },
        createY(){ // 创建y轴
            this.dom.gY = this.dom.svg.append('g')
                            .attr('class',"yAxis");
            this.dom.gY.append('line')
                        .attr('x1',"100" * this.dom.scaleNum)
                        .attr('y1',"700" * this.dom.scaleNum)
                        .attr('x2',"100" * this.dom.scaleNum)
                        .attr('y2',"70" * this.dom.scaleNum)
                        .attr('stroke',"black")
                        .attr('stroke-width',"1");
            this.dom.gY.append('polyline')
                        .attr('points',`${95 * this.dom.scaleNum},${75 * this.dom.scaleNum} ${100 * this.dom.scaleNum},${70 * this.dom.scaleNum} ${105 * this.dom.scaleNum},${75 * this.dom.scaleNum}`)
                        .attr('fill',"none")
                        .attr('stroke',"black");
            for (let j = 6; j > 0; j--) {
                this.dom.gY.append('text')
                            .attr('x',"80" * this.dom.scaleNum)
                            .attr('y',(j +"05") * this.dom.scaleNum)
                            .attr('fill',"black")
                            .text(j.toString());
            }
        },
        createLayer(){ // layer层
            this.dom.gLayer = this.dom.svg.append('g')
                                .attr('class',"layer");
            // 画虚线
            for (let k = 1; k < 7; k++) {
                this.dom.gLayer.append('line')
                                .attr('x1',"100" * this.dom.scaleNum)
                                .attr('y1',(k + "00") * this.dom.scaleNum)
                                .attr('x2',"900" * this.dom.scaleNum)
                                .attr('y2',(k + "00") * this.dom.scaleNum)
                                .attr('stroke-width',"1")
                                .attr('stroke-dasharray',"5")
                                .attr("stroke","black");
            }
            for (let m = 2; m < 10; m++) {
                this.dom.gLayer.append('line')
                                .attr('x1',(m + "00") * this.dom.scaleNum)
                                .attr('y1',"100" * this.dom.scaleNum)
                                .attr('x2',(m + "00") * this.dom.scaleNum)
                                .attr('y2',"700" * this.dom.scaleNum)
                                .attr('stroke-width',"1")
                                .attr('stroke-dasharray',"5")
                                .attr("stroke","black");
            }
            // 画所有的点
            for (let j = 1; j < 10; j++) {
                for (let i = 1; i < 8; i++) {
                    let tempX = (j + '00') * this.dom.scaleNum;
                    let tempY = (i + '00') * this.dom.scaleNum;
                    if (!this.dom.allPointX.includes(tempX)) {
                        this.dom.allPointX.push(tempX);
                    } 
                    if (!this.dom.allPointY.includes(tempY)) {
                        this.dom.allPointY.push(tempY);
                    }
                    this.dom.gLayer.append('circle')
                                    .attr('cx',(j + '00') * this.dom.scaleNum)
                                    .attr('cy',(i + '00') * this.dom.scaleNum)
                                    .attr('r','10' * this.dom.scaleNum)
                                    .attr('fill','red')
                                    .attr('opacity',0)
                                    .attr('class','activeCircle');
                }
            }
        },
        getLatestNum(num,arr){
            let finallyNum = arr[arr.length-1];
            let tempObj = {
                diffValue:Math.abs(finallyNum-num), // 两个数的差值
                value:finallyNum // 差值最小的数
            }
            arr.forEach(element => {
                let tempDiffValue = Math.abs(element - num);
                if (tempDiffValue < tempObj.diffValue) {
                    tempObj.value = element;
                    tempObj.diffValue = tempDiffValue;
                }
            });
            return tempObj.value;
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
    text-align: center;
    padding-top:100px;
}
</style>
