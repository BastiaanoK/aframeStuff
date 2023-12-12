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

        /* Color Mixing */
        for (let i = 0; i < colorSpheres.length; i++) {
            colorSpheres[i].addEventListener("mouseenter", function () {
                console.log("Entering color sphere");
                brush = this.getAttribute("color").toLowerCase();
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

        /* Painting Pixels */
        for (let i = 0; i < pixels.length; i++) {
            console.log("painting");
            pixels[i].addEventListener("mouseenter", function () {
                pixels[i].setAttribute("color", brush);
            });
        }
    }
});