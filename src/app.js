import Amplify, { API, graphqlOperation } from "aws-amplify";

import awsconfig from "./aws-exports";
import { deleteBook } from "./graphql/mutations";
import { listBooks } from "./graphql/queries";


Amplify.configure(awsconfig);

window.onload = function() {
    
async function removeBook(bookId){
    await API.graphql(graphqlOperation(deleteBook, {
      input: {id:bookId}
    }))
    getBooks()
}
  


async function getBooks() {
    
    let tbody = booksTable.getElementsByTagName('tbody')[0]
    tbody.innerHTML=''
    API.graphql(graphqlOperation(listBooks)).then((evt) => {
      evt.data.listBooks.items.map((book, i) => {

        let newRow = document.createElement('tr')
        tbody.appendChild(newRow)

        let newTitle = document.createElement('td')
        newTitle.innerText = book.title
        newRow.appendChild(newTitle)

        let newAuthor = document.createElement('td')
        newAuthor.innerText = book.author
        newRow.appendChild(newAuthor)

        let newGenre = document.createElement('td')
        newGenre.innerText = book.genre
        newRow.appendChild(newGenre)

        let deleteButton = document.createElement('button')
        deleteButton.innerText ="Delete"
        deleteButton.addEventListener("click", ()=> {console.log(book.id); removeBook(book.id)})
        newRow.appendChild(deleteButton)
      });
    })
}

const booksTable = document.getElementById("books-table")
const addButton = document.getElementById("addButton")


getBooks()

}