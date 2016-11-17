/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const shaders_1 = __webpack_require__(2);
	const webgl_utils_1 = __webpack_require__(3);
	function main() {
	    const canvas = document.querySelector('canvas');
	    canvas.width = 500;
	    canvas.height = 500;
	    const gl = canvas.getContext('webgl');
	    const program = webgl_utils_1.createProgramAndShaders(gl, shaders_1.vertexShader, shaders_1.fragmentShader);
	    gl.useProgram(program);
	    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	    const count = 1;
	    const positions = [-1.0, -1.0];
	    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
	    render(gl, positionAttributeLocation, positions, count);
	}
	function render(gl, positionAttributeLocation, positions, count) {
	    const size = 2;
	    const type = gl.FLOAT;
	    const primitiveType = gl.LINE_STRIP;
	    const normalize = false;
	    const stride = 0;
	    const offset = 0;
	    const positionBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	    gl.enableVertexAttribArray(positionAttributeLocation);
	    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
	    webgl_utils_1.clearCanvas(gl);
	    gl.drawArrays(primitiveType, offset, count);
	    window.requestAnimationFrame(() => {
	        const lastX = positions[positions.length - 2];
	        let newPositions = [];
	        if (lastX < 1) {
	            newPositions = positions.concat([lastX + 0.01, (Math.random() * 2) - 1]);
	        }
	        else {
	            newPositions = positions
	                .slice(2, positions.length)
	                .reduce((acc, curr, index) => {
	                if (index % 2 === 0) {
	                    acc.push(curr - 0.01);
	                }
	                else {
	                    acc.push(curr);
	                }
	                return acc;
	            }, [])
	                .concat([1, (Math.random() * 2) - 1]);
	        }
	        render(gl, positionAttributeLocation, newPositions, count === 200 ? 200 : count + 1);
	    });
	}
	main();


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	exports.fragmentShader = `
	    precision mediump float;

	    void main(void) {
	        // Look up a color from the texture.
	        gl_FragColor = vec4(1., 0.0, 0., 1.);
	    }
	`;
	exports.vertexShader = `
	    attribute vec2 a_position;

	    void main() {
	        gl_Position = vec4(a_position, 0, 1);
	    }
	`;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	function createShader(gl, type, source) {
	    if (gl === null || gl === undefined) {
	        throw new Error('No webgl context');
	    }
	    const shader = gl.createShader(type);
	    gl.shaderSource(shader, source);
	    gl.compileShader(shader);
	    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	        return shader;
	    }
	    console.log(gl.getShaderInfoLog(shader));
	    gl.deleteShader(shader);
	    throw new Error('Error compiling shader');
	}
	exports.createShader = createShader;
	function createProgram(gl, vertexShader, fragmentShader) {
	    const program = gl.createProgram();
	    gl.attachShader(program, vertexShader);
	    gl.attachShader(program, fragmentShader);
	    gl.linkProgram(program);
	    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
	        return program;
	    }
	    console.log(gl.getProgramInfoLog(program));
	    gl.deleteProgram(program);
	    throw new Error('Could not create program');
	}
	exports.createProgram = createProgram;
	function createProgramAndShaders(gl, vertexShaderSource, fragmentShaderSource) {
	    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
	    return createProgram(gl, vertexShader, fragmentShader);
	}
	exports.createProgramAndShaders = createProgramAndShaders;
	function resizeCanvasToDiosplaySize(canvas) {
	    // Lookup the size the browser is displaying the canvas.
	    const displayWidth = canvas.clientWidth;
	    const displayHeight = canvas.clientHeight;
	    // Check if the canvas is not the same size.
	    if (canvas.width != displayWidth ||
	        canvas.height != displayHeight) {
	        // Make the canvas the same size
	        canvas.width = displayWidth;
	        canvas.height = displayHeight;
	    }
	    canvas.width = 500;
	    canvas.height = 500;
	}
	exports.resizeCanvasToDiosplaySize = resizeCanvasToDiosplaySize;
	;
	function clearCanvas(gl) {
	    // Clear the canvas
	    gl.clearColor(0, 0, 0, 0);
	    gl.clear(gl.COLOR_BUFFER_BIT);
	}
	exports.clearCanvas = clearCanvas;


/***/ }
/******/ ]);