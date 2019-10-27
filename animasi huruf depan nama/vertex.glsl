attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;
void main() {
  fColor = vColor;
  mat4 translasi = mat4(
    1.0, 0.0, 0.0, 0.45,   
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 translasi_balik = mat4(
    1.0, 0.0, 0.0, -0.45,   // dx = 0.5
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 rotasi = mat4(
    cos(theta), -sin(theta), 0.0, 0.0,
    sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0 
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * translasi * rotasi * translasi_balik;
  
}


