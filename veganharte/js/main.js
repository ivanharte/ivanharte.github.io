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

/********************* UI TWEAKS *********************/
/* Removes focus off carousel controls after mouse click, while keeping it for keyboard users
----------------------------------------------------------*/
function removeFocusAfterClick() {
    const carouselControls = document.getElementsByClassName("carousel-control");
    for (let control of carouselControls) {
        control.onmousedown = function(e) { e.preventDefault(); };
    }
}

/********************* SCRIPT EXECUTION *********************/
window.onload = function() {
    
    serveFeatured();

    removeFocusAfterClick();

};