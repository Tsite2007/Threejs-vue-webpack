<!--
    by:
    name: 组合测试
    notes:
-->
<template lang="html">
    <div class="testFrame">
        <div class="returnBack" @click="backEvent">返回</div>
        <div class="testTitle">
            <span class="animated zoomIn">组合测试</span>
        </div>
        <div class="testBody" ref="contentBody">
            
        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
//import Detector from "three/examples/js/Detector";
import DragControls from "three/examples/js/controls/DragControls";
import TransformControls from "three/examples/js/controls/TransformControls";
import OrbitControls from "three/examples/js/controls/OrbitControls";

var scene, camera, renderer, controls, light;
var transformControls;
var loader = new THREE.TextureLoader();
var dragStartP={};
// 场景
function initScene() {
    scene = new THREE.Scene();
}
// 相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / (window.innerHeight-60), 0.1, 10000);
    camera.position.set(50, 150, 500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}
// 初始化灯光
function initLight() {
    light = new THREE.SpotLight(0xffffff);//聚光灯
    light.position.set(-300, 600, 200);
    light.intensity=0.6;
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x75b7f6));//环境光
}
//正方体
function CubeContainer(){
    this.mesh = new THREE.Object3D();// 创建一个空的容器        
    this.nClouds = 6;// 创建6个立方体
    this.mesh.name="cubeContainer";
    var cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
    
    var cubeEdges = new THREE.EdgesGeometry(cubeGeometry, 1);
    var edgesMtl =  new THREE.LineBasicMaterial({color: 0x000000,lineWidth:2000});
    
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xbd88e2});
    for(var i=1; i<this.nClouds+1; i++){
        //立方体             
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        var cubeLine = new THREE.LineSegments(cubeEdges, edgesMtl);
        cube.add(cubeLine);
        var x=Number((i%2==0?"-":"")+60*(i>3?i-1:i)),
            y=25,
            z=Number((i%2==0?"-":"")+60*(i>2?i-4:i));
        
        x=Math.floor(x/50)*50;
        y=Math.floor(y/25)*25;
        z=Math.floor(z/50)*50;
        cube.position.set(x,y,z);
        this.mesh.add(cube);
    }
}
// 初始化模型
function initContent() {
    //网格辅助线(网格宽度、等分数、中心线颜色，网格线颜色)
    var helper = new THREE.GridHelper(1200, 70,0xcdd9f1,0xcdd9f1);
    scene.add(helper);
    var cubeContainer = new CubeContainer();
    scene.add(cubeContainer.mesh);
}
//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
function initControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom=false;
    controls.enablePan=false;
    controls.maxPolarAngle = Math.PI * 0.4;
    controls.minAzimuthAngle = - Math.PI * 0.4;
    controls.maxAzimuthAngle = Math.PI * 0.4;
    controls.minDistance = 1000;
    controls.maxDistance = 5000;
}
// 添加拖拽控件
function initDragControls() {
    // 添加平移控件
    transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.setSize(0.6);
    transformControls.addEventListener( 'change', render );
    scene.add(transformControls);
    
    var cubeContainer=scene.getObjectByName("cubeContainer");
    // 过滤不是 Mesh 的物体,例如辅助网格
    var objects = [];
    for (let i = 0; i < cubeContainer.children.length; i++) {
        if (cubeContainer.children[i].isMesh){
            objects.push(cubeContainer.children[i]);
        }
    }
    // 初始化拖拽控件
    var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
    // 鼠标划中事件
    dragControls.addEventListener('hoveron', function (event) {
        // 让变换控件对象和选中的对象绑定
        transformControls.attach(event.object);
    });
    // 鼠标划过事件
    dragControls.addEventListener('hoveroff', function (event) {
        // 让变换控件对象和选中的对象解绑
        transformControls.detach(event.object);
    });
    // 开始拖拽
    dragControls.addEventListener('dragstart', function (event) {
        controls.enabled = false;
        dragStartP=JSON.parse(JSON.stringify(event.object.position));
    });
    // 拖拽结束
    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true;
        eachChild(event.object);
        dragStartP={};
    });
}
function eachChild(object){
    var children=object.parent.children,
        objectP=object.position;
        var minX=Infinity,minY=Infinity,minZ=Infinity,oo=Infinity;
        var minObj=null;
    for(var i=0;i<children.length;i++){
        if(children[i].uuid==object.uuid){continue;}
        var childP=children[i].position;
        var xValue=childP.x-objectP.x,
            yValue=childP.y-objectP.y,
            zValue=childP.z-objectP.z;
        if(Math.abs(xValue)<60 && Math.abs(zValue)<60 && Math.abs(yValue)<60){
            if(Math.min(minX,Math.abs(xValue)) + Math.min(minY,Math.abs(yValue)) + Math.min(minZ,Math.abs(zValue)) < oo){
                minObj=children[i];
                minX=Math.min(minX,Math.abs(xValue));
                minY=Math.min(minY,Math.abs(yValue));
                minZ=Math.min(minZ,Math.abs(zValue));
                oo=minX + minY + minZ;
            }
        }
    }
    if(!minObj){
        controlPosition(object);
        return;
    }
    var childP=minObj.position;
    var xValue=Math.abs(childP.x-objectP.x)-50,
        yValue=Math.abs(childP.y-objectP.y)-50,
        zValue=Math.abs(childP.z-objectP.z)-50;
    
    if(Math.abs(xValue)== Math.min(Math.abs(xValue),Math.abs(yValue),Math.abs(zValue))){
        object.position.x=(childP.x>objectP.x)?childP.x-50:childP.x+50;
        object.position.z=childP.z;
        object.position.y=childP.y;
    }
    if(Math.abs(yValue)== Math.min(Math.abs(xValue),Math.abs(yValue),Math.abs(zValue))){
        object.position.y=(childP.y>objectP.y)?childP.y-50:childP.y+50;
        object.position.z=childP.z;
        object.position.x=childP.x;
    }
    if(Math.abs(zValue)== Math.min(Math.abs(xValue),Math.abs(yValue),Math.abs(zValue))){
        object.position.z=(childP.z>objectP.z)?childP.z-50:childP.z+50;
        object.position.x=childP.x;
        object.position.y=childP.y;
    }
    controlPosition(object);
}
function controlPosition(object){
    object.position.z=Math.floor(object.position.z/50)*50;
    object.position.x=Math.floor(object.position.x/50)*50;
    object.position.y=Math.floor(object.position.y/25)*25;
    if(object.position.y<25)object.position.y=25;
    if(object.position.y>200)object.position.y=200;
    if(object.position.x<-400)object.position.x=-400;
    if(object.position.x>400)object.position.x=400;
    if(object.position.z<-300)object.position.z=-300;
    if(object.position.z>300)object.position.z=300;
    
    var children=object.parent.children,
        objectP=object.position;
    for(var i=0;i<children.length;i++){
        if(children[i].uuid==object.uuid){continue;}
        var childP=children[i].position;
        var xValue=childP.x-objectP.x,
            yValue=childP.y-objectP.y,
            zValue=childP.z-objectP.z;
        if(xValue==0 && zValue==0 && yValue==0){
            object.position.x=dragStartP.x;
            object.position.y=dragStartP.y;
            object.position.z=dragStartP.z;
            break
        }
    }
}
// 窗口变动触发的方法
function onWindowResize() {
    camera.aspect = window.innerWidth / (window.innerHeight-60);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight-60);
}
// 更新控件
function update() {
    controls.update();
}
function render() {
    renderer.render( scene, camera );
}

export default {
    data(){
        return {

        };
    },
    mounted(){
        this.init();
        this.loop();
    },
    methods:{
        init(){
            initScene();
            initCamera();
            this.initRenderer();
            initLight();
            initContent();
            initControls();
            initDragControls();
            addEventListener('resize', onWindowResize, false);
        },
        loop() {
            requestAnimationFrame(this.loop);
            render()
            update();
        },
        // 渲染器
        initRenderer() {
            //if(Detector.webgl){
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });//像素级的渲染，渲染效果更好
            renderer.setPixelRatio( window.devicePixelRatio );
            // }else{
            //     renderer= new THREE.CanvasRenderer();//几何级别渲染
            // }
            renderer.setSize(window.innerWidth, window.innerHeight-60);
            
            this.$refs.contentBody.appendChild(renderer.domElement);
        },
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
    left: 0px;
    top: 60px;
    right: 0px;
    bottom: 0px;
    z-index: 1;
    background: url("~@image/public/bg.png") no-repeat;
    background-size: cover;
}
</style>
