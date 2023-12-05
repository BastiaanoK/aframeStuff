AFRAME.registerComponent("reloader", {
  init:  function() {
    // only works for a-images with pokémon attribute/component
    const pokemons = document.querySelectorAll("[pokémon]");
    const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
    this.newPokemon = function(){
      for(let i = 0; i < pokemons.length; i++){
        let randomNum = Math.floor(Math.random() * 800) + 1;
        fetch(BASE_URL + randomNum)
          .then(response => response.json())
          .then(response => console.log(response))
          .then(data => pokemons[i].setAttribute("src", data.sprites.front_default));
      }
    }
    this.el.addEventListener("mouseenter",this.newPokemon);
  },
  update: function() {
    this.newPokemon();
  },
  tick: function() {},
  remove: function() {},
  pause: function() {},
  play: function() {}
});
