varying vec2 vUv;

vec2 rotate2D(vec2 value, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

void main() {
 
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 
  vUv = uv; // pass texture coordinates to fragment shader
}