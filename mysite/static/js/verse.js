const bibleVerseList = document.querySelector(`#verse-list`);
const bibleVersionID = getParameterByName(`version`);
const chapterId = getParameterByName(`chapter`);
const abbreviation = getParameterByName(`abbr`);

let chapterHTML = ``;

if (!bibleVersionID || !chapterId) {
  window.location.href = `./`;
}

getVerses(bibleVersionID, chapterId).then(async (verseList) => {
  // chapterHTML += `<ol>`;
  for (let verse of verseList) {
    chapterHTML = ``;
    const { content, reference } = await getSelectedVerse(bibleVersionID, verse.id);
    // bibleVerseTitle.innerHTML = `<span><i>${reference}</i></span>`;
    // bibleVerseList.innerHTML = `<div class="eb-container">${content}</div>`;
    let li = document.createElement('li');
    li.style.listStyle = 'none';
    li.style.width = '100%';
    li.innerHTML += `<div><span><i>${reference}</i></span>
    	<div class="eb-container">${content}</div>`;
    bibleVerseList.appendChild(li);
      //   chapterHTML += `<li class="grid">
      // <a class="grid-link" href="/verseselected?version=${bibleVersionID}&abbr=${abbreviation}&verse=${verse.id}"> ${verse.id} </a></li>`;
  }
  // chapterHTML += `</ol>`;
  // bibleVerseList.innerHTML = chapterHTML;
});

document.querySelector(`#viewing`).innerHTML = `${chapterId}`;
const breadcrumbsHTML = `
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/book?version=${bibleVersionID}&abbr=${abbreviation}">${abbreviation}</a></li>
    <li>${bibleBookID}</li>
  </ul>
`;
breadcrumbs.innerHTML = breadcrumbsHTML;

function getVerses(bibleVersionID, bibleBookID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        const { data } = JSON.parse(this.responseText);
        const verses = data.map(({ number, id }) => {
          return { number, id };
        });

        resolve(verses);
      }
    });

    xhr.open(
      `GET`,
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/chapters/${chapterId}/verses`
    );
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

function getSelectedVerse(bibleVersionID, bibleVerseID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        const response = JSON.parse(this.responseText);
        const fumsId = response.meta.fumsId;
        const { content, reference } = response.data;
        const verse = { content, reference };

        _BAPI.t(fumsId);
        resolve(verse);
      }
    });

    xhr.open(
      `GET`,
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/verses/${bibleVerseID}?include-chapter-numbers=false&include-verse-numbers=false`
    );
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}