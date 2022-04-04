console.log("client side js file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const loc = document.querySelector("#location");
const fore = document.querySelector("#forecast");
const err = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  loc.textContent = "Loading";
  fore.textContent = "";

  fetch("weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        loc.textContent = "";
        err.textContent = data.error;
      } else {
        console.log(data.location);
        loc.textContent = data.location;
        fore.textContent = data.forecast;
      }
    });
  });
});
