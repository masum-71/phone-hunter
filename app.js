const loadApi = () => {
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    .then(res => res.json())
    .then(data => console.log(data.data))
}



loadApi()