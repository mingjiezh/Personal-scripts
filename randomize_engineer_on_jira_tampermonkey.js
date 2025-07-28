// ==UserScript==
// @name         Randomize Engineer order on JIRA Sprint Board
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Randomize the order of engineer (or epic) on JIRA sprint board
// @author       mingjiezh
// @match        https://jira.braze.com/secure/RapidBoard.jspa*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

    console.log("Engineer randomizing Tampermonkey script started");

    function randomizeEngineers() {
        // Access the ghx-pool element that contains all engineers and their tickets
        //debugger;
        const ghxPool = document.getElementById('ghx-pool');

        if (!ghxPool) {
            console.error("ghx-pool element not found, stop randomizing");
            return;
        }

        const engineers = Array.from(ghxPool.querySelectorAll('.ghx-swimlane'));
        if (engineers.length === 0) {
            console.log("No engineers found to randomize");
            return;
        }

        const randomizedEngineers = engineers.sort(() => Math.random() - 0.5);

        // Clear the ghx-pool and append the randomized engineers
        ghxPool.innerHTML = '';
        randomizedEngineers.forEach(engineer => ghxPool.appendChild(engineer));

        console.log("Engineers have been randomized");
    }

    // Create a MutationObserver to watch for changes in the body to ensure script starts after page is fully loaded
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (document.getElementById('ghx-pool')) {
                randomizeEngineers(); // Call the randomization function when ghx-pool is found
                observer.disconnect(); // Stop observing once we've found the element
            }
        });
    });

    // Start observing the body for changes
    observer.observe(document.body, { childList: true, subtree: true });
})();
