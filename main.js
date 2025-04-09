// 初始化變數
let scene, camera, renderer, controls, phoneModel;
let rotationSpeed = 0.01;

// 設定場景
function initScene() {
    // 建立場景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xecf0f1);

    // 建立相機
    camera = new THREE.PerspectiveCamera(
        75, // 視野角度
        window.innerWidth / window.innerHeight, // 長寬比
        0.1, // 近裁剪面
        1000 // 遠裁剪面
    );
    camera.position.z = 5;

    // 建立渲染器
    const container = document.getElementById('phone-model-container');
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 加入環境光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 加入定向光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 設定OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;

    // 由於我們沒有實際的GLTF手機模型，先建立一個簡單的手機模型
    createPhoneModel();

    // 設定視窗大小變化事件
    window.addEventListener('resize', onWindowResize);

    // 啟動動畫迴圈
    animate();
}

// 建立簡單的手機模型
function createPhoneModel() {
    // 手機主體
    const phoneGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const phoneMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x000000, 
        shininess: 100
    });
    phoneModel = new THREE.Mesh(phoneGeometry, phoneMaterial);
    scene.add(phoneModel);

    // 螢幕
    const screenGeometry = new THREE.BoxGeometry(0.9, 1.9, 0.01);
    const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x3498db });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.06;
    phoneModel.add(screen);

    // 相機鏡頭
    const cameraGeometry = new THREE.CircleGeometry(0.1, 32);
    const cameraMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const phoneCam = new THREE.Mesh(cameraGeometry, cameraMaterial);
    phoneCam.position.set(0, 0.8, 0.06);
    phoneModel.add(phoneCam);

    // 按鈕
    const buttonGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.01);
    const buttonMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(0.55, 0, 0.01);
    phoneModel.add(button);

    // 設定手機的初始位置
    phoneModel.rotation.x = 0.2;
}

// 視窗大小變化時調整畫面
function onWindowResize() {
    const container = document.getElementById('phone-model-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// 更新每一幀
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// 按鈕控制功能
function setupControls() {
    document.getElementById('rotate-left').addEventListener('click', () => {
        phoneModel.rotation.y -= Math.PI / 4;
    });
    
    document.getElementById('rotate-right').addEventListener('click', () => {
        phoneModel.rotation.y += Math.PI / 4;
    });
    
    document.getElementById('zoom-in').addEventListener('click', () => {
        camera.position.z = Math.max(camera.position.z - 0.5, 2);
    });
    
    document.getElementById('zoom-out').addEventListener('click', () => {
        camera.position.z = Math.min(camera.position.z + 0.5, 10);
    });
}

// 當DOM完全載入後初始化場景
document.addEventListener('DOMContentLoaded', () => {
    initScene();
    setupControls();
});