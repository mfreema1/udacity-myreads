import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    booksInLibrary : []
  }

  //method passed down into the book dropdown.  Updates state of the library according to what was passed back up.
  updateStore = (updatedBook) => {
    console.log(updatedBook)
    var bookOfInterest = this.state.booksInLibrary.filter(book => book.url === updatedBook.url)[0]
    //if the book isn't in the library, add it
    if(!bookOfInterest){
      this.state.booksInLibrary.push(updatedBook)
    }
    //otherwise just update the section of it
    else{
      var indexOfInterest = this.state.booksInLibrary.indexOf(bookOfInterest)
      this.state.booksInLibrary[indexOfInterest].section = updatedBook.section
    }
    this.setState({booksInLibrary: this.state.booksInLibrary})
  }

  render() {

    //@returns the entire application
    return (
        <div className="app">
          <Route path="/search" render={() => (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to={{pathname: '/'}}>Close</Link>
              <SearchForm update={this.updateStore}/>
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
                  <Section sectionName="Currently Reading" update={this.updateStore} bookSet={this.state.booksInLibrary}/>
                  <Section sectionName="Want to Read" update={this.updateStore} bookSet={this.state.booksInLibrary}/>
                  <Section sectionName="Read" update={this.updateStore} bookSet={this.state.booksInLibrary}/>
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

const Book = (props) => (
  //@return a book in the application.  Only has render() function, so was
  //reduced to a functional component
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url(' + props.url + ')' }}></div>
        <BookDropdown update={props.update} bookUrl={props.url} title={props.title} authors={props.authors} section={props.sectionName}/>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{props.authors}</div>
    </div>
  </li>
)

class BookDropdown extends React.Component {

  //passes data up to the application for state changes
  handleUpdate = (select) => {
    var currentBook = document.getElementById(this.props.bookUrl)
    var bookForUpdate = {
      section: currentBook.options[currentBook.selectedIndex].value,
      url: this.props.bookUrl,
      title: this.props.title,
      authors: this.props.authors
    }
    this.props.update(bookForUpdate)
  }

  //sets the selector to the correct entry for that section
  componentDidMount() {
    var selector = document.getElementById(this.props.bookUrl)
    selector.value = this.props.sectionName
  }

  render() {
    return (
      //@return: a dropwdown menu that is on each book in the app.  id is
      //represented by url as a quick way to get unique id's.
        <div className="book-shelf-changer">
          <select id={this.props.bookUrl} onChange={this.handleUpdate.bind(this)}>
            <option value="None" disabled>Move to...</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="Want to Read">Want to Read</option>
            <option value="Read">Read</option>
            <option value="None">None</option>
          </select>
        </div>
    )
  }
}

class Section extends React.Component {

  render() {
    var booksInSection = this.props.bookSet.filter(book => book.section === this.props.sectionName).map(book =>
      <Book title={book.title} authors={book.authors} url={book.url} update={this.props.update} sectionName={this.props.sectionName}/>)

    return (
      //@return: one of the three sections of the app.  Each section gets a filtered
      //copy of the main
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.sectionName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksInSection}
          </ol>
        </div>
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
    BooksAPI.search(this.state.query, 5).then(books =>
      this.setState({booksInForm: books})
    )
  }
  render() {
    var booksToDisplay = this.state.booksInForm.map(book =>
      <Book title={book.title} authors={book.authors[0]} url={book.imageLinks.thumbnail} update={this.props.update} sectionName='None'/>)
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
