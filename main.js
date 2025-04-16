// 移除 phoneModels 與 phoneSpecs，改為 fetch 載入 JSON
let scene, camera, renderer, controls, phoneModel;
let loadingManager, gltfLoader;
let phoneModels = {};
let currentModel = '';
let isLoading = false;
let modelsData = [];

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

    // 設定陰影
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 加入環境光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // 加入定向光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // 加入點光源
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, 0, 5);
    scene.add(pointLight);

    // 設定 OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;
    controls.minDistance = 3;
    controls.maxDistance = 10;

    // 初始化載入管理器
    loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = function() {
        document.querySelector('.loading-indicator').style.display = 'block';
        isLoading = true;
    };
    loadingManager.onLoad = function() {
        document.querySelector('.loading-indicator').style.display = 'none';
        isLoading = false;
    };
    
    // 初始化 GLTF 載入器
    gltfLoader = new THREE.GLTFLoader(loadingManager);
    
    // 載入 JSON 資料
    fetch('phones.json')
        .then(res => res.json())
        .then(data => {
            modelsData = data.models;
            // 以第一支手機為預設
            phoneModels = {};
            data.models.forEach(model => {
                phoneModels[model.id] = model;
            });
            currentModel = data.models[0].id;
            // 動態產生選擇按鈕
            renderModelButtons();
            loadPhoneModel(currentModel);
        });

    // 設定視窗大小變化事件
    window.addEventListener('resize', onWindowResize);

    // 啟動動畫迴圈
    animate();
}

// 動態產生手機選擇按鈕
function renderModelButtons() {
    const selection = document.querySelector('.model-selection');
    selection.innerHTML = '';
    modelsData.forEach(model => {
        const btn = document.createElement('button');
        btn.className = 'model-btn' + (model.id === currentModel ? ' active' : '');
        btn.dataset.model = model.id;
        btn.textContent = model.name;
        btn.addEventListener('click', () => {
            if (model.id !== currentModel && !isLoading) {
                loadPhoneModel(model.id);
            }
        });
        selection.appendChild(btn);
    });
}

// 載入手機模型
function loadPhoneModel(modelId) {
    if (isLoading) return;
    
    // 移除舊模型
    if (phoneModel) {
        scene.remove(phoneModel);
        phoneModel = null;
    }
    
    const model = phoneModels[modelId];
    // 更新手機資訊
    document.getElementById('phone-name').textContent = model.name;
    document.getElementById('phone-description').textContent = model.description;
    updatePhoneSpecs(model);
    // 更新選擇按鈕的活動狀態
    document.querySelectorAll('.model-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.model === modelId) {
            btn.classList.add('active');
        }
    });
    
    // 載入新模型
    gltfLoader.load(model.path, function(gltf) {
        phoneModel = gltf.scene;
        
        // 設定模型比例
        phoneModel.scale.set(model.scale, model.scale, model.scale);
        
        // 設定模型位置
        phoneModel.position.set(
            model.position.x,
            model.position.y,
            model.position.z
        );
        
        // 設定模型旋轉
        phoneModel.rotation.set(
            model.rotation.x,
            model.rotation.y,
            model.rotation.z
        );
        
        // 設定陰影
        phoneModel.traverse(function(node) {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        
        scene.add(phoneModel);
        
        // 重置控制
        controls.reset();
        
        currentModel = modelId;
    }, 
    // 進度回調
    function(xhr) {
        console.log('模型載入進度：' + (xhr.loaded / xhr.total) * 100 + '%');
    }, 
    // 錯誤回調
    function(error) {
        console.error('模型載入錯誤：', error);
        document.querySelector('.loading-indicator').style.display = 'none';
        isLoading = false;
    });
}

// 輔助函式：根據目前手機顯示詳細規格
function updatePhoneSpecs(model) {
    const specs = model.specs;
    const descElem = document.getElementById('phone-description');
    if (specs) {
        let html = '<ul style="margin-top: 1em;">';
        for (const key in specs) {
            html += `<li><strong>${key}：</strong>${specs[key]}</li>`;
        }
        html += '</ul>';
        descElem.innerHTML = html;
    }
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
    // 旋轉和縮放控制
    document.getElementById('rotate-left').addEventListener('click', () => {
        if (phoneModel) phoneModel.rotation.y -= Math.PI / 4;
    });
    
    document.getElementById('rotate-right').addEventListener('click', () => {
        if (phoneModel) phoneModel.rotation.y += Math.PI / 4;
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