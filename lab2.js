
var gl;
var points;
var transX = 0.0;
var transY = 0.0;
var canvas;
var pointsArray = [];

var program;
var bufferId;
var vPosition;
var cBuffer;
var vColor;

var vertexColors = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 0.0, 1.0, 1.0 )  // blue
    ];


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    
	pointsArray = [
		vec2(-0.33, -0.33),
		vec2(-0.33, 0.33),
		vec2(0.33, 0.33),
		vec2(0.33, -0.33)];
    

	document.onkeydown = keypressed;

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    // Load the data into the GPU
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    vPosition = gl.getAttribLocation( program, 'vPosition' );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	
	
	cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );	

	vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    render();	
};

function keypressed(event) {
	
	if(event.keyCode == '65')
		transX -= 0.03;
	else if(event.keyCode == '68')
		transX += 0.03;
	else if(event.keyCode == '87')
		transY += 0.03;
	else if(event.keyCode == '83')
		transY -= 0.03;

	if(transX > 0.67)
		transX = 0.67;
	else if(transX < -0.67)
		transX = -0.67;
	else if(transY > 0.67)
		transY = 0.67;
	else if(transY < -0.67)
		transY = -0.67;

	vertices = [
	vec2( -0.33 + transX, -0.33 + transY),
	vec2( -0.33 + transX, 0.33 + transY),
	vec2( 0.33 + transX, 0.33 + transY),
	vec2( 0.33 + transX, -0.33 + transY)]; 
    
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vPosition = gl.getAttribLocation( program, 'vPosition' );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


    render();
	
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}
