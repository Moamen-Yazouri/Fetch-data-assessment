const filter = document.querySelector(".info-container");
const filterInput = document.querySelector(".info-container .filter-input");
const container = document.querySelector(".container");
const loader = document.querySelector(".loader-container");
const quotesCount = document.querySelector(".quotes-number");
let debounceTimer;
const getRenderedquotes = (data) => {
    const innerHTML = data.map((quote) => {
        return `
            <div class="wrapper">
                <p class="qoute">
                    ${quote.quote}
                </p>
                <span>
                </span>
            </div>
        `
    }).join("") || `
            <div class="error-wrapper">
                <p class="error">
                    No quotes exists!
                </p>
            </div>
    `;
    ;
    return innerHTML;
}
const handleFilter = (e, quotes) => {
        const value = e.target.value.toLowerCase();
        console.log(value);
        if(value !== "" && value) {
            quotesCount.textContent = "";
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const filteredquotes = quotes.filter((q) => q.quote.toLowerCase().includes(value));
                if(filteredquotes.length === 0) {
                    container.innerHTML = `
                        <div class="error-wrapper">
                            <p class="error">
                                No Quotes matches!
                            </p>
                        </div> 
                    `;
                    quotesCount.textContent = `Matched Quotes: 0`;
                    return;
                }
                container.innerHTML = getRenderedquotes(filteredquotes);
                quotesCount.textContent = `Matched Quotes: ${filteredquotes.length}`;
            }, 300);
        }
        else {
            container.innerHTML = getRenderedquotes(quotes);
            quotesCount.textContent = `Quotes ${quotes.length}`;
        }
}
const renderquotes = async() => {
    try {
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
        quotesCount.textContent = `Quotes ${quotes.length}`;
        container.innerHTML = getRenderedquotes(quotes);
        filterInput.addEventListener("input", (e) => {
            handleFilter(e, quotes);
        })
    }
    }
    catch(err) {
        const faild = `
            <div class="error-wrapper">
                <p class="error">
                    Failed to fetch quotes!
                </p>
                <div class="retry-wrapper">Do you want to <a>retry</a> ?</div>
            </div>
        `;
        container.innerHTML = faild;
        const retry = document.querySelector(".retry-wrapper a");
        retry.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.reload();
        })
    }
    finally {
        loader.classList.add("hidden");
    }

}

renderquotes();

