// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            // Make extension active on all webpages
            pageUrl: { schemes: ["https", "http"] },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

let timerInSeconds = 0;

setInterval(() => {
  timerInSeconds++;
  console.log(timerInSeconds);
}, 1000);

let lastDomain;

// Triggers when page loads in current tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active) {
    handleBrowsing(tabId);
    changePictures(tabId);
  }
});

// Triggers when user goes to a different tab
chrome.tabs.onActivated.addListener(function (activeInfo) {
  handleBrowsing(activeInfo.tabId);
});

/**
 * Function that is to be called when user clicks a new tab or visits a new
 * page in the current tab. Gets the url and current timer to make POST
 * request to add browsing time to db. Resets the timer.
 * @param {Number} tabId
 */
function handleBrowsing(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    // tab.url will be undefined on chrome settings page etc.
    const currentDomain = tab.url ? getDomainFromUrl(tab.url) : undefined;
    console.log(`domain was at ${lastDomain} for ${timerInSeconds} seconds`);
    console.log("domain is now", currentDomain);
    lastDomain = currentDomain;
    timerInSeconds = 0;

    // TODO: make POST request
    testGetRequest();
    testPostRequest();
  });
}

function testGetRequest() {
  const request = new XMLHttpRequest();
  request.open("GET", "http://localhost:9000", true);

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      const data = JSON.parse(this.response);
      console.log(data);
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function () {
    // There was a connection error of some sort
  };

  request.send();
}

function testPostRequest() {
  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:9000/api/user/login", true);
  request.setRequestHeader(
    "Content-Type",
    "application/json"
  );
  request.send(JSON.stringify({ email: "a@a.com", password: "password" }));
}
function getDomainFromUrl(url) {
  const urlObj = new URL(url);
  const domain = urlObj.hostname.split("www.").join("");
  return domain;
}

/**
 * Checks if current tab's url is on the blacklist then injects content
 * replacement scripts.
 * @param {Number} tabId - The id of the current tab
 * @param {[String]} blackList - A list of blacklisted website domains
 */
function changePictures(
  tabId,
  blackList = [
    "reddit.com",
    "facebook.com",
    "tsn.ca",
    "instagram.com",
    "pinterest.ca",
    "youtube.com",
  ]
) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    // Will be null on chrome settings page etc
    if (!tabs[0] || !tabs[0].url) {
      return;
    }
    const url = new URL(tabs[0].url);
    const domain = url.hostname.split("www.").join("");

    if (blackList.includes(domain)) {
      chrome.tabs.executeScript(tabId, { file: "helpers.js" });

      // These can be run conditionally depending on user options
      chrome.tabs.executeScript(tabId, { file: "changePictures.js" });
      chrome.tabs.executeScript(tabId, { file: "changeVideos.js" });
    }
  });
}
