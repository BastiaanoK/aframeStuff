AFRAME.registerComponent("planet", {
  init:  function() {
    const BASE_URL = "https://swapi.dev/";


    const planets_url = "https://swapi.dev/api/planets/";
    const species_url = "https://swapi.dev/api/species/";

    this.newPlanet = function(){
      for(let i = 0; i < planets_url.length; i++){
        let randomNum = Math.floor(Math.random() * 20) + 1;
        fetch(planets + randomNum)
          .then(response => response.json())
          .then(response => console.log(response))
          .then(data => planets_url[i].setAttribute("src", data.sprites.front_default));
      }
    }

    this.el.addEventListener("mouseenter",this.newPlanet);

  
  },

  
  update: function() {
    this.newPlanet();
  }
});

AFRAME.registerComponent("film",{
  init: function(){
  const films_url = "https://swapi.dev/api/films/";
  this.newFilm = function(){
    for(let i = 0; i < films_url.length; i++){
      let randomNum = Math.floor(Math.random() * 20) + 1;
      fetch(films + randomNum)
        .then(response => response.json())
        .then(response => console.log(response))
        .then(data => films_url[i].setAttribute("src", data.sprites.front_default));
    }
    this.el.addEventListener("mouseenter",this.newFilm);
  }},

  update: function() {
    this.newFilm();
  }
})
