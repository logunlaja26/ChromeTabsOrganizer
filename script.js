let listOfAllTabId = [];
let listOfAllTabUrls = [];
let selectedTabs = [];

let displayAllTabsBtn = document.getElementById("input-btn");
let deleteTabsBtn = document.getElementById("delete-btn");
let groupTabsBtn = document.getElementById("group-btn");
let singleBtn = document.getElementById("single-btn");
let ulEl = document.getElementById("ul-el");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("tabs"));
console.log(`local storage values ......${leadsFromLocalStorage}`);

if (leadsFromLocalStorage) {
  listOfAllTabUrls = leadsFromLocalStorage;
  renderTabs(listOfAllTabUrls);
}

displayAllTabsBtn.addEventListener("click", function () {
  console.log("******Display All tab urls******");
  getPropertiesOfAllTabs();
  localStorage.setItem("tabs", JSON.stringify(listOfAllTabUrls));
  renderTabs(listOfAllTabUrls);
  console.log(
    `lets see whats in localStoragae..... ${localStorage.getItem("tabs")}`
  );
  listOfAllTabUrls = []; /** Empties the array in the case of displaying all the tabs after the list of tab urls 
  has already been displayed in the page. Prevents from adding the same urls over again to the localstorage. 
   **/
});

singleBtn.addEventListener("click", function () {
  console.log("******Display selected tab url******");
  getCurrentTab();
  localStorage.setItem("tabs", JSON.stringify(listOfAllTabUrls));
  renderTabs(listOfAllTabUrls);
  console.log(localStorage.getItem("tabs"));
});

deleteTabsBtn.addEventListener("click", function () {
  console.log("******Delete tabs url******");
  localStorage.clear();
  listOfAllTabUrls = [];
  renderTabs(listOfAllTabUrls);
});

groupTabsBtn.addEventListener("click", function () {
  console.log("******This is for grouping tabs in a window******");
  groupAllTabs();
});

function renderTabs(tabUrls) {
  let listItems = "";
  for (let i = 0; i < tabUrls.length; i++) {
    listItems += `
          <li>
              <a target='_blank' href='${tabUrls[i]}'>
                  ${tabUrls[i]}
              </a>
          </li>
      `;
  }
  ulEl.innerHTML = listItems;
}

// Store array of tab urls to localStorage

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab.id);
  console.log(tab.url);
  listOfAllTabUrls.push(tab.url); // Selected tab url entered into this array
  console.log(listOfAllTabUrls);
  return tab;
}

function getPropertiesOfAllTabs() {
  console.log(listOfAllTabId);
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      listOfAllTabId.push(tab.id);
      listOfAllTabUrls.push(tab.url);
      console.log(tab.url);
    });
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
