let displayBtn = document.getElementById("input-btn");

displayBtn.addEventListener("click", function () {
  console.log("this is my project......");
  getPropertiesOfAllTabs();
});

function getPropertiesOfAllTabs() {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      //console.log(`Various urls... , ${tab.url}`);
      console.log(tab.url);
    });
  });
}
