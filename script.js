const filter = document.querySelector(".filter-input");
const container = document.querySelector(".container");
const loader = document.querySelector(".loader-container");

const getRenderedQoutes = (data) => {
    const innerHTML = data.map((quote) => {
        return `
            <div class="wrapper">
                <p class="qoute">
                    ${quote.quote}
                </p>
            </div>
        `
    }).join("") || `
            <div class="error-wrapper">
                <p class="error">
                    No Qoutes exists!
                </p>
            </div>
    `;
    return innerHTML;
}
const handleFilter = (quotes) => {
        filter.addEventListener("input", (e) => {
        const value = e.target.value;
        if(value) {
            const filteredQoutes = quotes.filter((q) => q.quote.toLowerCase().includes(value.toLowerCase()));
            container.innerHTML = getRenderedQoutes(filteredQoutes);
        }
        
    })
}
const renderQoutes = async() => {
    const res = await fetch("https://dummyjson.com/quotes",
        {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }
    )
    if(res.ok) {

        const data = await res.json();
        const quotes = data.quotes;

        loader.classList.add("hidden");
        filter.classList.remove("hidden");

        container.innerHTML = getRenderedQoutes(quotes);

        handleFilter(quotes);
    }
    else {
        const faild = `
            <div class="error-wrapper">
                <p class="error">
                    Failed to fetch qoutes!
                </p>
            </div>
        `;

        loader.classList.add("hidden");
        container.innerHTML = faild;
    }
}

renderQoutes();

