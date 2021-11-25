let listOfTabId = [];

let displayBtn = document.getElementById("input-btn");
let groupBtn = document.getElementById("group-btn");

displayBtn.addEventListener("click", function () {
  console.log("******The Beginning of the Project********");
  getPropertiesOfAllTabs();
});

groupBtn.addEventListener("click", function () {
  console.log("******This is for the grouping functionality******");
  groupTabs();
});

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
