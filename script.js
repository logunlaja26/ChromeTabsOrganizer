let listOfAllTabId = [];
let listOfAllTabUrls = [];
let selectedTabs = [];

let displayAllTabsBtn = document.getElementById("input-btn");
let groupTabsBtn = document.getElementById("group-btn");
let singleBtn = document.getElementById("single-btn");
const ulEl = document.getElementById("ul-el");

displayAllTabsBtn.addEventListener("click", function () {
  console.log("******Display All tab urls******");
  getPropertiesOfAllTabs();
  localStorage.setItem("listOfAllTabUrls", JSON.stringify(listOfAllTabUrls));
  renderTabs(listOfAllTabUrls);
  console.log(localStorage.getItem("listOfAllTabUrls")); // to verify data is persisted to local storage
});

singleBtn.addEventListener("click", function () {
  console.log("******Display selected tab url******");
  getCurrentTab();
  localStorage.setItem("selectedTabs", JSON.stringify(selectedTabs));
  renderTabs(selectedTabs);
  console.log(localStorage.getItem("selectedTabs"));
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
  selectedTabs.push(tab.url); // Selected tab url entered into this array
  console.log(selectedTabs);
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
  chrome.tabs.group({ tabIds: selectedTabs }, function (tabs) {
    console.log(tabs);
    console.log("tabs in groups...");
  });
}
