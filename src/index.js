document.addEventListener('DOMContentLoaded', () => {
    const quoteList = document.querySelector('#quote-list');
    const newQuoteForm = document.querySelector('#new-quote-form');

    // Function that fetches and display quotes
    function fetchQuotes() {
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(response => response.json())
        .then(quotes => {
            quoteList. innerHTML = '';
            quotes.forEach(quote => renderQuote(quote));
        });
    }

    //function to render a single quotre
    function renderQuote(quote) {
        const li = document.createElement('li');
        li.classList.add('quote-card');
        li.innerHTML = `
            <blockquote class=""blockquote">
                <p> ${quote.quote}</p>
                <footer class="blockquote-footer">${quote.author}</footer>
                <br>
                <button class='btn-success' data-id="${quote.id}">Likes: <span>${quote.likes.length}</span></button>
                <button class='btn-danger' data-id="${quote.id}">Delete</button>
            </blockquote>
        `;
        quoteList.appendChild(li);
    }

    // Event Listender for submitting new quote form 
    newQuoteForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const quote = formData.get('quote');
        const author = formData.get('author');

        fetch('http://localhost:3000/quotes', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({quote, author})
        })
        .then(response => response.json())
        .then(newQuote => {
            renderQuote(newQuote);
            event.target.reset();
        })
    });

    // Event delegation for like and delete button 
    quoteList.addEventListener('click', event => {
        if (event.target.matches('.btn-sccess')) {
            const quoteId = event.target.dataset.id;

            fetch('http://localhost:3000/likes', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({quoteId})
            })
            .then(() => fetchQuotes());
        }

        if (event.target.matches('btn-danger')) {
            const quoteId = event.target.dataset.id;

            fetch('http://localhost:3000/quotes/${quoteId}', {
                method: 'DELETE'
            })
            .then(() => fetchQuotes());
        } 
    });

    // Initial fetch of quotes
    fetchQuotes();
});