AFRAME.registerComponent('load', {
    init: function () {
        const places = document.getElementsByClassName('js--place');
        const camera = document.getElementById('js--camera');
        const cursor = document.getElementById('js--cursor');
        const pixels = document.getElementsByClassName('js--pixel');
        const mixer = document.getElementById('color_mixer');
        const colorSpheres = document.getElementsByClassName('js--color');
        
        let brush = "black";
        let cursorColor;
        let mixerColor;

        let colorMix = {
            currentColor: null,
            previousColor: null
        };

        /* Teleportation */
        for (let i = 0; i < places.length; i++) {
            places[i].addEventListener("click", function (evt) {
                let att = document.createAttribute("animation");
                att.value = `property: position; easing: linear; dur: 2000; to: ${this.getAttribute("position").x} ${this.getAttribute("position").y + 1} ${this.getAttribute("position").z}`;
                camera.setAttribute("animation", att.value);
                console.log("teleporting");
            });
        }

        /* Color Mixing */

        /* color of cursor */
        for (let i = 0; i < colorSpheres.length; i++) {
            colorSpheres[i].addEventListener("mouseenter", function () {
                console.log("Entering color sphere");
                brush = colorSpheres[i].getAttribute("color");  // Corrected this line
                console.log("Brush color:", brush);
                cursor.setAttribute("color", brush);
            });

            colorSpheres[i].addEventListener("mouseleave", function () {
                colorMix = {
                    currentColor: null,
                    previousColor: null
                };
            });
        }

        // Mixes the colors that are on the cursor on the mixer plane
        for (let i = 0; i < mixer.children.length; i++) {  // Changed mixer to mixer.children
            mixer.children[i].addEventListener("click", function(e) {
                console.log("deze doet het fucking gewoon");
                cursorColor = cursor.getAttribute("color");
                mixerColor = mixer.children[i].getAttribute("color");  // Changed mixer to mixer.children
                if (cursorColor == "black") {
                    return;
                } else {
                    if (mixerColor != "(255, 0, 0)" && mixerColor != "(0, 0, 255)" && mixerColor != "(255, 165, 0)") { // Change mixer color to color of cursor
                        mixer.children[i].setAttribute("color", cursorColor);  // Changed mixer to mixer.children
                    } else {
                        // ... (unchanged)
                    }
                }
            });
        }

        /* Painting Pixels */
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].addEventListener("mouseenter", function () {
                pixels[i].setAttribute("color", brush);
            });
        }
    }
});