
/*
Exam One - Batch 364
Total 60 (40 + 20) Marks
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const studentPerPage = 9;
const studentList = document.querySelector('.student-list');
const pageList = document.querySelector('.link-list');
const data1 = data;
//pageId is most important to grab the particular page data, like pageId 101 means data will start from 0 index, 102 means index will start from 9 to 18....
function showPage(pageId, data = data1) {
  const page = Number(pageId);
  // adding active class to specific page
  //101 - 101  = 0
  pageList.children[page - 101].firstChild.classList.add('active');

  const totalStudent = data.length;
  //101 - 101  = 0
  loopStart = studentPerPage * ((page - 100) - 1);
  loopEnd = loopStart + studentPerPage;
  if (loopEnd > totalStudent) {
    loopEnd = totalStudent;
  }
  for (var i = loopStart; i < loopEnd; i++) {
    const li = document.createElement('li');
    li.className = 'student-item cf';
    li.innerHTML =
      `<div class="student-details">
        <img class="avatar" src="${data[i].picture.medium}" alt="Profile Picture">
        <h3>${data[i].name.title} ${data[i].name.first} ${data[i].name.last} </h3>
        <span class="email">${data[i].email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${data[i].registered.date}</span>
      </div>`;
    studentList.appendChild(li);
  }
}
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
// pagination function for Search and default data
function addPageLink(data) {
  const totalPage = Math.ceil(data.length / studentPerPage);
  //if previous pagination exist then remove 
  if (pageList.childElementCount) {
    while (pageList.firstChild)
      pageList.removeChild(pageList.firstChild);
  }
  // Dynamicly added page
  for (var i = 1; i <= totalPage; i++) {
    const li = document.createElement('li');
    //this.id will pass the particular button id
    li.innerHTML = `<button type="button" id="${i + 100}" onClick="addPagination(this.id)">${i}</button>`;
    pageList.appendChild(li);
  }
}
// this function will fire on page item

function addPagination(pageId, data = data1) {
  const totalPage = Math.ceil(data.length / studentPerPage);
  //removing active class
  for (var i = 0; i < totalPage; i++) {
    pageList.children[i].firstChild.classList.remove('active');
  }
  // const pageId = event.Target.className;
  // removing previous page items
  const studentItems = document.querySelectorAll('.student-item');
  if (studentList.childElementCount) {
    studentItems.forEach(item => item.remove());
  }
  showPage(pageId);
}
// For first displaying data
addPageLink(data);
showPage('101');
/*
(Bonus Task)
Create the `searchPage` function
This function will search and display results from all students
Only the filtered result will be displayed in the view
*/
// Call functions
const searchInput = document.querySelector('#search');
searchInput.addEventListener('keyup', searchPage);

const header = document.querySelector('.header');

function searchPage() {
  const studentItems = document.querySelectorAll('.student-item');
  if (studentList.childElementCount) {
    studentItems.forEach(item => item.remove());
  }
  const searchContent = searchInput.value;

  // searching data
  const filterData = data1.filter(function (d) {
    const fullName = d.name.title.toLowerCase() + ' ' + d.name.first.toLowerCase() + ' ' + d.name.last.toLowerCase();
    return fullName.includes(searchContent.toLowerCase());
  });
  // this function will create pagination for search items
  // console.log(filterData);
  addPageLink(filterData);
  showPage('101', filterData);

  /*
  const searchAlert = document.querySelector('.search-alert');
  if(filterData.length) {
    searchAlert.style.display = 'none';
   
  } else {
    // header.insertAdjacentHTML('afterend', '<div class="search-alert"> <h2>No Data Found</h2></div>');
    searchAlert.style.display = 'block'
    pagination.style.display = 'none';
  }
  */
}