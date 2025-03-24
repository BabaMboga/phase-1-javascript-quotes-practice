document.addEventListener('DOMContentLoaded', () => { //waits for DOM to load so that it can run everything else
    const quoteList = document.querySelector('#quote-list');
    const newQuoteForm = document.querySelector('#new-quote-form');

    function fetchQuotes(){
        fetch('http://localhost:3000/quotes?_embed=likes')
            .then(response => response.json())
            .then(quotes => {
                quoteList.innerHTML = '' // clearing list before we add new content
                quotes.forEach(quote => renderQuote(quote));
            } );
    }

    function renderQuote(quote){
        const li = document.createElement('li');
        li.classList.add('quote-card');

        li.innerHTML = `
            <blockquote class="blockquote">
                <p class="mb-0">${quote.quote}</p>
                <footer class="blockquote-footer">${quote.author}</footer>
                <br>
                <button class='btn-success' data-id="${quote.id}">Likes: <span>${quote.likes}</span></button>
                <button class='btn-danger' data-id="${quote.id}">Delete</button>
            </blockquote>
        `;

        quoteList.appendChild(li);
    }

    newQuoteForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const quote = formData.get('quote');
        const author = formData.get('author');

        fetch('http://localhost:3000/quotes',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            } ,
            body: JSON.stringify({quote, author}),

        })
            .then(response => response.json())
            .then(newQuote => {
                renderQuote(newQuote);
                event.target.reset()
            })
    })

    
    fetchQuotes();
})