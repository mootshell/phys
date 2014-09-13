var moveForward = false;
var forwardKey = "w";

var moveBackward = false;
var backwardKey = "s";

var moveLeft = false;
var leftKey = "a";

var moveRight = false;
var rightKey = "d";

var jump = false;
var jumpKey = "space"

Mousetrap.bind(forwardKey, function () {
	moveForward = true;
}, "keydown");

Mousetrap.bind(backwardKey, function () {
	moveBackward = true;
}, "keydown");

Mousetrap.bind(leftKey, function () {
	moveLeft = true;
}, "keydown");

Mousetrap.bind(rightKey, function () {
	moveRight = true;
}, "keydown");

Mousetrap.bind(forwardKey, function () {
	moveForward = false;
}, "keyup");

Mousetrap.bind(backwardKey, function () {
	moveBackward = false;
}, "keyup");

Mousetrap.bind(leftKey, function () {
	moveLeft = false;
}, "keyup");

Mousetrap.bind(rightKey, function () {
	moveRight = false;
}, "keyup");

Mousetrap.bind(jumpKey, function () {
	jump = true;
}, "keyup");