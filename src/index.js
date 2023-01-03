
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(data => {
        dataHandler(data)
        formHandler(data)
    })
})

function formHandler(data) {
    const form = document.getElementById('new-quote-form')
        form.addEventListener('submit', (event) => {
        event.preventDefault()
        let list = document.getElementById('quote-list')
        let newQuoteHolder = document.createElement('li')
        let newQuote = document.getElementById('new-quote')
            newQuoteHolder.append(newQuote.value)
            
            console.log(newQuote)
            let newAuthorHolder = document.createElement('p')
            let newAuthor = document.getElementById('author')
            newAuthorHolder.append(newAuthor.value)
            newQuoteHolder.append(newAuthorHolder)
            list.append(newQuoteHolder)
            data.push(newQuoteHolder)
            patch(newQuoteHolder)

        })
}


function dataHandler(data) {
    data.forEach(element => {
        let list = document.getElementById('quote-list')
        let listElement = document.createElement('li')
        let quoteId = document.createElement('p')
        quoteId.textContent = element.id
        let actualQuoteBlock = document.createElement('blockquote')
        let actualQuote = document.createElement('p')
        actualQuote.textContent = element.quote
        actualQuoteBlock.append(actualQuote)
        let quoteAuthor = document.createElement('footer')
        quoteAuthor.textContent = element.author
        listElement.append(quoteId)
        listElement.append(actualQuoteBlock)
        listElement.append(quoteAuthor)
        list.append(listElement)
    });
}

function patch(data) {
    fetch('http://localhost:3000/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
    }
