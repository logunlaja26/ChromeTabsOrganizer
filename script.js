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
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      console.log(tab.id);
      console.log(tab.url);
    });
  });
}
function groupTabs() {
  chrome.tabs.group({}, function () {
    console.log("grouping..");
  });
}
