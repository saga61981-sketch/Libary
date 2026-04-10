// ===== AUTHORS =====
const authors = [
  {id:1,name:"J.K. Rowling"},
  {id:2,name:"F. Scott Fitzgerald"},
  {id:3,name:"George Orwell"},
  {id:4,name:"Jane Austen"},
  {id:5,name:"J.R.R. Tolkien"},
  {id:6,name:"Harper Lee"},
  {id:7,name:"Paulo Coelho"},
  {id:8,name:"Dan Brown"},
  {id:9,name:"Agatha Christie"},
  {id:10,name:"Victor Hugo"}
];

// ===== BOOKS =====
let books = [
  {id:1,title:"Harry Potter",authorId:1,category:"Fantasy",price:19.99,rating:4.9,favorite:false,image:"https://covers.openlibrary.org/b/id/7984916-L.jpg"},
  {id:2,title:"The Great Gatsby",authorId:2,category:"Classic",price:14.50,rating:4.4,favorite:false,image:"https://covers.openlibrary.org/b/id/7352161-L.jpg"},
  {id:3,title:"1984",authorId:3,category:"Dystopian",price:16.00,rating:4.8,favorite:false,image:"https://covers.openlibrary.org/b/id/7222246-L.jpg"},
  {id:4,title:"Pride and Prejudice",authorId:4,category:"Romance",price:12.75,rating:4.6,favorite:false,image:"https://covers.openlibrary.org/b/id/8091016-L.jpg"},
  {id:5,title:"The Hobbit",authorId:5,category:"Fantasy",price:18.25,rating:4.8,favorite:false,image:"https://covers.openlibrary.org/b/id/6979861-L.jpg"},
  {id:6,title:"To Kill a Mockingbird",authorId:6,category:"Classic",price:15.99,rating:4.9,favorite:false,image:"https://covers.openlibrary.org/b/id/8228691-L.jpg"},
  {id:7,title:"The Alchemist",authorId:7,category:"Philosophical",price:13.99,rating:4.7,favorite:false,image:"https://covers.openlibrary.org/b/id/8101346-L.jpg"},
  {id:8,title:"The Da Vinci Code",authorId:8,category:"Mystery",price:17.49,rating:4.5,favorite:false,image:"https://covers.openlibrary.org/b/id/240726-L.jpg"},
  {id:9,title:"Murder on the Orient Express",authorId:9,category:"Mystery",price:18.00,rating:4.7,favorite:false,image:"https://covers.openlibrary.org/b/id/8231856-L.jpg"},
  {id:10,title:"Les Misérables",authorId:10,category:"Classic",price:21.50,rating:4.8,favorite:false,image:"https://covers.openlibrary.org/b/id/8225631-L.jpg"}
];

// ===== LOAD FAVORITES =====
let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
books.forEach(book=>{
  if(storedFavorites.includes(book.id)){
    book.favorite = true;
  }
});

// ===== FUNCTIONS =====
function getAuthorName(id){
  return authors.find(a=>a.id===id).name;
}

function displayBooks(bookList){
  const container = document.getElementById("booksContainer");
  container.innerHTML="";

  bookList.forEach(book=>{
    container.innerHTML+=`
      <div class="card">
        <img src="${book.image}">
        <h3>${book.title}</h3>
        <p>${getAuthorName(book.authorId)}</p>
        <p class="price">$${book.price}</p>
        <p class="rating">⭐ ${book.rating}</p>
        <button onclick="toggleFavorite(${book.id})" class="${book.favorite ? 'favorite':''}">
          ${book.favorite ? '❤️ Favorited' : '🤍 Add to Favorite'}
        </button>
      </div>
    `;
  });
}

function toggleFavorite(id){
  books = books.map(book=>{
    if(book.id===id){
      book.favorite=!book.favorite;
    }
    return book;
  });

  let favoriteIds = books.filter(b=>b.favorite).map(b=>b.id);
  localStorage.setItem("favorites", JSON.stringify(favoriteIds));

  filterAndSearch();
}

// ===== FILTER + SEARCH =====
document.getElementById("categoryFilter").addEventListener("change",filterAndSearch);
document.getElementById("searchInput").addEventListener("input",filterAndSearch);

function filterAndSearch(){
  const category = document.getElementById("categoryFilter").value;
  const searchValue = document.getElementById("searchInput").value.toLowerCase();

  let filtered = books.filter(book=>{
    let matchesCategory = category==="All" || book.category===category;
    let matchesSearch = book.title.toLowerCase().includes(searchValue);
    return matchesCategory && matchesSearch;
  });

  displayBooks(filtered);
}

// ===== INITIAL LOAD =====
displayBooks(books);