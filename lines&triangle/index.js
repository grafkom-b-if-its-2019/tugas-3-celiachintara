(function() {
    // ambil elemen canvas dan cek apakah webGL nya hidup
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var program;

    glUtils.SL.init({ callback:function() { main(); } });

    function main() {
        // Register Callbacks
        window.addEventListener('resize', resizer);

        // Get canvas element and check if WebGL enabled
        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);
    
        // Initialize the shaders and program
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
            fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    
        gl.useProgram(program);
    
        resizer();
    }

    function draw() {
        // renderer info
        gl.clearColor(0, 0, 0, 1);
        gl.colorMask(true,true,true,true);
        gl.clear(gl.COLOR_BUFFER_BIT);
    
        var linesVertices = new Float32Array([
            -0.6, -0.6,  //1
            -0.7, -0.4, 
            -0.7, +0.4,
            -0.6, +0.6, 
            -0.3, +0.6,
            -0.2, +0.4,
            -0.2, +0.2,
            -0.3, +0.2,  
            -0.3, +0.3,
            -0.35, +0.4,
            -0.55, +0.4,
            -0.6, +0.3,
            -0.6, -0.3,
            -0.55, -0.4,
            -0.35, -0.4, //15
            -0.3, -0.3,
            -0.3, -0.2,
            -0.2, -0.2,
            -0.2, -0.4,
            -0.3, -0.6 //20
        ]);
        var triangleVertices = new Float32Array([
            +0.7, -0.2, //1
            +0.6, -0.2,
            +0.7, -0.4,
            +0.6, -0.3,
            +0.6, -0.6, //5
            +0.55, -0.4,
            +0.3, -0.6,
            +0.35, -0.4,
            +0.2, -0.4,
            +0.3, -0.3, //10
            +0.2, +0.4,
            +0.3, +0.3,
            +0.3, +0.6,
            +0.35, +0.4,
            +0.6, +0.6, //15
            +0.55, +0.4,
            +0.7, +0.4,
            +0.6, +0.3,
            +0.7, +0.2,
            +0.6, +0.2 //20
        ]);

        drawA(gl.LINE_LOOP, linesVertices);
        drawA(gl.TRIANGLE_STRIP, triangleVertices);
      }
    
      function drawLine() {
        var n = initLineBuffers();
        if (n < 0) {
          console.log('Failed to set the positions of the vertices');
          return;
        }
        gl.drawArrays(gl.LINE_LOOP, 0, n);
      }
    
      function initLineBuffers() {
        var vertices = draw.linesVertices;
        var n = 20;
    
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
          console.log('Failed to create the buffer object');
          return -1;
        }
    
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        var aPosition = gl.getAttribLocation(program, 'aPosition');
        if (aPosition < 0) {
          console.log('Failed to get the storage location of aPosition');
          return -1;
        }
    
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);
        return n;

      }
    
      function drawTriangle() {
        var n = initTriangleBuffers();
        if (n < 0) {
          console.log('Failed to set the positions of the vertices');
          return;
        }
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
      }
    
      function initTriangleBuffers() {
        var vertices = draw.triangleVertices;
        var n = 20;
    
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
          console.log('Failed to create the buffer object');
          return -1;
        }
    
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        var aPosition = gl.getAttribLocation(program, 'aPosition');
        if (aPosition < 0) {
          console.log('Failed to get the storage location of aPosition');
          return -1;
        }
    
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);
        // ini *
        return n; // ini dinaikin ke *

      }
    
      // Generic format
      function drawA(type, vertices) {
        var n = initBuffers(vertices);
        //var n = 20;
        if (n < 0) {
          console.log('Failed to set the positions of the vertices');
          return;
        }
        gl.drawArrays(type, 0, n);
      }
    
      function initBuffers(vertices) {
        var n = vertices.length / 2;
    
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
          console.log('Failed to create the buffer object');
          return -1;
        }
    
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        var aPosition = gl.getAttribLocation(program, 'aPosition');
        if (aPosition < 0) {
          console.log('Failed to get the storage location of aPosition');
          return -1;
        }
    
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);
        return n;
      }
    
      function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        draw();
      }
    
    })(window || this);
    