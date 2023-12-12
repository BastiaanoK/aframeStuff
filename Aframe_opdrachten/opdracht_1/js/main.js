AFRAME.registerComponent('load', {
    init: function () {
        const places = document.getElementsByClassName('js--place');
        const camera = document.getElementById('js--camera');
        const cursor = document.getElementById('js--cursor');
        const pixels = document.getElementsByClassName('js--pixel');
        const colorSpheres = document.getElementsByClassName('js--color');
        let brush = "black";

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
        for (let i = 0; i < colorSpheres.length; i++) {
            colorSpheres[i].addEventListener("mouseenter", function () {
                console.log("Entering color sphere")
                brush = this.getAttribute("color").toLowerCase();
                console.log("Brush color:", brush);
                cursor.setAttribute("color", brush);

                if (colorMix.currentColor && colorMix.currentColor !== brush) {
                    colorMix.previousColor = colorMix.currentColor;
                    colorMix.currentColor = brush;

                    const mixedColor = mixColors(colorMix.previousColor, colorMix.currentColor);
                    brush = mixedColor;
                    cursor.setAttribute("color", brush);
                } else {
                    colorMix.currentColor = brush;
                }
            });

            colorSpheres[i].addEventListener("mouseleave", function () {
                colorMix = {
                    currentColor: null,
                    previousColor: null
                };
            });
        }

        function mixColors(color1, color2) {
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
            console.log("Mixed color:", mixedColor);

                // Update brush color and apply to cursor
            brush = mixedColor;
            console.log("Updated brush color:", brush);
            cursor.setAttribute("color", brush);

            return mixedColor;
        }

        /* Painting Pixels */
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].addEventListener("mouseenter", function () {
                pixels[i].setAttribute("color", brush);
            });
        }
    }
});
