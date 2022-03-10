let listOfAllTabId = [];
let listOfAllTabUrls = [];
let selectedTabs = [];
let diDuplicatedListOfUrls = [];

let displayAllTabsBtn = document.getElementById("input-btn");
let deleteTabsBtn = document.getElementById("delete-btn");
let groupTabsBtn = document.getElementById("group-btn");
let singleBtn = document.getElementById("single-btn");
let tableDisplay = document.getElementById("myTable");
let btn = document.createElement("button");

const tbodyEl = document.querySelector("tbody");
const tableEl = document.querySelector("table");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("tabs"));
console.log(`local storage values ......${leadsFromLocalStorage}`);

if (leadsFromLocalStorage) {
  diDuplicatedListOfUrls = leadsFromLocalStorage;
  renderTabs(diDuplicatedListOfUrls);
}

tableEl.addEventListener("click", onDeleteRow);

displayAllTabsBtn.addEventListener("click", function () {
  console.log("******Display All tab urls******");
  getPropertiesOfAllTabs();
  localStorage.setItem("tabs", JSON.stringify(diDuplicatedListOfUrls));
  renderTabs(diDuplicatedListOfUrls);
  console.log(
    `lets see whats in localStoragae..... ${localStorage.getItem("tabs")}`
  );
  /*listOfAllTabUrls = []; /** Empties the array in the case of displaying all the tabs after the list of tab urls 
  has already been displayed in the page. Prevents from adding the same urls over again to the localstorage. 
   **/
});

// singleBtn.addEventListener("click", function () {
//   console.log("******Display selected tab url******");
//   getCurrentTab();
//   localStorage.setItem("tabs", JSON.stringify(listOfAllTabUrls));
//   renderTabs(listOfAllTabUrls);
//   console.log(localStorage.getItem("tabs"));
// });

deleteTabsBtn.addEventListener("click", function () {
  console.log("******Delete tabs url******");
  localStorage.clear();
  listOfAllTabUrls = [];
  //output3 = [];
  renderTabs(listOfAllTabUrls);
});

// groupTabsBtn.addEventListener("click", function () {
//   console.log("******This is for grouping tabs in a window******");
//   groupAllTabs();
// });

function renderTabs(tabUrls) {
  let listItems = "";
  for (let i = 0; i < tabUrls.length; i++) {
    listItems += `
          <tr>
              <td><button class="deleteBtn">Delete</button></td>
              <td><a target='_blank' href='${tabUrls[i].url}'>
              ${tabUrls[i].title}
              </a></td>
          </tr>
      `;
  }
  tbodyEl.innerHTML = listItems;
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab.id);
  console.log(tab.url);
  listOfAllTabUrls.push(tab.url);
  console.log(listOfAllTabUrls);
  return tab;
}

function getPropertiesOfAllTabs() {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      let tabOject = {
        url: tab.url,
        id: tab.id,
        favIconUrl: tab.favIconUrl,
        title: tab.title,
      };
      listOfAllTabId.push(tab.id);
      listOfAllTabUrls.push(tabOject);
    });
    removeDuplicates();
  });
  console.log(listOfAllTabUrls);
}

function groupAllTabs() {
  chrome.tabs.group({ tabIds: listOfAllTabId }, function (tabs) {
    console.log(tabs);
    console.log("tabs in groups...");
  });
}

function groupSelectedTabs() {
  chrome.tabs.group({ tabIds: listOfAllTabId }, function (tabs) {
    console.log(tabs);
    console.log("tabs in groups...");
  });
}

function onDeleteRow(e) {
  if (!e.target.classList.contains("deleteBtn")) {
    return;
  }

  const btn = e.target;
  btn.closest("tr").remove();
  listOfAllTabUrls.remove();
  console.log(
    `The new list of tabs after row is deleted....${listOfAllTabUrls}`
  );
}

const map = new Map();
function removeDuplicates() {
  for (const object of listOfAllTabUrls) {
    if (!map.has(object.url)) {
      map.set(object.url, true);
      diDuplicatedListOfUrls.push({
        url: object.url,
        id: object.id,
        favIconUrl: object.favIconUrl,
        title: object.title,
      });
    }
  }
}
