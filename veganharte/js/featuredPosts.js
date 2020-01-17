//Makes use of featured and entries arrays from data/entries.js

window.onload = function() {
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
                    <div class="carousel-caption mx-auto px-4 px-md-5 text-dark">
                        <h5>${entry.title}</h5>
                        <p class="d-none d-sm-block border-top border-dark">${entry.description}</p>
                    </div>
                </a>
            </div>`;
    }
}