// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'good_spending' and set it to version 1
const request = indexedDB.open('good_spending', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_spending`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_spending', { autoIncrement: true });
};

// upon a successful 
request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;
  
    // check if app is online, if yes run uploadSpending() function to send all local db data to api
    if (navigator.onLine) {
      // we haven't created this yet, but we will soon, so let's comment it out for now
      // uploadSpending();
    }
};
  
request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new spending and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_spending'], 'readwrite');
  
    // access the object store for `new_spending`
    const spendingObjectStore = transaction.objectStore('new_spending');
  
    // add record to your store with add method
    spendingObjectStore.add(record);
}