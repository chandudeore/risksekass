let page = 1;
let container = document.getElementById("container");
let prev = document.getElementById("previous");
let next = document.getElementById("next");
let slec = document.getElementById("filtering");

console.log(slec.value);

function sortingData(arr) {
  arr.filter((item) => item.movie_name === slec);
}

prev.addEventListener("click", () => {
  page--;
  if (page == 0) {
    prev.disabled = true;
  } else {
    getData(page);
  }
});

next.addEventListener("click", () => {
  page++;
  if (page > 10) {
    alert("You Reach the end of Data");
  } else {
    getData(page);
  }
});

async function getData(page) {
  let data = await fetch(`http://localhost:3001/data?_limit=10&_page=${page}`);

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
