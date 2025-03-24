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

    
})