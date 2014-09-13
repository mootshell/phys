var world, timestep = 1.0 / 60.0, gravity = -9.81;
var scene, camera, renderer;

var entities = [], player;

var pointLight;

var groundMaterial;

initTHREE();
initCANNON();
initEntities();

run();

function initTHREE() {
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	scene.add(camera);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	THREEx.WindowResize(renderer, camera);
}

function initCANNON() {
	world = new CANNON.World();
	world.gravity.set(0, 0, gravity);
	world.broadphase = new CANNON.NaiveBroadphase();
	world.solver.iterations = 10;
	
	groundMaterial = new CANNON.Material("groundMaterial");
    var groundContactMaterial = new CANNON.ContactMaterial(groundMaterial, groundMaterial, 0.4, 0.3);
	groundContactMaterial.contactEquationStiffness = 1e8;
    groundContactMaterial.contactEquationRegularizationTime = 3;
    groundContactMaterial.frictionEquationStiffness = 1e8;
    groundContactMaterial.frictionEquationRegularizationTime = 3;
    world.addContactMaterial(groundContactMaterial);
}

function initEntities() {
	// create the player
	var sphereBody = new CANNON.RigidBody(1, new CANNON.Sphere(1));
	world.add(sphereBody);
	
	var sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), new THREE.MeshLambertMaterial( { color: 0x00ff00 } ));
	scene.add(sphereMesh)
	
	makeEntity(sphereBody, sphereMesh);
	player = entities[0];
	
	// create the ground plane
	var groundBody = new CANNON.RigidBody(0, new CANNON.Plane(), groundMaterial);
	world.add(groundBody);
	
	var groundMesh = new THREE.Mesh(new THREE.PlaneGeometry(32, 32), new THREE.MeshLambertMaterial( { color: 0x666666 } ));
	scene.add(groundMesh);
	
	makeEntity(groundBody, groundMesh);
	
	/*
	// create a box to play with
	var boxBody = new CANNON.RigidBody(1, new CANNON.Box(1, 1, 1));
	world.add(boxBody);
	
	var boxMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial( { color: 0x00ffff } ));
	scene.add(boxMesh);
	
	makeEntity(boxBody, boxMesh);
	
	*/
	
	// adjust the player position
	player.rigidBody.position.z = 5;
	player.update();
	
	// adjust the ground position
	entities[1].rigidBody.position.z = -5;
	entities[1].update();
	
	// add lighting
	pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.x = player.mesh.position.x;
	pointLight.position.y = player.mesh.position.y - 2;
	pointLight.position.z = player.mesh.position.z + 2;
	scene.add(pointLight);
}

function run() {
	update();
	requestAnimationFrame(run);
	renderer.render(scene, camera);
}

function update() {
	world.step(timestep);
	
	
	if (moveForward && moveBackward) {
		player.rigidBody.velocity.y = 0;
	} else if (moveForward) {
		player.rigidBody.velocity.y = 10;
	} else if (moveBackward){
		player.rigidBody.velocity.y = -10;
	} else {
		player.rigidBody.velocity.y = 0;
	}
	
	if (moveLeft && moveRight) {
		player.rigidBody.velocity.x = 0;
	} else if (moveRight) {
		player.rigidBody.velocity.x = 10;
	} else if (moveLeft){
		player.rigidBody.velocity.x = -10;
	} else {
		player.rigidBody.velocity.x = 0;
	}
	
	if (jump) {
		player.rigidBody.velocity.z = 5;
		jump = false;
	}
	
	for (var i in entities) {
		entities[i].update();
	}
	
	updateCamera();
}

function updateCamera() {

	camera.position.x = player.mesh.position.x;
	camera.position.y = player.mesh.position.y - 6;
	camera.position.z = player.mesh.position.z + 5;
	
	camera.lookAt(new THREE.Vector3(player.mesh.position.x, player.mesh.position.y, player.mesh.position.z));
}

function makeEntity(rigidBody, mesh) {
	entities.push(new Entity(rigidBody, mesh));
}