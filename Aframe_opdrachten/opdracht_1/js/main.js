


AFRAME.registerComponent('load', {


    init: function(){
    const places = document.getElementsByClassName('js--place');
    const camera = document.getElementById('js--camera');
    const cursor = document.getElementById('js--cursor');
    const pixels = document.getElementsByClassName('js--pixel');

    const blue = document.getElementById('blue');
    const red = document.getElementById('red');
    const green = document.getElementById('green');
    const yellow = document.getElementById('yellow');

    const color = document.getElementsByClassName('js--color');
    let brush = "black";
    console.log(brush);


     /*teleportatie*/
     
     for(let i=0; i < places.length; i++){
        places[i].addEventListener("click", function(evt){
            console.log("klik place")
            let att = document.createAttribute("animation");
            att.value =` property: position; easing: linear; dur: 2000; to: ${ 
            this.getAttribute("position").x} 
            ${this.getAttribute("position").y + 1}
            ${this.getAttribute("position").z}`;
            camera.setAttribute("animation", att.value);

        });
    }

    for(let i=0; i < pixels.length; i++){
        pixels[i].onmouseenter = (event) => {
            pixels[i].setAttribute("color", brush);
        }
    }

    /*kleur op planes*/
    for(let i=0; i < color.length; i++){
        color[i].onmouseenter = (event) => {
            console.log("je krijgt kleur");
            brush = color[i].getAttribute("color");
            console.log(brush);
            cursor.setAttribute("color", brush);
        

        };
    }

    
    /*kleurmix*/
    /*
    for(let i=0; i < color.length; i++){
        color[i].onmouseenter = (event) => {
        if (blue[i].onmouseenter == red[i].onmouseenter) {
            console.log("colormix");
            cursor.setAttribute("color", brush);
            plane.setAttribute("color", "purple");
        }}; 
    }
*/
    }

});