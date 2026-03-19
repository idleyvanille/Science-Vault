<script>
const scene = new THREE.Scene();

// HIGH QUALITY RENDERER 🔥
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("sim"),
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, 500);

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/500, 0.1, 2000);
camera.position.set(0, 20, 60);

// CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// LIGHTING 💡
const light = new THREE.PointLight(0xffffff, 2, 1000);
scene.add(light);
scene.add(new THREE.AmbientLight(0x222222));

// STARFIELD 🌌
const stars = new THREE.BufferGeometry();
const starVertices = [];
for(let i=0;i<8000;i++){
  starVertices.push((Math.random()-0.5)*2000);
  starVertices.push((Math.random()-0.5)*2000);
  starVertices.push((Math.random()-0.5)*2000);
}
stars.setAttribute('position', new THREE.Float32BufferAttribute(starVertices,3));
const starMaterial = new THREE.PointsMaterial({color:0xffffff});
scene.add(new THREE.Points(stars, starMaterial));

// SUN ☀️
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5,64,64),
  new THREE.MeshBasicMaterial({color:0xffcc00})
);
scene.add(sun);

// PLANET CREATOR
function createPlanet(size,color,dist,speed){
  const geo = new THREE.SphereGeometry(size,32,32);
  const mat = new THREE.MeshStandardMaterial({color});
  const mesh = new THREE.Mesh(geo,mat);

  const pivot = new THREE.Object3D();
  scene.add(pivot);
  pivot.add(mesh);

  mesh.position.x = dist;

  return {pivot, speed};
}

// ALL PLANETS 🪐
const mercury = createPlanet(0.5,0xaaaaaa,8,0.02);
const venus   = createPlanet(0.9,0xffcc99,11,0.015);
const earth   = createPlanet(1,0x3399ff,14,0.01);
const mars    = createPlanet(0.8,0xff3300,17,0.008);
const jupiter = createPlanet(2.5,0xffcc99,22,0.006);
const saturn  = createPlanet(2.2,0xffddaa,28,0.005);
const uranus  = createPlanet(1.5,0x66ffff,34,0.003);
const neptune = createPlanet(1.5,0x3366ff,40,0.002);

// SATURN RINGS 💍
const ringGeo = new THREE.RingGeometry(3,5,64);
const ringMat = new THREE.MeshBasicMaterial({color:0xcccccc, side:THREE.DoubleSide});
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI/2;
saturn.pivot.children[0].add(ring);

// ANIMATION
function animate(){
  requestAnimationFrame(animate);

  mercury.pivot.rotation.y += mercury.speed;
  venus.pivot.rotation.y += venus.speed;
  earth.pivot.rotation.y += earth.speed;
  mars.pivot.rotation.y += mars.speed;
  jupiter.pivot.rotation.y += jupiter.speed;
  saturn.pivot.rotation.y += saturn.speed;
  uranus.pivot.rotation.y += uranus.speed;
  neptune.pivot.rotation.y += neptune.speed;

  controls.update();
  renderer.render(scene, camera);
}
animate();

// RESIZE FIX
window.addEventListener("resize", ()=>{
  renderer.setSize(window.innerWidth, 500);
  camera.aspect = window.innerWidth/500;
  camera.updateProjectionMatrix();
});
</script>
