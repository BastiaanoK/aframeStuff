window.onload = function () {
    const places = document.getElementsByClassName('js--place');
    const camera = document.getElementById('js--camera');
    const cursor = document.getElementById('js--cursor');
    const pixels = document.getElementsByClassName('js--pixel');
    // const mixer = document.getElementById('color_mixer1');
    const colorSpheres = document.getElementsByClassName('js--color');
    
    let brush = "black";
    let cursorColor;
    let mixerColor;

    // let colorMix = {
    //     currentColor: null,
    //     previousColor: null
    // };

    /* Teleportation */
    for (let i = 0; i < places.length; i++) {
        places[i].addEventListener("click", function (evt) {
            let att = document.createAttribute("animation");
            att.value = `property: position; easing: linear; dur: 2000; to: ${this.getAttribute("position").x} ${this.getAttribute("position").y + 1} ${this.getAttribute("position").z}`;
            camera.setAttribute("animation", att.value);
            // console.log("teleporting");
        });
    }

    /* color of cursor */
    for (let i = 0; i < colorSpheres.length; i++) {
        colorSpheres[i].addEventListener("mouseenter", function () {
            // console.log("Entering color sphere");
            brush = colorSpheres[i].getAttribute("color");  // Corrected this line
            // console.log("Brush color:", brush);
            cursor.setAttribute("material", "color", brush);
        });

        colorSpheres[i].addEventListener("mouseleave", function () {
            // colorMix = {
            //     currentColor: null,
            //     previousColor: null
            // };
        });
    }

    // Mixes the colors that are on the cursor on the mixer plane
    // for (let i = 0; i < mixer.children.length; i++) {  // Changed mixer to mixer.children
    //     mixer.children[i].addEventListener("click", function(e) {
    //         console.log("deze doet het fucking gewoon");
    //         cursorColor = cursor.getAttribute("color");
    //         mixerColor = mixer.children[i].getAttribute("color");  // Changed mixer to mixer.children
    //         if (cursorColor == "black") {
    //             return;
    //         } else {
    //             if (mixerColor != "(255, 0, 0)" && mixerColor != "(0, 0, 255)" && mixerColor != "(255, 165, 0)") { // Change mixer color to color of cursor
    //                 mixer.children[i].setAttribute("color", cursorColor);  // Changed mixer to mixer.children
    //             } else {
    //                 // ... (unchanged)
    //             }
    //         }
    //     });
    // }

    const mixColors = document.getElementsByClassName("js--mix-color")
    const mixColorsList = []

    for (let index = 0; index < mixColors.length; index++) {
        const mixColorElement = mixColors[index];
        mixColorElement.addEventListener("click", function () {
            mixColorElement.setAttribute("color", brush);
            const mixColorID = mixColorElement.getAttribute("id");

            if (mixColorID == "color_mixer1") {
                mixColorsList[0] = mixColorElement.getAttribute("color");
            }

            if (mixColorID == "color_mixer2") {
                mixColorsList[1] = mixColorElement.getAttribute("color");
            }

            if (mixColorsList[0] && mixColorsList[1]) {
                let mix_result = document.getElementById("color_mixer_result")
                let newColor = mixColorsFunc(mixColorsList[0], mixColorsList[1]);
                mix_result.setAttribute("color", newColor);
                
                
            }
        })
    }

    /* Painting Pixels */
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].addEventListener("click", function () {
            pixels[i].setAttribute("color", brush);
        });
    }
}

function mixColorsFunc(color1, color2) {
    const rgb1 = color1.match(/\d+/g).map(Number);
    const rgb2 = color2.match(/\d+/g).map(Number);
  
    while (rgb1.length < 3) {
      rgb1.push(0);
    }
    while (rgb2.length < 3) {
      rgb2.push(0);
    }
  
    const mixedRGB = rgb1.map((value, index) =>
      Math.round((value + (rgb2[index] || 0)) / 2)
    );
  
    while (mixedRGB.length < 3) {
      mixedRGB.push(0);
    }
  
    const mixedColor = `rgb(${mixedRGB.join(", ")})`;
    return mixedColor;
}