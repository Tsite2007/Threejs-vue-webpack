<!--
    by:
    name: 占比测试
    notes:
-->
<template lang="html">
    <div class="testFrame">
        <div class="returnBack" @click="backEvent">返回</div>
        <div class="testTitle">
            <span class="animated zoomIn">占比测试</span>
        </div>
        <div class="testBody" >
            <div class="leftBody">
                <p>请你选择适当数量的黑棋子和白棋子，使其之间的关系和右图关系一致</p>
                <img src="../../../libs/images/public/rate.png" alt="" style="display:block;margin:50px auto;">
                <p>左侧数量：{{this.leftCount}}</p>
                <p>右侧数量：{{this.rightCount}}</p>
                <p>测试结果：{{this.result?"正确":"错误"}}</p>
                <a href="javascript:void(0)" class="resetBtn" @click="submit" >提交</a>
            </div>
            <div class="rightBody" ref="threeBox">

            </div>
        </div>
    </div>
</template>

<script>
var bg2 = require('../../../libs/images/public/bg2.png');
var leftImg = require('../../../libs/images/public/leftImg.png');
var rightImg = require('../../../libs/images/public/rightImg.png');
var THREE = require('three');
import TransformControls from "three/examples/js/controls/TransformControls";
import OrbitControls from "three/examples/js/controls/OrbitControls";
import DragControls from "three/examples/js/controls/DragControls";
// require('three-obj-loader')(THREE);
// var MTLLoader = require('three-mtl-loader');
// var obj= require("../../../libs/models/Wavefront/Food_Bowl.obj");
// var mtl = require("../../../libs/models/Wavefront/Food_Bowl.mtl");
export default {
    data(){
        return {
            leftCount:0,
            rightCount:0,
        };
    },
    mounted(){
        this.createThree();
    },
    computed:{
        result(){
            return this.leftCount/this.rightCount==3?true:false;
        }
    },
    methods:{
        submit(){
            if(this.result){
                alert('正确');
            }else{
                alert('错误');
            }
        },
        createThree(){
            var scene, camera, renderer, controls, light;
            var transformControls;
            var threeBox = this.$refs.threeBox;
            var self = this;
            // 场景
            function initScene() {
                scene = new THREE.Scene();
            }
            // 相机
            function initCamera() {
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
                camera.position.set(0, 250, 600);
                camera.lookAt(new THREE.Vector3(0, 0, 0));
            }
            // 渲染器
            function initRenderer() {
                // if (Detector.webgl) {//兼容性检测
                //     renderer = new THREE.WebGLRenderer({antialias: true});//像素级的渲染，渲染效果更好
                // } else {
                //     renderer = new THREE.CanvasRenderer();//几何级别的渲染，兼容性更好
                // }
                renderer = new THREE.WebGLRenderer({antialias: true,alpha:true});
                console.log(threeBox.clientWidth, threeBox.clientHeight);
                renderer.setSize(threeBox.clientWidth, threeBox.clientHeight);
                // renderer.setClearColor(0x000000);//渲染背景色
                threeBox.appendChild(renderer.domElement);
            }
            // 初始化灯光
            function initLight() {

                // 灯光1
                light = new THREE.SpotLight(0xffffff);//聚光灯
                light.position.set(-400, -400, -400);
                light.intensity=0.1;
                light.castShadow = true;
                scene.add(light);

                light = new THREE.SpotLight(0xffffff);//聚光灯
                light.position.set(800, 800, 800);
                light.intensity=1;
                light.castShadow = true;
                scene.add(light);


                var _light = new THREE.AmbientLight(0x5C5C5C)
                _light.intensity=1;
                scene.add(_light);//环境光




                //灯光2
                // var shadowConfig = {
    			// 	shadowCameraVisible: false,
    			// 	shadowCameraNear: 750,
    			// 	shadowCameraFar: 4000,
    			// 	shadowCameraFov: 30,
    			// 	shadowBias: -0.0002
    			// };
                // var ambientLight = new THREE.AmbientLight( 0x3f2806 );
				// scene.add( ambientLight );
				//  var pointLight = new THREE.PointLight( 0xffaa00, 1, 5000 );
				// scene.add( pointLight );
				// var sunLight = new THREE.SpotLight( 0xffffff, 0.7, 0, Math.PI/2 );
				// sunLight.position.set( 1000, 2000, 1000 );
				// sunLight.castShadow = true;
				// sunLight.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( shadowConfig.shadowCameraFov, 1, shadowConfig.shadowCameraNear, shadowConfig.shadowCameraFar ) );
				// sunLight.shadow.bias = shadowConfig.shadowBias;
				// scene.add( sunLight );

            }
            function CubeContainer(){
                this.mesh = new THREE.Object3D();// 创建一个空的容器
                this.nClouds = 12;// 创建6个立方体
                this.mesh.name="cubeContainer";
                var cubeGeometry = new THREE.SphereGeometry(20, 50, 50);
                var texture1 = new THREE.TextureLoader().load('/page/images/leftImg.png');
                var texture2 = new THREE.TextureLoader().load('/page/images/rightImg.png');
                var cubeMaterial = new THREE.MeshPhongMaterial({color: 0xb84cd8,map : texture1});
                cubeMaterial.wireframe=true;

                for(let i=0,x=0,y=0; i<this.nClouds; i++){
                    //立方体
                    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                    cube.name = "myLeftBall";
                    x=i%4*40;
                    y=parseInt(i/4)*40;
                    console.log(x,y);
                    cube.position.set(x+20-300,y+200,0);
                    this.mesh.add(cube);
                }
                //右侧球
                var cubeMaterial = new THREE.MeshPhongMaterial({color: 0xd07e3e,map: texture2  });
                for(let i=0,x=0,y=0; i<this.nClouds; i++){
                    //立方体
                    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                    cube.name = "myRightBall";
                    x=i%4*40;
                    y=parseInt(i/4)*40;
                    console.log(x,y);
                    cube.position.set(x+360-200,y+200,0);
                    this.mesh.add(cube);
                }
                // //碗(加载mtl+obj模型文件)
                // var mtlLoader = new MTLLoader();
                // mtlLoader.setPath('/page/images/');
                // //加载mtl文件
                // mtlLoader.load('Food_Bowl.mtl', function (material) {
                //     var objLoader = new THREE.OBJLoader();
                //     //设置当前加载的纹理
                //     objLoader.setMaterials(material);
                //     objLoader.setPath('/page/images/');
                //     objLoader.load('Food_Bowl.obj', function (object) {
                //         //将模型缩放并添加到场景当中
                //         object.scale.set(50, 50, 50);
                //         scene.add(object);
                //     })
                // });
                //下侧盒子(六个面组成)
                var rectShape = new THREE.Shape();
                rectShape.moveTo( -200,0 );
                rectShape.lineTo( 200, 0 );
                rectShape.lineTo( 200, 100 );
                rectShape.lineTo( -200, 100 );
                rectShape.lineTo( -200,0 );
                var cubeGeometry = new THREE.ShapeGeometry( rectShape );
                var cubeMaterial = new THREE.MeshLambertMaterial( {color: 0xf3eebb} );
                cubeMaterial.side=THREE.DoubleSide;//几何体的哪一面应用这个材质，默认为THREE.FrontSide(前外面)，还有THREE.BackSide(后内面)和THREE.DoubleSide(两面)
                var cube1 = new THREE.Mesh( cubeGeometry, cubeMaterial) ;
                cube1.name = "myBox";
                cube1.translateZ(200);
                this.mesh.add( cube1 );

                var cubeGeometry = new THREE.ShapeGeometry( rectShape );
                var cube2 = new THREE.Mesh( cubeGeometry, cubeMaterial) ;
                cube2.name = "myBox";
                cube2.translateZ(-200);
                this.mesh.add( cube2 );

                var cubeGeometry = new THREE.ShapeGeometry( rectShape );
                var cube3 = new THREE.Mesh( cubeGeometry, cubeMaterial) ;
                cube3.name = "myBox";
                cube3.translateX(-200);
                cube3.rotateY(Math.PI/2);
                this.mesh.add( cube3 );

                var cubeGeometry = new THREE.ShapeGeometry( rectShape );
                var cube4 = new THREE.Mesh( cubeGeometry, cubeMaterial) ;
                cube4.name = "myBox";
                cube4.translateX(200);
                cube4.rotateY(Math.PI/2);
                this.mesh.add( cube4 );
                //底面
                var rectShape = new THREE.Shape();
                rectShape.moveTo( -200,0 );
                rectShape.lineTo( 200, 0 );
                rectShape.lineTo( 200, 400 );
                rectShape.lineTo( -200, 400 );
                rectShape.lineTo( -200,0 );
                var cubeGeometry = new THREE.ShapeGeometry( rectShape );
                var cube5 = new THREE.Mesh( cubeGeometry, cubeMaterial) ;
                cube5.name = "myBox";
                cube5.translateZ(-200);
                cube5.translateY(2);
                cube5.rotateX(Math.PI/2);
                this.mesh.add( cube5 );





                // var cubeGeometry = new THREE.CubeGeometry( 400, 100, 400 );
                // var cubeMaterial = new THREE.MeshLambertMaterial( {
                //     color: 0xFFCC33,
                //     transparent:true,
                //     opacity:0.4,
                // } );
                // var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
                // cube.name = "myBox";
                // cube.position.set(0,50,0);
                // this.mesh.add( cube );
            }
            // 初始化模型
            function initContent() {
                //网格辅助线(网格宽度、等分数、中心线颜色，网格线颜色)
                var helper = new THREE.GridHelper(1200, 50, 0x8dcbbd,0x8dcbbd);
                scene.add(helper);
                var cubeContainer = new CubeContainer();
                scene.add(cubeContainer.mesh);
            }
            // 窗口变动触发的方法
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
            // 键盘按下触发的方法
            function onKeyDown(event) {
                switch (event.keyCode) {
                    case 13:
                        initCamera();
                        initControls();
                        break;
                }
            }
            //用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
            function initControls() {
                controls = new OrbitControls(camera, renderer.domElement);
                controls.enableZoom=false;
                controls.enablePan=false;
                controls.maxPolarAngle = Math.PI * 0.5;
                //上下角度
                // controls.minAzimuthAngle = - Math.PI * 0.4;
                // controls.maxAzimuthAngle = Math.PI * 0.4;
                // 左右角度
                // controls.minAzimuthAngle = 0;
                // controls.maxAzimuthAngle = 0;
                controls.minDistance = 1000;
                controls.maxDistance = 5000;
                controls.rotateSpeed = 0.5;

            }
            // 添加拖拽控件
            function initDragControls() {
                // 添加平移控件
                transformControls = new THREE.TransformControls(camera, renderer.domElement);
                scene.add(transformControls);

                var cubeContainer=scene.getObjectByName("cubeContainer");
                // 过滤不是 Mesh 的物体,例如辅助网格
                var objects = [];
                cubeContainer.children.forEach((item,arr)=>{
                    if (item.isMesh && item.name!="myBox")objects.push(item);
                })

                // 初始化拖拽控件
                var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
                // 鼠标略过事件
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
                });

                // 拖拽结束
                dragControls.addEventListener('dragend', function (event) {
                    console.log(1111,event.object);
                    //x轴阈值
                    if(event.object.position.x<=-400)event.object.position.x=-400;
                    if(event.object.position.x>=400)event.object.position.x=400;
                    //z轴阈值
                    if(event.object.position.z<=-180)event.object.position.z=-180;
                    if(event.object.position.z>=180)event.object.position.z=180;
                    //超过y负方向自动归零
                    if(event.object.position.y<20)event.object.position.y=20;
                    //计算有效的球体数量
                    self.leftCount=0;
                    self.rightCount=0;
                    var cubeContainer=scene.getObjectByName("cubeContainer");
                    cubeContainer.children.forEach((item,arr)=>{

                        if (item.isMesh && item.name=="myLeftBall"){
                            if(item.position.x>=-200&&item.position.x<=200&&item.position.y<=100){
                                self.leftCount++;
                            }
                        };
                        if (item.isMesh && item.name=="myRightBall"){
                            if(item.position.x>=-200&&item.position.x<=200&&item.position.y<=100){
                                self.rightCount++;
                            }
                        };
                    })

                    console.log(self.result);
                    controls.enabled = true;
                });
            }

            function eachChild(object){
                var childrenList=object.parent.children,
                    position=object.position;

            }
            // 更新控件
            function update() {
                controls.update();
                // controls.handleResize();
                // transformControls.update();
            }
            // 初始化
            function init() {
                initScene();
                initCamera();
                initRenderer();
                initLight();
                initContent();
                initControls();
                initDragControls();
                addEventListener('resize', onWindowResize, false);
                addEventListener('keydown', onKeyDown, false);
                // self.$refs.resetBtn.onclick=function(){
                //     CubeContainer();
                //     initContent();
                //     initControls();
                //     initDragControls();
                // }
            }
            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
                update();
            }
            init();
            animate();
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
    left: 10px;
    top: 60px;
    right: 10px;
    bottom: 10px;
    background-color: #f5f5f5;
    z-index: 1;
    .leftBody{
        width: 300px;
        font-size: 20px;
        font-weight: bold;
        line-height: 1.5;
        float: left;
        display: inline-block;
        padding: 20px;
        .resetBtn{
            margin-top: 20px;
            display: block;
            width: 120px;
            height: 36px;
            font-size: 16px;
            border-radius: 5px;
            background-color:#3988f7;
            color: #ffffff;
            text-align: center;
            line-height: 36px;
            font-weight: bold;
            text-decoration: none;
        }
    }
    .rightBody{
        display: inline-block;
        width:calc(~'100% -'300px);
        height: 100%;
        float: right;
        background: url("~@image/public/bg2.png") no-repeat;
        // background: url("../../../libs/images/public/bg2.png") no-repeat;
        background-size: cover;
    }

}
</style>
