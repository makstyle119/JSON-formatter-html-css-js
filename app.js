const inputJSON = document.getElementById('input-json');
const outputJSON = document.getElementById('output-json');

function formatJSON(json) {
  const regex = /"([\w]+)":/g;
  const formattedJSON = JSON.stringify(json, null, 2)
    .replace(regex, '<span class="string">"$1"</span>:')
    .replace(/(\d+)/g, '<span class="number">$1</span>')
    .replace(/(true|false)/g, '<span class="boolean">$1</span>')
    .replace(/(null)/g, '<span class="null">$1</span>')
    .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
    .replace(/({|}|\[|\])/g, '<span class="bracket">$&</span>')
    .replace(/(:)/g, '<span class="colon">$1</span>');
  return formattedJSON;
}

function renderOutput() {
  try {
    const parsedJSON = JSON.parse(inputJSON.value);
    const formattedJSON = formatJSON(parsedJSON);
    outputJSON.innerHTML = formattedJSON;
  } catch (err) {
    outputJSON.innerHTML = '<span class="error">Invalid JSON</span>';
  }
}

inputJSON.addEventListener('input', renderOutput);

// get the current year
const getYearAndUrl = () => {
  let year = document.getElementById('getYear');
  let currentPage = document.getElementById('currentPage');
  year.innerText = new Date().getFullYear();
  currentPage.href = window.location.href;
};

function copyJson() {
  var copyText = document.getElementById('output-json').innerText;
  var tempElement = document.createElement('textarea');
  tempElement.value = copyText;
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand('copy');
  document.body.removeChild(tempElement);
  alert('JSON copied to clipboard!');
}
