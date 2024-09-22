const addBookBtn = document.getElementById('add-book');
const submitBook = document.getElementById('submit');
const cancel = document.getElementById('formulaire')

const myLibrary = [];

// Constructeur Book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Fonction pour ajouter un livre à la bibliothèque
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

// Fonction pour afficher le livre dans le conteneur
function addBook(book, index) {
    const containerBook = document.getElementById('container');
    containerBook.innerHTML += `
        <div class="book-content" data-index="${index}">
            <div id="book" class="book">
                <div class="title">Title: ${book.title}</div>
                <div class="author">Author: ${book.author}</div>
                <div class="nbr-pages">Pages: ${book.pages}</div>
                <div class="read">Read: ${book.read === 'yes' ? 'OUI' : 'NON'}</div>
                <div class="delete">
                    <button class="delete">Delete</button>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour supprimer le livre dans la bibliothèque et le DOM
function removeBook(index) {
    // Supprimer du tableau
    myLibrary.splice(index, 1);
    
    // Supprimer du DOM
    const bookToRemove = document.querySelector(`.book-content[data-index="${index}"]`);
    if (bookToRemove) {
        bookToRemove.remove();
    }
}

// Gestion de la soumission du formulaire
submitBook.addEventListener('click', (event) => {
    event.preventDefault();

    // Récupérer les valeurs des champs du formulaire
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = document.getElementById('book-pages').value;
    const read = document.getElementById('book-read').value;

    if (title && author && pages) {
        // Ajouter le livre à la bibliothèque
        const newBook = addBookToLibrary(title, author, pages, read);
        
        // Afficher le nouveau livre et associer un index
        addBook(newBook, myLibrary.length - 1);
        
        // Réinitialiser les champs du formulaire
        document.querySelector('form').reset();
        
        console.log(myLibrary); // Vérifier si le livre est bien ajouté
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Écouter les clics sur le conteneur des livres pour gérer la suppression
document.getElementById('container').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        // Récupérer l'index du livre à supprimer
        const bookContent = event.target.closest('.book-content');
        const index = bookContent.getAttribute('data-index');
        
        // Supprimer le livre
        removeBook(index);
        
        console.log("Book supprimé:", myLibrary);
    } else {
        console.log("Cet élément n'existe pas !")
    }
});

// Annuler la soumission
document.getElementById('cancel').addEventListener('click', (event) => {
    event.preventDefault()

    // Récupérer les valeurs des champs du formulaire
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = document.getElementById('book-pages').value;

    console.log(`Nom du titre non ajouté "${title}"`)
    console.log(`Nom de l'auteur non inséré "${author}"`)
    console.log(`Nombre de page non ajouté "${pages}"`)

    // Réinitialiser les champs du formulaire
    document.querySelector('form').reset();
})

// Afficher le formulaire d'ajout
addBookBtn.addEventListener('click', () => {
    const showForm = document.getElementById('add-book-form');
    showForm.style.display = "flex";
});

// Cacher le formulaire
const hiddenForm = document.getElementById('form-hidden');
hiddenForm.addEventListener('click', () => {
    const hidden = document.getElementById('add-book-form');
    hidden.style.display = 'none';
});
