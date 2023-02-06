import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'capabilities';

(() => {
  console.log('javascript is running...');
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );

  const texture = new THREE.TextureLoader().load('textures/pb-abs-1.jpg');

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const container = document.getElementById('threejs');
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(1000, 1000, 1000);

  // geometries
  const g1 = new THREE.BoxGeometry(1000, 1000, 1000);
  const g2 = new THREE.SphereGeometry(1000, 1000, 1000);
  const g3 = new THREE.CapsuleGeometry(400, 1000, 40, 80);
  const g4 = new THREE.ConeGeometry(400, 1000, 40, 80);
  const g5 = new THREE.TorusKnotGeometry(560, 50, 1000, 400, 15, 14);
  const material = new THREE.MeshBasicMaterial({
    color: 'white',
    map: texture,
  });

  // shapes
  const s1 = new THREE.Mesh(g1, material);
  const s2 = new THREE.Mesh(g2, material);
  const s3 = new THREE.Mesh(g3, material);
  const s4 = new THREE.Mesh(g4, material);
  const s5 = new THREE.Mesh(g5, material);

  // scene.add(s1);
  // scene.add(s2);
  // scene.add(s3);
  // scene.add(s4);
  scene.add(s5);

  controls.update();

  const shape_updater = (shape) => {
    shape.rotation.x += 0.001;
    shape.rotation.y += 0.005;
    shape.rotation.z += 0.003;
  };

  const animate = () => {
    requestAnimationFrame(animate);
    shape_updater(s5);
    controls.update();
    renderer.render(scene, camera);
  };

  //   check WebGL support by browsers
  if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate(s4);
  } else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
  }

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  addEventListener('resize', onWindowResize);
})();
