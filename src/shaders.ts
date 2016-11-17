export const fragmentShader = `
    precision mediump float;

    void main(void) {
        // Look up a color from the texture.
        gl_FragColor = vec4(1., 0.0, 0., 1.);
    }
`;

export const vertexShader = `
    attribute vec2 a_position;

    void main() {
        gl_Position = vec4(a_position, 0, 1);
    }
`;