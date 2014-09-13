function Entity(rigidBody, mesh) {
	this.rigidBody = rigidBody;
	this.mesh = mesh;
}

Entity.prototype.update = function() {
	this.rigidBody.position.copy(this.mesh.position);
	this.rigidBody.quaternion.copy(this.mesh.quaternion);
}