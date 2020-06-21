const bibleSectionList = document.querySelector(`#section-list`);
let sectionHTML = ``;

getSections(bibleVersionID, bibleBookID).then((sectionList) => {
  if (sectionList) {
    sectionHTML += `<ol>`;
    for (let section of sectionList) {
      sectionHTML += `<li class="section"><a href="/section?version=${bibleVersionID}&abbr=${abbreviation}&section=${section.id}"><abbr class="section-id">${section.id}</abbr><span class="bible-version-name"> ${section.title} </span></a></li>`;
    }
    sectionHTML += `</ol>`;
  } else {
    sectionHTML += `<div>There are no sections for this version and chapter.</div>`;
  }

  bibleSectionList.innerHTML = sectionHTML;
});

function getSections(bibleVersionID, bibleBookID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        const { data } = JSON.parse(this.responseText);
        const sections = data
          ? data.map(({ title, id }) => {
              return { title, id };
            })
          : null;

        resolve(sections);
      }
    });

    xhr.open(
      `GET`,
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/books/${bibleBookID}/sections`
    );
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}