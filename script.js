let listOfAllTabId = [];
let listOfAllTabUrls = [];
let selectedTabs = [];

let displayBtn = document.getElementById("input-btn");
let groupBtn = document.getElementById("group-btn");
let singleBtn = document.getElementById("single-btn");
const ulEl = document.getElementById("ul-el");

displayBtn.addEventListener("click", function () {
  console.log("******Display All tab urls******");
  getPropertiesOfAllTabs();
  rendertabs(listOfAllTabUrls);
});

singleBtn.addEventListener("click", function () {
  console.log("******Display selected tab url******");
  getCurrentTab();
  rendertabs(selectedTabs);
});

groupBtn.addEventListener("click", function () {
  console.log("******This is for the grouping functionality******");
  groupAllTabs();
});

function rendertabs(tabUrls) {
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
