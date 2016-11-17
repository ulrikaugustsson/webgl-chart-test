import { vertexShader, fragmentShader } from './shaders';
import { createProgramAndShaders, clearCanvas } from './webgl_utils';

function main(): void {
  const canvas = document.querySelector('canvas');
  canvas.width = 500;
  canvas.height = 500;

  const gl = canvas.getContext('webgl');

  const program = createProgramAndShaders(gl, vertexShader, fragmentShader);

  gl.useProgram(program);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const count = 1;
  const positions = [-1.0, -1.0];
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

  render(gl, positionAttributeLocation, positions, count);
}

function render(gl: WebGLRenderingContext, positionAttributeLocation: number, positions: number[], count: number): void {
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

  clearCanvas(gl);
  gl.drawArrays(primitiveType, offset, count);

  window.requestAnimationFrame(() => {
    const lastX = positions[positions.length - 2];

    let newPositions = [];

    if (lastX < 1) {
      newPositions = positions.concat([lastX + 0.01, (Math.random() * 2) - 1]);
    } else {
      newPositions = positions
        .slice(2, positions.length)
        .reduce((acc, curr, index) => {
          if (index % 2 === 0) {
            acc.push(curr - 0.01);
          } else {
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