const main = () => {
    // thecatapi.com

    const api_base_url = "https://api.thecatapi.com/v1/"
    const api_args = 'images/search'
    
    let myHeaders = new Headers()
    myHeaders.append('x-api-key', 'e340ac18-7e20-4421-a471-fab363c410df')

    fetch(api_base_url + api_args, myHeaders)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('cat').src = data[0].url
        console.log(data[0].url);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}

window.onload = main