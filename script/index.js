let page = 1;
let container = document.getElementById("container");
let prev = document.getElementById("previous");
let next = document.getElementById("next");
let year = document.getElementById("asc");
let dsc = document.getElementById("dsc");

year.addEventListener("click", () => {
  sortByYear(page);
});

async function sortByYear(page) {
  let data = await fetch(
    `https://risksek123.herokuapp.com/data?_limit=10&_page=${page}&_sort=release_year&_order=asc`
  );
  let res = await data.json();

  displayData(res);
}

dsc.addEventListener("click", () => {
  sortByYeardesc(page);
});

async function sortByYeardesc(page) {
  let data = await fetch(
    `https://risksek123.herokuapp.com/data?_limit=10&_page=${page}&_sort=release_year&_order=desc`
  );
  let res = await data.json();

  displayData(res);
}

prev.addEventListener("click", () => {
  page--;
  if (page == 0) {
    prev.disabled = true;
  } else {
    getData(page);
    sortByYear(page);
    sortByYeardesc(page);
  }
});

next.addEventListener("click", () => {
  page++;
  if (page > 10) {
    alert("You Reach the end of Data");
  } else {
    getData(page);
    sortByYear(page);
    sortByYeardesc(page);
  }
});

async function getData(page) {
  let data = await fetch(
    `https://risksek123.herokuapp.com/data?_limit=10&_page=${page}`
  );
  //https://risksek123.herokuapp.com/data

  let res = await data.json();

  // console.log(sortingData(res));
  displayData(res);
}
function displayData(arr) {
  container.innerText = null;

  arr.map((item) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    td1.innerText = item.id;
    td2.innerText = item.movie_name;
    td3.innerText = item.movie_generes;
    td4.innerText = item.release_year;

    tr.append(td1, td2, td3, td4);

    container.append(tr);
  });
}

getData();
