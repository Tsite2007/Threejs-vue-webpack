<!--
    by:
    name: 旋转测试
    notes:
-->
<template lang="html">
    <div class="testFrame">
        <div class="returnBack" @click="backEvent">返回</div>
        <div class="testTitle">
            <span class="animated zoomIn">旋转测试</span>
        </div>
        <div class="testBody">
            <div class="gameWrap"></div>
            <el-button @click="handleSure" size="medium" class="btn">确认</el-button>
        </div>
    </div>
</template>

<script>
const d3 = require("d3");

export default {
    data() {
        return {
            svg: '',
            dx: 0,
            dy: 0,
            pointA: {
                x: 240,
                y: 80
            },
            pointB: {
                x: 360,
                y: 160
            },
            pointC: {
                x: 240,
                y: 160
            },
            textDx: 0,
            textDy: 0
        };
    },
    mounted() {
        this.createGrid();
        this.onDrag();
    },
    methods: {
        backEvent() {
            this.$router.push({ name: "/" });
        },
        createGrid() {
            let w = 800;
            let h = 320;
            this.svg = d3.select('.gameWrap').append('svg').attr('width', w).attr('height', h);

            this.svg.append('g').attr('class', 'verLine');
            this.svg.append('g').attr('class', 'herLine');
            this.svg.append('g').attr('class', 'triangle');
            // 画竖线
            for (let i = 0; i < 21; i++) {
                this.svg.select('.verLine').append('line')
                    .attr('x1', i * 40)
                    .attr('x2', i * 40)
                    .attr('y1', '0')
                    .attr('y2', '320')
                    .attr('stroke', '#000000')
                    .attr('stroke-width', '0.4');
            }

            // 画横线
            for (let j = 0; j < 9; j++) {
                this.svg.select('.herLine').append('line')
                    .attr('x1', '0')
                    .attr('x2', '800')
                    .attr('y1', j * 40)
                    .attr('y2', j * 40)
                    .attr('stroke', '#000000')
                    .attr('stroke-width', '0.4');
            }
            
            // 画初始三角形
            this.createOriTriangle(this.pointA, this.pointB, this.pointC);
        },
        createOriTriangle(pointA, pointB, pointC) {
            this.svg.select('.triangle').append('path')
                .attr('d', `M${pointA.x} ${pointA.y} L${pointB.x} ${pointB.y} L${pointC.x} ${pointC.y} Z`)
                .attr('fill', 'rgba(0, 0, 0, 0)')
                .attr('stroke', '#000000')
                .attr('stroke-width', '2')
                .attr('class', 'trianglePath');


            this.svg.select('.triangle').append('text')
                .attr('x', '220')
                .attr('y', '70')
                .text('A');
            this.svg.select('.triangle').append('text')
                .attr('x', '370')
                .attr('y', '180')
                .text('B');
            this.svg.select('.triangle').append('text')
                .attr('x', '220')
                .attr('y', '180')
                .text('C');

        },
        onDrag() {
            let _this = this;
            // 注册三角形拖拽事件，拖拽触发平移
            let drag = d3.drag().on('drag', function(d) {
                _this.keepPaceOffset(d3.event.dx, d3.event.dy, this, 'text');
            }).on('end', function(d) {
                // 纠正量
                let x = _this.pointB.x % 40 - 20 >= 0 ? 40 - _this.pointB.x % 40 : 0 - _this.pointB.x % 40;
                let y = _this.pointB.y % 40 - 20 >= 0 ? 40 - _this.pointB.y % 40 : 0 - _this.pointB.y % 40;

                _this.keepPaceOffset(x, y, this, 'text');
            });
            // 注册字母拖拽事件，拖拽触发旋转
            let dragWord = d3.drag().on('drag', function(d) {
                if (d3.event.dx > 0) {
                    _this.textDx += d3.event.dx;
                    _this.textDy += d3.event.dy;
                }
                d3.select('.triangle').attr('transform', `rotate(${_this.textDx % 360 * 0.5})`)
                    .attr('transform-origin', `${_this.pointB.x} ${_this.pointB.y}`);
                
                // d3.select('.triangle').attr('transform', 'rotate(90)')
                //     .attr('transform-origin', `${_this.pointB.x} ${_this.pointB.y}`);
            }).on('end', function(d) {
                
            });
            // 拖拽事件绑定到三角形上
            _this.svg.selectAll('.trianglePath').call(drag);

            _this.svg.selectAll('text').call(dragWord);
        },
        // 同步偏移量
        keepPaceOffset(x, y, selector1, selector2) {
            this.pointA.x += x;
            this.pointA.y += y;
            this.pointB.x += x;
            this.pointB.y += y;
            this.pointC.x += x;
            this.pointC.y += y;
            this.dx += x;
            this.dy += y;

            d3.select(selector1).attr('transform', `translate(${this.dx}, ${this.dy})`);
            d3.selectAll(selector2).attr('transform', `translate(${this.dx}, ${this.dy})`);
        },
        handleSure() {
            this.svg.select('.trianglePath').on('.drag', null);
            this.svg.selectAll('text').on('.drag', null);
        }
    }
};
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.07);
    span {
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
    text-align: center;
    .gameWrap {
        padding-top: 150px;
        text-align: center;
        svg {
            line {
                stroke: #000000;
                stroke-width: 0.4;
            }
            .triangle {
                line {
                    stroke-width: 2;
                }
            }
        }
    }
    .btn {
        margin-top: 50px;
    }
}
</style>
