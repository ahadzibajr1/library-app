import Amplify, { API, graphqlOperation } from "aws-amplify";

import awsconfig from "./aws-exports";
import { createBook } from "./graphql/mutations";



Amplify.configure(awsconfig);
window.onload = function() {
    async function addNewBook(title,author,genre) {
        const book = {
          title: title,
          author: author,
          genre: genre
        };
     
        return await API.graphql(graphqlOperation(createBook, { input: book }));
      }

      const addButton = document.getElementById("add")

      addButton.addEventListener("click", async (e)=> {
          e.preventDefault()
          let valid = true
          if (document.getElementById("title").value.toString().trim().length == 0) {
            displayTitleError(true)
            valid = false
          } else {
            displayTitleError(false)
          }

          if (document.getElementById("author").value.toString().trim().length == 0) {
            displayAuthorError(true)
            valid = false
          } else {
              displayAuthorError(false)
          }

          if(!valid)
            return
           
          await addNewBook(document.getElementById("title").value.toString(),document.getElementById("author").value.toString(),
          document.getElementById("genre").value.toString())
          window.location ="../index.html"
      })

      function displayAuthorError(option) {
          
          let msg = document.getElementById('author-error')

          if (option)
            msg.style.display = "block"
          else
           msg.style.display = "none"
      }

      function displayTitleError(option) {
        let msg = document.getElementById('title-error')
        
        if (option)
            msg.style.display = "block"
          else
           msg.style.display = "none"
    }
    
}