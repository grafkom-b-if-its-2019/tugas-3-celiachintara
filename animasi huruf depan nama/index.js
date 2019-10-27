(function() {
    // ambil elemen canvas dan cek apakah webGL nya hidup
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var program,program2;

    glUtils.SL.init({ callback:function() { main(); } });

    function main() {
        // Register Callbacks
        window.addEventListener('resize', resizer);

        // Get canvas element and check if WebGL enabled
        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);
    
        // Initialize the shaders and program
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
            vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
            fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
        //gl.useProgram(program);

        var thetaLoc = gl.getUniformLocation(program, 'theta');
        var theta = 0;
        var scaleLoc = gl.getUniformLocation(program2, 'scale');
        var scale = 1;
        var membesar = 1;

        function render(){
          gl.clearColor(0, 0, 0, 1);
          gl.colorMask(true,true,true,true);
          gl.clear(gl.COLOR_BUFFER_BIT);
  
          gl.useProgram(program);
          drawline();
          theta += 0.0058; //speed
          gl.uniform1f(thetaLoc, theta);
          gl.drawArrays(gl.LINE_LOOP,0,20);

          gl.useProgram(program2);
          drawtriangle();
          if(scale >=1) membesar = -1;
          else if (scale <= -1) membesar = 1;
          scale = scale + (membesar * 0.0058);
          gl.uniform1f(scaleLoc,scale);
          gl.drawArrays(gl.TRIANGLE_STRIP,0,20);

          requestAnimationFrame(render);
        }

        function drawline(){
          var lineVertices = [
            -0.6, -0.6,    1.0, 1.0, 0.0,  
            -0.7, -0.4,    0.7, 0.0, 1.0, 
            -0.7, +0.4,   0.1, 1.0, 0.6,
            -0.6, +0.6,   0.1, 1.0, 0.6, 
            -0.3, +0.6,    0.7, 0.0, 1.0,
            -0.2, +0.4,    0.7, 0.0, 1.0,
            -0.2, +0.2,    1.0, 1.0, 0.0,
            -0.3, +0.2,   0.1, 1.0, 0.6,  
            -0.3, +0.3,    0.7, 0.0, 1.0,
            -0.35, +0.4,    0.7, 0.0, 1.0,
            -0.55, +0.4,   0.1, 1.0, 0.6,
            -0.6, +0.3,    0.7, 0.0, 1.0,
            -0.6, -0.3,    1.0, 1.0, 0.0,
            -0.55, -0.4,    0.7, 0.0, 1.0,
            -0.35, -0.4,   0.1, 1.0, 0.6,
            -0.3, -0.3,    0.7, 0.0, 1.0,
            -0.3, -0.2,    1.0, 1.0, 0.0,
            -0.2, -0.2,    0.7, 0.0, 1.0,
            -0.2, -0.4,    0.7, 0.0, 1.0,
            -0.3, -0.6,    1.0, 1.0, 0.0
          ];
          var lineVertexBufferObject = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexBufferObject);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);

          var vPosition = gl.getAttribLocation(program,'vPosition');
          var vColor = gl.getAttribLocation(program,'vColor');
          gl.vertexAttribPointer(
            vPosition,                          // variable yang memegang posisi atrbute di shader
            2,                                  // jumlah elemen per attribute
            gl.FLOAT,                           // tipe data attribut
            gl.FALSE,                           // default
            5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
            0                                   // offset dari posisi elemen di array
          );
          gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

          gl.enableVertexAttribArray(vPosition);
          gl.enableVertexAttribArray(vColor);

        }

        function drawtriangle(){
          var triangleVertices = [
            +0.7, -0.2,    1.0, 1.0, 0.0,
            +0.6, -0.2,   0.1, 1.0, 0.6,
            +0.7, -0.4,   0.1, 1.0, 0.6,
            +0.6, -0.3,   1.0, 1.0, 0.0,
            +0.6, -0.6,    0.7, 0.0, 1.0,
            +0.55, -0.4,   0.7, 0.0, 1.0,
            +0.3, -0.6,   1.0, 1.0, 0.0,
            +0.35, -0.4,   0.7, 0.0, 1.0,
            +0.2, -0.4,   0.1, 1.0, 0.6,
            +0.3, -0.3,    0.7, 0.0, 1.0,
            +0.2, +0.4,   1.0, 1.0, 0.0,
            +0.3, +0.3,   0.7, 0.0, 1.0,
            +0.3, +0.6,   0.7, 0.0, 1.0,
            +0.35, +0.4,   0.1, 1.0, 0.6,
            +0.6, +0.6,    0.7, 0.0, 1.0,
            +0.55, +0.4,   1.0, 1.0, 0.0,
            +0.7, +0.4,   0.7, 0.0, 1.0,
            +0.6, +0.3,   0.7, 0.0, 1.0,
            +0.7, +0.2,   0.1, 1.0, 0.6,
            +0.6, +0.2,    1.0, 1.0, 0.0
          ];
          var triangleVertexBufferObject = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

          var vPosition = gl.getAttribLocation(program2,'vPosition');
          var vColor = gl.getAttribLocation(program2,'vColor');
          gl.vertexAttribPointer(
            vPosition,                          // variable yang memegang posisi atrbute di shader
            2,                                  // jumlah elemen per attribute
            gl.FLOAT,                           // tipe data attribut
            gl.FALSE,                           // default
            5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
            0                                   // offset dari posisi elemen di array
          );
          gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

          gl.enableVertexAttribArray(vPosition);
          gl.enableVertexAttribArray(vColor);

        }

        resizer();
        render();
    }
      function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }
    
    })(window || this);
    