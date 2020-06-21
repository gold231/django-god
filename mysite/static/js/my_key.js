const API_KEY = `bd83d87856df6cc006b2a26741bc463e`;

function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, `\\$&`);
  const regex = new RegExp(`[?&]` + name + `(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return ``;
  return decodeURIComponent(results[2].replace(/\+/g, ` `));
}

function searchButton() {
  const searchInput = document.querySelector(`#search-input`);
  window.location.href = `./search?&version=${bibleVersionID}&abbr=${abbreviation}&query=${searchInput.value}`;
}