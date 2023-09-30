document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const tabList = document.getElementById("tabList");
  
    function searchTabs() {
      const searchTerm = searchInput.value.toLowerCase();
  
      chrome.tabs.query({}, (tabs) => {
        const matchingTabs = tabs.filter((tab) =>
          tab.title.toLowerCase().includes(searchTerm)
        );
  
        matchingTabs.reverse();
  
        const maxDisplayedTabs = 5;
        const displayedTabs = matchingTabs.slice(0, maxDisplayedTabs);
  
        tabList.innerHTML = "";
  
        displayedTabs.forEach((tab) => {
          const tabItem = createTabItem(tab);
          tabList.appendChild(tabItem);
        });
      });
    }
  
    function createTabItem(tab) {
      const tabItem = document.createElement("div");
      tabItem.classList.add("tab-item");
      tabItem.textContent = tab.title;
  
      tabItem.addEventListener("click", () => {
        chrome.tabs.update(tab.id, { active: true });
        chrome.windows.update(tab.windowId, { focused: true });
        window.close();
      });
  
      return tabItem;
    }
  
    function handleSearchButtonClick() {
      searchTabs();
    }
  
    searchInput.addEventListener("input", searchTabs);
    searchButton.addEventListener("click", handleSearchButtonClick);
  
    // Initial search
    searchTabs();
  });
  