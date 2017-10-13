import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    booksInLibrary : []
  }

  viewLibrary = () => {
    BooksAPI.getAll().then(library => {
      this.setState({booksInLibrary: library})
    })
  }

  updateLibrary = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf).then(this.viewLibrary())
    //this returns an array of strings. these need to be mapped back to their book objects
  }

  render() {
    this.viewLibrary()
    //@returns the entire application
    return (
        <div className="app">
          <Route path="/search" render={() => (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to={{pathname: '/'}}>Close</Link>
              <SearchForm update={this.updateLibrary}/>
            </div>
          </div>
        )}/>
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Section text="Currently Reading" name="currentlyReading" update={this.updateLibrary} bookSet={this.state.booksInLibrary}/>
                  <Section text="Want to Read" name="wantToRead" update={this.updateLibrary} bookSet={this.state.booksInLibrary}/>
                  <Section text="Read" name="read" update={this.updateLibrary} bookSet={this.state.booksInLibrary}/>
                </div>
              </div>
              <div className="open-search">
                <Link to={{pathname: '/search'}}>Add a book</Link>
              </div>
            </div>
          )}/>
        </div>
    )
  }
}

class Section extends React.Component {

  render() {
    var booksInSection = this.props.bookSet.filter(book => book.shelf === this.props.name).map(book =>
      <Book title={book.title} authors={book.authors} imageUrl={book.imageLinks.thumbnail} bookId={book.id} update={this.props.update} shelf={this.props.text}/>)

    return (
      //@return: one of the three sections of the app.  Each section gets a filtered
      //copy of the main
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.text}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksInSection}
          </ol>
        </div>
      </div>
    )
  }
}

const Book = (props) => (
  //@return a book in the application.  Only has render() function, so was
  //reduced to a functional component
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url(' + props.imageUrl + ')' }}></div>
        <BookDropdown update={props.update} bookId={props.bookId} shelf={props.shelf}/>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{props.authors}</div>
    </div>
  </li>
)

class BookDropdown extends React.Component {
  //passes data up to the application for state changes
  handleUpdate = (select) => {
    var currentBook = document.getElementById(this.props.bookId)
    this.props.update(currentBook, currentBook.options[currentBook.selectedIndex].value)
  }
  //sets the selector to the correct entry for that section
  componentDidMount = () => {
    var selector = document.getElementById(this.props.bookId)
    selector.value = this.props.shelf
  }

  render() {
    return (
      //@return: a dropwdown menu that is on each book in the app. Values
      //were adjusted to fit what the api returns
        <div className="book-shelf-changer">
          <select id={this.props.bookId} onChange={this.handleUpdate.bind(this)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
    )
  }
}

class SearchForm extends React.Component {
  state = {
    query : '',
    booksInForm: []
  }
  handleSearch = (event) => {
    this.setState({ query : event.target.value })
    this.searchAPI()
  }
  searchAPI = () => {
    //@argument I only want 5 results max, but this doesn't seem to work
    //with the given API documentation
    BooksAPI.search(this.state.query, 5).then(books =>
      this.setState({booksInForm: books})
    )
  }
  render() {
    //@return: a list of books inside of the form.  This will update as the user
    //types into the search field
    var booksToDisplay = this.state.booksInForm.map(book =>
      <Book title={book.title} authors={book.authors} bookId={book.id} imageUrl={book.imageLinks.thumbnail} update={this.props.update} sectionName='None'/>)
    return (
      <div>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleSearch}/>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksToDisplay}
          </ol>
        </div>
      </div>
    )
  }
}

export default BooksApp
