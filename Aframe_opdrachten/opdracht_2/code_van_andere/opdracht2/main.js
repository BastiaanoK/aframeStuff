
AFRAME.registerComponent("specie", { // baby yoda
    init: function() {
        const specieSpot = document.getElementById("js--specie");
        const specieSize = document.getElementById("js--specie--size");
        const starWarUrl = "https://swapi.dev/api/species/";
        let species = [{name: "informaticum"}];
        //get alle species
        fetch(starWarUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                species = data.results;
                console.log(species);
            });
        //random species
        this.newSpecie = function() {
            let randomIndex = Math.floor(Math.random() * species.length);
            let chosenSpecie = species[randomIndex];
            console.log(chosenSpecie);
            //add to js--specie
            specieSpot.setAttribute("text", "value", chosenSpecie.name);
            specieSize.setAttribute("geometry", "height", chosenSpecie.average_height/10);
        }
        this.el.addEventListener("mouseleave", this.newSpecie);
        
    },
    update: function() {
        this.newSpecie();
    }

})

AFRAME.registerComponent("movie", { // lego star wars image
    init: function() {
        const movieSpot = document.getElementById("js--movie");
        const starWarUrl = "https://swapi.dev/api/films/";
        let movies = [{title: "IAT: de film"}];
        fetch(starWarUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                movies = data.results;
                console.log(movies);
            });
        //random  movie
        this.newMovie = function() {
            let randomIndex = Math.floor(Math.random() * movies.length);
            let chosenMovie = movies[randomIndex];
            console.log(chosenMovie);
            
            movieSpot.setAttribute("text", "value", chosenMovie.title);
            //this.setAttribute("height", chosenSpecie.average_height/10);
        }
        this.el.addEventListener("mouseenter", this.newMovie);
    },
    update: function() {
        this.newMovie();
    }

})

AFRAME.registerComponent("planet", {
    init: function() {
        const planetSpot = document.getElementById("js--planet");
        const planetSize = document.getElementById("js--planet--size")
        const starWarUrl = "https://swapi.dev/api/planets/";
        let planets = [{name: "ee-arth", diameter: "12000"}];
        //get alle species
        fetch(starWarUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                planets = data.results;
                console.log(planets);
            });
        //random species
        this.newPlanet = function() {
            let randomIndex = Math.floor(Math.random() * planets.length);
            let chosenPlanet = planets[randomIndex];
            console.log(chosenPlanet);
            //add to js--specie
            planetSpot.setAttribute("text", "value", chosenPlanet.name);
            let planetDiameter = chosenPlanet.diameter;
            let oldPosition = planetSize.getAttribute("position");
            let newPosition = "0 0 -30";
            if (planetDiameter > 100000) { //als planeet te groot
                newPosition = "140 0 -30";
                //planetSize.setAttribute("position", "0 0 -200");
            } else {
                newPosition = "0 0 -30";
                //planetSize.setAttribute("position", "0 0 -30");
            }
            //planetSize.setAttribute("radius", chosenPlanet.diameter/1000)
            planetSize.setAttribute("animation", 
                "property: radius; dur: 2000; easing: linear; to: " + chosenPlanet.diameter/1000);
            planetSize.setAttribute("animation__2",
                "property: position; dur: 500; easing: linear; to: " + newPosition);
        }
        this.el.addEventListener("click", this.newPlanet);
    },
    update: function() {
        this.newPlanet();
    }

})