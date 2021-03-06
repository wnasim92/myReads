import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import BookSelection from './BookSelection'
import SearchBooks from './SearchBooks'


class BooksApp extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
         // showSearchPage: false, //not needed since we are using React Routes
         books:[]
      };
    }


   getBooks = () => {
     BooksAPI.getAll()
     .then((books)=>{
        this.setState({books})
      //   same as saying {books:books}
        console.log(this.state.books)
     })
   }

   changeShelf = (book, shelf) => {
      BooksAPI.update(book,shelf)
      .then((response)=>{
         console.log('updated books', response)
         // changing book's shelf
         book.shelf = shelf
         // updating books state to not show the previous book. and then concatenating books with update book
         this.setState(state => ({
            books:state.books.filter(prevBook=>
               prevBook.id !== book.id).concat([book])
            }))
         })
      }
   componentDidMount = () => {
       this.getBooks()
   }



  render() {
    return (
      <div className='app'>
         <Route exact path='/' render={() => (
            <BookSelection changeShelf={this.changeShelf} books={this.state.books}/>
         )}/>

         <Route exact path='/search' render={ ()=>(
            <SearchBooks books={this.state.books} changeShelf={this.changeShelf}/>
         )}/>
      </div>
   )}}

export default BooksApp
