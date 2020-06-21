const bibleSectionTitle = document.querySelector(`#section`);
const bibleSectionList = document.querySelector(`#section-content`);
const bibleVersionID = getParameterByName(`version`);
const bibleSectionID = getParameterByName(`section`);
const abbreviation = getParameterByName(`abbr`);

if (!bibleVersionID || !bibleSectionID) {
  window.location.href = `./`;
}

getSelectedSection(bibleVersionID, bibleSectionID).then(
  ({ content, title }) => {
    bibleSectionTitle.innerHTML = `<span><i>${title}</i></span>`;
    bibleSectionList.innerHTML = `<div class="eb-container">${content}</div>`;
  }
);

const [book, section] = bibleSectionID.split(`.`);
const breadcrumbsHTML = `
  <ul>
    <li><a href="/book?version=${bibleVersionID}&abbr=${abbreviation}">${abbreviation}</a></li>
    <li><a href="/chapter?version=${bibleVersionID}&abbr=${abbreviation}&book=${book}">${book}</a></li>
    <li>${section}</li>
  </ul>
`;
breadcrumbs.innerHTML = breadcrumbsHTML;

function getSelectedSection(bibleVersionID, bibleSectionID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        const response = JSON.parse(this.responseText);
        const fumsId = response.meta.fumsId;
        const { content, title } = response.data;
        const section = { content, title };

        _BAPI.t(fumsId);
        resolve(section);
      }
    });

    xhr.open(
      `GET`,
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/sections/${bibleSectionID}?include-chapter-numbers=true&include-verse-spans=true`
    );
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}