window.onload = () =>{
    const places = document.getElementsByClassName('js--place');
    const camera = document.getElementById('js--camera');

    
    let pickups = document.getElementsByClassName('js--pickup');
    let hold = null;

    const placeholders = document.getElementsByClassName('js--placeholder');
    let scene = document.getElementById('js--scene');

      /*teleportatie*/
     
        for(let i=0; i < places.length; i++){
                places[i].addEventListener("click", function(evt){
                    console.log("nee")
                    let att = document.createAttribute("animation");
                    att.value =` property: position; easing: linear; dur: 2000; to: ${ 
                    this.getAttribute("position").x} 
                    ${this.getAttribute("position").y + 1}
                    ${this.getAttribute("position").z}`;
                    camera.setAttribute("animation", att.value);
        
                });
      
    }

    /*iets oppakken */
    for(let i = 0; i < pickups.length; i++){
        pickups[i].addEventListener('click', function(evt){
            if(hold == null){
          camera.innerHTML += '<a-box class="js--pickup js-interact" color="green" position = "1 -1 -1"></a-box>'
          hold ="box";
          this.remove();
        }
        });
    }
    
    /*iets neerzetten. werkt niet. ben bij video 3.4 08:37*/
    for(let i = 0; i < placeholders.length; i++){
        placeholders[i].addEventListener('click', function(evt){
            if(hold == "box"){
                let box = document.createElement('a-box');
                box.setAttribute("class", "js--pickup js--interact");
                box.setAttribute("color", "green");
                box.setAttribute("position", {x: this.getAttribute('position').x, y:"0.5", z: 
                this.getAttribute('position').z});
                scene.appendChild(box);
                hold = null;
            } 
        });
    }

  
};