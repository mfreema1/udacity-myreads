import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

//starting example library
var startingBookSet = [
  {
    title: "1776",
    authors: "Davic McCullough",
    section: "Currently Reading",
    url: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    authors: "J.K. Rowling",
    section: "Currently Reading",
    url: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"
  },
  {
    title: "The Hobbit",
    authors: "J.R.R. Tolkien",
    section: "Want to Read",
    url: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
  },
  {
    title: "Oh, the Places You'll Go!",
    authors: "Seuss",
    section: "Want to Read",
    url: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"
  },
  {
    title: "The Adventures of Tom Sawyer",
    authors: "Mark Twain",
    section: "Read",
    url: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"
  },
  {
    title: "To Kill a Mockingbird",
    authors: "Harper Lee",
    section: "Read",
    url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
  },
  {
    title: "Ender's Game",
    authors: "Orscon Scott Card",
    section: "Read",
    url: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
  }
]

class BooksApp extends React.Component {

  state = {
    booksInLibrary : startingBookSet
  }

  //method passed down into the book dropdown.  Updates state of the library according to what was passed back up.
  updateStore = (updatedBook) => {
    var bookOfInterest = this.state.booksInLibrary.filter(book => book.url === updatedBook.url)[0]
    var indexOfInterest = this.state.booksInLibrary.indexOf(bookOfInterest)
    this.state.booksInLibrary[indexOfInterest].section = updatedBook.section
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
              <SearchForm />
              {/* <SearchReults /> */}
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
                  <Section sectionName="Currently Reading" update={this.updateStore}/>
                  <Section sectionName="Want to Read" update={this.updateStore}/>
                  <Section sectionName="Read" update={this.updateStore}/>
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
        <BookDropdown update={props.update} bookUrl={props.url} section={props.sectionName}/>
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
      url: this.props.bookUrl
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
    var booksInSection = startingBookSet.filter(book => book.section === this.props.sectionName).map(book =>
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
  state = { query : '' }
  handleSearch = (event) => {
    this.setState({ query : event.target.value })
  }
  render() {
    return (
      <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleSearch}/>
      </div>
    )
  }
}

class SearchResults extends React.Component {
  render() {
    return (
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    )
  }
}

export default BooksApp
