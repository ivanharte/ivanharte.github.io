//Constants from entries.js:
//      featured
//      entries

/********************* CONTENT SERVING *********************/

/* Serves featured posts to carousel
----------------------------------------------------------*/
function serveFeatured() {
    const featuredContainer  = document.getElementById("featured-container"),
          featuredIndicators = document.getElementById("featured-indicators");
    
    for (let i = 0; i < featured.featured.length; i++) {
        const entryID = featured.featured[i],
              entry   = entries[entryID];
        
        featuredIndicators.innerHTML += 
            `<li data-target="#featured-posts" 
                data-slide-to="${i}" 
                class="bg-dark ${entryID === featured.activeID ? "active" : ""}"></li>`;
              
        featuredContainer.innerHTML += `
            <div class="carousel-item ${entryID === featured.activeID ? "active" : ""}">
                <img src="img/${entry.thumbnail.large}" 
                    class="d-block w-100" 
                    alt="${entry.thumbnail.altText}" 
                    id="featured-${i}">
                <a href="entries/${entry.URL}">
                    <div class="carousel-caption mx-auto px-4 px-md-5 text-dark rounded-pill">
                        <h2 class="h5">${entry.title}</h2>
                        <p class="d-none d-sm-block border-top border-dark pt-1">${entry.description}</p>
                    </div>
                </a>
            </div>`;
    }
}

/* Serves latest entries
----------------------------------------------------------*/
function serveLatestEntries() {
    const latestEntries = entries.filter(entry => entries.indexOf(entry) >= entries.length - 5).reverse();
    document.getElementById("latestEntries").innerHTML += 
        `<div class="row">
            <div class="col-md-6">
                <li class="media position-relative flex-column py-3">
                    <img src="img/${latestEntries[0].thumbnail.small}" 
                        class="w-100 mb-2" 
                        alt="${latestEntries[0].thumbnail.altText}">
                    <div class="media-body">
                        <h5>
                            <a href="entries/${latestEntries[0].URL}" class="stretched-link">
                                ${latestEntries[0].title}
                            </a>
                        </h5>
                        <p>${latestEntries[0].description}</p>
                    </div>
                </li>
            </div>
            <div class="col-md-6">
                <div class="row" id="2x2"></div>
            <div>
        <div>`;
    for (let i = 1; i < latestEntries.length; i++) {
        document.getElementById("2x2").innerHTML += 
            `<li class="media position-relative flex-column col-6 py-3">
                <img src="img/${latestEntries[i].thumbnail.small}" 
                    class="w-100 mb-2" 
                    alt="${latestEntries[i].thumbnail.altText}">
                <div class="media-body mx-auto text-center">
                    <h5>
                        <a href="entries/${latestEntries[i].URL}" class="stretched-link">
                            ${latestEntries[i].title}
                        </a>
                    </h5>
                </div>
            </li>`;
    }
}

/* Serves entries history
----------------------------------------------------------*/
function serveEntriesHistory(category) {
    const filteredEntries = entries.filter(entry => entry.category === category).reverse();
    const entriesHistory  = document.getElementById(`historial-${category}`);
    for (let entry of filteredEntries) {
        entriesHistory.innerHTML += 
            `<li class="media position-relative row mx-xl-5 px-xl-5 py-2 align-items-center narrow-gutters-xs">
                <h5 class="d-none col-12">
                    <a href="entries/${entry.URL}" class="stretched-link">
                        ${entry.title}
                    </a>
                </h5>
                <img src="img/${entry.thumbnail.small}" 
                    class="col-4 col-md-3 col-lg-2 w-100" 
                    alt="${entry.thumbnail.altText}">
                <div class="media-body col-8 col-md-9 col-lg-10">
                    <h5>
                        <a href="entries/${entry.URL}" class="stretched-link">
                            ${entry.title}
                        </a>
                    </h5>
                    <p class="m-0"><time class="mr-3 font-italic" datetime="${entry.date}">${reconvert(entry.date)}</time>${entry.description}</p>
                </div>
            </li>`;
    }
}

/********************* RECEIPT BROWSER *********************/
//Classified receipts storage
const classifiedReceipts = {
    mainIngredient: {},
    course: {},
    cookingMethod: {},
    style: {},
    glutenFree: []
};

//Category list
const categories = Object.keys(classifiedReceipts);

//Filtered receipts control
const filteredReceipts = {
    filtered: [],
    mainIngredient: undefined,
    course: undefined,
    cookingMethod: undefined,
    style: undefined,
    glutenFree: undefined,
}

/* Fills browsing tags clusters with tags and their associated receipts
----------------------------------------------------------*/
function classifyReceipts(category) {
    for (let entry of entries) {
        if (entry.receipt) {
            const tagContainer = entry.receipt[category];
            
            for (let tag of tagContainer) {
                    
                if (tag === true || tag === false) {    //for boolean containers
                    if (tag === true) {
                        classifiedReceipts[category].push(entry.id);
                    }
                    break;
                } else {                                //For multi-tag containers
                    if (classifiedReceipts[category][tag] === undefined) {
                        classifiedReceipts[category][tag] = [entry.id];
                    } else {
                        classifiedReceipts[category][tag].push(entry.id);
                    }
                }
            }
        }
    }
}

/* Fills UI selects with classified browsing tags
----------------------------------------------------------*/
function fillSelectsWithBrowsingTags(category) {
    const field = document.getElementById(category),
          tags   = Object.keys(classifiedReceipts[category]);
    if (field.type === "select-one") {
        for (let tag of tags) {
            field.innerHTML += `<option value="${tag}">${tag[0].toUpperCase() + tag.substring(1)}</option>`;
        }
    }
}

/* Assigns event listeners to UI fields
----------------------------------------------------------*/
function assignEventListener(category) {
    const field = document.getElementById(category);
    
    if (field.type === "select-one") {  //selects
            //Assigns filtering criteria to filtered receipts control
        field.onchange = function() {
            if (field.value === "all") {
                filteredReceipts[category] = undefined;
            } else {
                filteredReceipts[category] = field.value;
            }
            filteredReceipts.filtered = filterReceipts();
            serveFilteredReceipts();
        }
    } else {    //checkboxes
        field.onchange = function() {
            if (field.checked) {
                filteredReceipts[category] = true;
            } else {
                filteredReceipts[category] = undefined;
            }
            filteredReceipts.filtered = filterReceipts();
            serveFilteredReceipts();
        }
    }
}

/* Filters receipts
----------------------------------------------------------*/
function filterReceipts() {
    let receipts = entries.filter(entry => entry.receipt);
    for (let category of categories) {
        if (filteredReceipts[category] !== undefined) {
            receipts = 
                receipts.filter(receipt => receipt.receipt[category].includes(filteredReceipts[category]));
        }
    }
    return receipts;
}

/* Serves filtered entries to container
----------------------------------------------------------*/
function serveEntries(entriesArray, targetContainerId) {
    const container = document.getElementById(targetContainerId);
    const containerContent = entriesArray.map(entry => {
        
        return `<li class="media position-relative flex-column col-md-6 col-xl-4 py-3">
        <img src="img/${entry.thumbnail.small}" class="w-100 mb-2" alt="${entry.thumbnail.altText}">
        <div class="media-body">
          <h5><a href="entries/${entry.URL}" class="stretched-link">${entry.title}</a></h5>
          <p>${entry.description}</p>
        </div>
      </li>`;
    });
    container.innerHTML = containerContent.join("");
}

/* Serves filtered receipts to results display
----------------------------------------------------------*/
function serveFilteredReceipts() {
    const resultsDisplay = document.getElementById("receipt-browser-results");
    
    //Shows results display only if there are filters selected
    let count = 0;
    for (let category of categories) {
        if (filteredReceipts[category] === undefined) {
            count++;
        }
    }
    if (count === categories.length) {
        resultsDisplay.classList.add("d-none");
        resultsDisplay.classList.remove("row");
        return;
    } else {
        resultsDisplay.classList.remove("d-none");
        resultsDisplay.classList.add("row");
    }

    //shows result
    if (filteredReceipts.filtered.length === 0) {
        resultsDisplay.innerHTML = 
            '<p class="mx-auto">No hay recetas disponibles para esos criterios de búsqueda.</p>';
    } else {
        serveEntries(filteredReceipts.filtered, "receipt-browser-results");
    }

    //moves receipt browser to top in order to display results
    document.getElementById("underNavBar").classList.remove("d-none");
    document.getElementById("underNavBar").classList.add("d-block");
    document.getElementById("underNavBar").scrollIntoView(true);
    document.getElementById("underNavBar").classList.remove("d-block");
    document.getElementById("underNavBar").classList.add("d-none");
}

/* Ensembles the receipt browser
----------------------------------------------------------*/
function buildReceiptBrowser() {
    for (let category of categories) {
        classifyReceipts(category);
        fillSelectsWithBrowsingTags(category);
        assignEventListener(category);
    }
}

/********************* UI TWEAKS AND PRESENTATION *********************/
/* Removes focus off carousel controls after mouse click, while keeping it for keyboard users
----------------------------------------------------------*/
function removeFocusAfterClick() {
    const carouselControls = document.getElementsByClassName("carousel-control");
    for (let control of carouselControls) {
        control.onmousedown = function(e) { e.preventDefault(); };
    }
}

/* Sets form submission redirection URL
----------------------------------------------------------*/
function setFormRedirectionURL() {
    const baseURL = location.href;
    const redirector = document.querySelector("input[name=_redirect]");
    redirector.setAttribute("value", `${baseURL}#successful-submit`);
}

/* Opens modal after form redirect
----------------------------------------------------------*/
function successfulSubmit() {
    const popUp = document.getElementById("successful-submit");
    popUp.classList.remove("invisible");
    popUp.classList.add("visible");
    popUp.innerHTML = 
        `<div class="alert alert-success alert-dismissable show fade" role="alert">
            Tu mensaje se ha enviado correctamente. Gracias por contactarme!
            <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
    popUp.scrollIntoView(true);
}

/* Reconverts date format
----------------------------------------------------------*/
function reconvert(dateString) {
    return dateString.split("-").reverse().join("-");
}

/********************* SCRIPT EXECUTION *********************/
window.onload = function() {
    
    switch (document.body.dataset.title) {
        case "index":
            serveFeatured();
            serveLatestEntries();
            removeFocusAfterClick();
            buildReceiptBrowser();  //al terminar de servir los datos
            break;
        case "receipts":
            buildReceiptBrowser();
            serveEntriesHistory("receta");
            break;
        case "nutrition":
            serveEntriesHistory("nutricion");
            break;
        case "veganism":
            serveEntriesHistory("veganismo");
            break;
        case "barcelona":
            serveEntriesHistory("barcelona");
            break;
    }
    setFormRedirectionURL();
    if (location.hash === "#successful-submit") {
        successfulSubmit();
    }

};