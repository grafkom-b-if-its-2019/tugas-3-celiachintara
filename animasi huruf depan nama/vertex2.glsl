attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float scale;

void main() {
  fColor = vColor;
  //gl_Position = vec4(vPosition, 0.0, 1.0); //dideklarasikan satu kali saja
  // p' = p
  // p' = T * p
  mat4 translasi = mat4(
    1.0, 0.0, 0.0, -0.45,   
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 translasi_balik = mat4(
    1.0, 0.0, 0.0, 0.45,   
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 skalasi = mat4(
    scale, 0.0, 0.0, 0.1, 
    0.0, 1.0, 0.0, 0.0, 
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * translasi * skalasi * translasi_balik;
}
