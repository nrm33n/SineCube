
//create global arrays to store confetti locations + initial angle
var confLocs = []
var confTheta = []
var slider

function setup() {
    createCanvas(900, 800, WEBGL);
    angleMode(DEGREES);
    //create a camera 
    camera = createCamera();

    //create a slider to change 
    slider = createSlider(0.5, 2.5,1,0.2);
    slider.position(10, 10);
    //slider.style('width', '80px');
    
    for (var i =0; i < 200; i++){
        //push 200 initial locations for confetti to confLocs array
        confLocs.push(createVector(random(-500,500),random(-800,0), random(-500,500)))
        //push 200 initial angles for confetti to confTheta array
        confTheta.push(random(0,360))
    }
}

function draw() {
    //set background colour 
    background(125);

    //set position and direction of camera, make it rotate around boxes 
    camera.setPosition(cos(frameCount/2)*1000,-600,sin(frameCount/2)*1000)
    camera.lookAt(0,0,0)

    //value = slider.value();
    //background(value);

    //add a source of ambient light 
    ambientLight(138,43,226)

    //change stroke and strokeweight to make boxes easier to see 
    stroke(0)
    strokeWeight(2)
    //normalMaterial()

   //start making the grid 
    for(var i=0;i<17;i++){
        //translate to create columns in z axis 
        push()
        translate(0,0,50*i-400) 
        for(var j=0;j<17;j++){
            //translate to create columns in x axis 
            push()
            translate(50*j-400,0,0)

            //calculate distance of each box from center 
            distance = (dist(0,0,0,50*j-400,0,50*i-400))+frameCount
            //modulates between 100 and 300, set as height for boxes 
            length = map(sin(distance),-1,1,100,300)

            //create a source of directional light that moves on the z axis 
            directionalLight(130,100,150,0,-600,sin(frameCount)+1 *height)

            //change values of red and blue based on the length of the box 
            red = map(length,0,300,0,255)
            blue = map(length,0,300,255,0)
            //apply these to the material so it changes colour by height 
            //this was changed from the original normal material, comemented out 
            //normalMaterial()
            ambientMaterial(red/0.5, 200 ,blue)
            //draw the boxes so that its length changes in a sin wave
            value = slider.value() 
            box(50,length*value,50)
            pop()  
        }
        pop()   
    }

    //call the confetti function
    confetti()
}

function confetti() {
    //iterate over the length of the arrays to draw each confetti 
    for(var i=0;i<confLocs.length;i++){
        push()
        //translate to the correct position for each confetti 
        translate(confLocs[i].x,confLocs[i].y,confLocs[i].z)
        //increment y axis by 1 so confettis move downward 
        confLocs[i].y += 1
        //rotate each confetti by the correct amount 
        rotateX(confTheta[i])
        //increment this angle by 10 so they continue to rotate 
        confTheta[i] += 10
        
        noStroke();
        //turn confetti into reflective material 
        specularMaterial(199,200,230)
        //add a directional light that changes on the Z axis according to cos 
        directionalLight(255,100,0,0,(cos(frameCount)+1)/2*height,100)
        //create the plane to draw each confetti 
        plane(15,15)
        pop()

        //if the confetti gets to the middle of the screen, move it back to the top
        if(confLocs[i].y > 0){
            confLocs[i].y = -800
        }
    }
}