document.addEventListener("DOMContentLoaded", function() {
    // Get the search query from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query") || "";
    window.searchQuery = query;
    fetchBooks(query);

    
});

let currentPage = 0;
let booksPerPage = 5;
let globalBooks = [];

// Function to fetch books from the backend based on the search query
async function fetchBooks(query) {
    try {
        // Ensure query is correctly passed in the URL for the backend request
        if (!query) {
            console.log("No search query provided");
            return; // Do not proceed if the query is empty
        }

        // Construct URL to fetch books based on the query
        const response = await fetch(`/search/searchQuery?query=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.message) {
            // Display no results message if no books found
            document.getElementById('bookCardContainer').innerHTML = `<div>No books found matching your search.</div>`;
        } else {
            // Display the books
            displayBooks(data.books);
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
}

// Function to display books as clickable buttons that lead to item_info.html
async function displayBooks(books) {
    globalBooks = books;
    currentPage = 0;
    renderBooksPage();
}

// Function to render and gather all the relevant books
async function renderBooksPage() {
    const bookCardContainer = document.getElementById('bookCardContainer');
    bookCardContainer.innerHTML = ''; // Clear previous content

    if (!globalBooks || globalBooks.length === 0) {
        bookCardContainer.innerHTML = `<div>No books found matching your criteria.</div>`;
        return;
    }

    const start = currentPage * booksPerPage;
    const end = Math.min(start + booksPerPage, globalBooks.length);
    const currentBooks = globalBooks.slice(start, end);

    for (const book of currentBooks) {
        let title;
        const bookWrapper = document.createElement('div');
        bookWrapper.classList.add("my-0");

        const bookButton = document.createElement('a');
        bookButton.classList.add('w-100');
        bookButton.setAttribute('href', `/search/book_info?isbn=${book.isbn}`);

        let coverImageUrl = "/search/static/images/error.png";
        try {
            const coverResponse = await fetch(`/search/serve-book-cover/${book.isbn}`);
            if (coverResponse.ok) {
                let blob = await coverResponse.blob();
                let coverBlob = new Blob([blob], { type: "image/jpg" });
                coverImageUrl = URL.createObjectURL(coverBlob);
            }
        } catch (coverError) {
            console.error(`Error fetching cover for ISBN: ${book.isbn}`, coverError);
        }

        title = (book.format === "Audio" ? "🎧" : "📖") + book.title;

        bookButton.innerHTML = `
            <div class="card w-100 mb-3">
                <div class="row p-2">
                    <div class="col-2 d-flex justify-content-center align-items-center" style="background-color: white">
                        <img src="${coverImageUrl}" class="book-cover img-fluid" alt="Book Cover">
                    </div>
                    <div class="col-10 book-info">
                        <h5 class="card-header">${title}</h5>
                        <div class="card-body">
                            <div class="container row">
                                <div class="col-8">
                                    <h6 class="card-title fw-normal">Author: ${book.author}</h6>
                                    <h6 class="card-title fw-normal">Genre: ${book.genre}</h6>
                                    <h6 class="card-title fw-normal">Format: ${book.format}</h6>
                                    <h6 class="card-title fw-normal">Status: ${book.status}</h6>
                                </div>
                                <div class="col-4 d-flex flex-column justify-content-center">
                                    <button type="submit" class="btn btn-custom-size p-2 m-2">Place Hold</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        bookWrapper.appendChild(bookButton);
        bookCardContainer.appendChild(bookWrapper);
    }

    // Add navigation arrows
    const navDiv = document.createElement('div');
    navDiv.classList.add('d-flex', 'justify-content-between', 'my-4');

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.className = 'btn btn-outline-secondary';
    prevBtn.disabled = currentPage === 0;
    prevBtn.onclick = () => {
        currentPage--;
        renderBooksPage();
    };

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.className = 'btn btn-outline-secondary';
    nextBtn.disabled = end >= globalBooks.length;
    nextBtn.onclick = () => {
        currentPage++;
        renderBooksPage();
    };

    navDiv.appendChild(prevBtn);
    navDiv.appendChild(nextBtn);
    bookCardContainer.appendChild(navDiv);
}

// Function to apply all the filters and send to the backend
function applyFilters() {
    // Get the current search query from the URL (this is your query parameter)
    const searchQuery = window.searchQuery || new URLSearchParams(window.location.search).get("query") || "";    // Collecting filter values
    const genreFilters = getCheckedBoxes('#collapseThree input[type="checkbox"]');
    const formatFilters = getCheckedBoxes('#collapseTwo input[type="checkbox"]');
    const availabilityFilters = getCheckedBoxes('#collapseOne input[type="checkbox"]');
    const audienceFilters = getCheckedBoxes('#collapseFour input[type="checkbox"]');
    const ratingFilters = getCheckedBoxes('#collapseFive input[type="checkbox"]');
    console.log(searchQuery, genreFilters, formatFilters, availabilityFilters, audienceFilters, ratingFilters);
    // Display loading indicator
    const bookCardContainer = document.getElementById('bookCardContainer');
    bookCardContainer.innerHTML = `<div>Loading...</div>`;  // Show loading text

    // Sending filter data and search query to the backend
    fetch('/search/filter_books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            searchQuery: searchQuery,  // Include the query from the URL
            genres: genreFilters,
            formats: formatFilters,
            availability: availabilityFilters,
            audience: audienceFilters,
            ratings: ratingFilters,
        }),
    })
    .then(response => response.json())
    .then(filteredBooks => {
        // Clear the container and display the filtered books
        displayBooks(filteredBooks);
    })
    .catch(error => {
        console.error('Error:', error);
        bookCardContainer.innerHTML = `<div>Error fetching books. Please try again later.</div>`;  // Display error message
    });
}

// Function to reset all filters
function resetFilters() {
    const checkboxes = document.querySelectorAll('.form-check-input, input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    applyFilters(); // Refresh book results without filters
}

// Function to get the checked checkbox values
function getCheckedBoxes(form_id) {
    const checkboxes = document.querySelectorAll(form_id);
    const checkedValues = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedValues.push(checkbox.value);
        }
    });

    return checkedValues;
}
