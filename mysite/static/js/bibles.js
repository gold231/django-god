const versionList = document.querySelector(`#bible-version-list`);
let versionHTML = ``;
getBibleVersions().then((bibleVersionList) => {
  const sortedVersions = sortVersionsByLanguage(bibleVersionList);
  for (let languageGroup in sortedVersions) {
    const language = languageGroup;
    versionHTML += `<h4 class="list-heading"><span>${language}</span></h4><ul>`;
    const versions = sortedVersions[languageGroup];
    for (let version of versions) {
      versionHTML += `<li class="bible">
                        <a href="/book?version=${version.id}&abbr=${
        version.abbreviation
      }">
                          <abbr class="bible-version-abbr" title="${
                            version.name
                          }">${version.abbreviation}</abbr>
                          <span>
                            <span class="bible-version-name">${
                              version.name
                            }</span>
                            ${
                              version.description
                                ? '<span class="bible-version-desc">' +
                                  version.description +
                                  "</span>"
                                : ""
                            }
                          </span>
                        </a>
                      </li>`;
    }
    versionHTML += `</ul>`;
  }
  versionList.innerHTML = versionHTML;
});

function getBibleVersions() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        const { data } = JSON.parse(this.responseText);
        const versions = data.map((data) => {
          return {
            name: data.name,
            id: data.id,
            abbreviation: data.abbreviation,
            description: data.description,
            language: data.language.name,
          };
        });

        resolve(versions);
      }
    });

    xhr.open(`GET`, `https://api.scripture.api.bible/v1/bibles`);
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

function sortVersionsByLanguage(bibleVersionList) {
  let sortedVersions = {};

  for (const version of bibleVersionList) {
    if (!sortedVersions[version.language]) {
      sortedVersions[version.language] = [];
    }
    sortedVersions[version.language].push(version);
  }
  for (const version in sortedVersions) {
    sortedVersions[version].sort((a, b) => {
      const nameA = a.abbreviation.toUpperCase();
      const nameB = b.abbreviation.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
  return sortedVersions;
}