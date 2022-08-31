const loadApi = (name, dataLimit) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`)
    .then((res) => res.json())
    .then((data) => loadPhones(data.data, dataLimit));
};

const loadPhones = (phones, dataLimit) => {
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  const notFound = document.getElementById("not-found");
  if (phones.length === 0) {
    notFound.classList.remove("d-none");
  } else {
    notFound.classList.add("d-none");
  }
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card p-4">
             <img src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as</p>
            </div>
            <button onclick="loadDetail('${phone.slug}')" class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#showPhoneDetaile">Show Detail</button>
            
        </div>
        `;
    phonesContainer.appendChild(div);
  });
  toggleSpinner(false);
};

const proccessSearch = (dataLimit) => {
  toggleSpinner(true);
  const search = document.getElementById("search-field");
  const searchField = search.value;
  loadApi(searchField, dataLimit);
};
document.getElementById("btn-search").addEventListener("click", () => {
  proccessSearch(10);
});

//enter key search

document.getElementById("search-field").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    proccessSearch(10);
  }
});

//load spinner

const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

document.getElementById("btn-show-all").addEventListener("click", () => {
  proccessSearch();
});

const loadDetail = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => showDetail(data.data));
};

const showDetail = (phone) => {
  console.log(phone);
  const showPhoneDetaileLabel = document.getElementById(
    "showPhoneDetaileLabel"
  );
  showPhoneDetaileLabel.innerText = `${phone.name}`;
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = `
    <p>ReleaseDate: ${
      phone.releaseDate ? phone.releaseDate : `no release date found`
    } </p>
    <p>Main Feature: ${phone.mainFeatures.sensors[0]} </p>
  `;
};
