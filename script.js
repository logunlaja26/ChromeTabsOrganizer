let listOfTabId = [];

let displayBtn = document.getElementById("input-btn");
let groupBtn = document.getElementById("group-btn");
let singleBtn = document.getElementById("single-btn");

displayBtn.addEventListener("click", function () {
  console.log("******The Beginning of the Project********");
  getPropertiesOfAllTabs();
});

groupBtn.addEventListener("click", function () {
  console.log("******This is for the grouping functionality******");
  groupTabs();
});

singleBtn.addEventListener("click", function () {
  console.log("******Display selected tab url******");
  getCurrentTab();
});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab.id);
  return tab;
}

function getPropertiesOfAllTabs() {
  console.log(listOfTabId);
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      listOfTabId.push(tab.id);
      console.log(tab.url);
    });
  });
}

function groupTabs() {
  chrome.tabs.group({ tabIds: listOfTabId }, function (tabs) {
    console.log(tabs);
    console.log("tabs in groups...");
  });
}
