const bibleChapterList = document.querySelector(`#chapter-list`);
const bibleVersionID = getParameterByName(`version`);
const bibleBookID = getParameterByName(`book`);
const abbreviation = getParameterByName(`abbr`);

let chapterHTML = ``;

if (!bibleVersionID || !bibleBookID) {
  window.location.href = `./`;
}

getChapters(bibleVersionID, bibleBookID).then((chapterList) => {
  chapterHTML += `<ol>`;
  for (let chapter of chapterList) {
    chapterHTML += `<li class="grid">
    	<a class="grid-link" href="/verse?version=${bibleVersionID}&abbr=${abbreviation}&chapter=${chapter.id}"> ${chapter.number} </a></li>`;
  }
  chapterHTML += `</ol>`;
  bibleChapterList.innerHTML = chapterHTML;
});

document.querySelector(`#viewing`).innerHTML = `${bibleBookID}`;
const breadcrumbsHTML = `
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/book?version=${bibleVersionID}&abbr=${abbreviation}">${abbreviation}</a></li>
    <li>${bibleBookID}</li>
  </ul>
`;
breadcrumbs.innerHTML = breadcrumbsHTML;

function getChapters(bibleVersionID, bibleBookID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        const { data } = JSON.parse(this.responseText);
        const chapters = data.map(({ number, id }) => {
          return { number, id };
        });

        resolve(chapters);
      }
    });

    xhr.open(
      `GET`,
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/books/${bibleBookID}/chapters`
    );
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}