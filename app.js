const loadApi = (name) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`)
    .then((res) => res.json())
    .then((data) => loadPhones(data.data));
};

const loadPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
console.log(phones)
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card p-4">
             <img src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(div)
  });
};

loadApi('oppo');


