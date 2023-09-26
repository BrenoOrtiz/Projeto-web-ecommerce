function toggleSidebar() {
    var image = document.getElementById('menu-icon-content');
    var sidebar = document.getElementById('sidebar');

    sidebar.classList.toggle('closed');
    
    if (sidebar.classList.contains('closed')) {
        image.style.display = 'block';
    }
    else {
        image.style.display = 'none';
    }
    
}


window.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    const userIcon = document.querySelector('.user-icon');
    if (!dropdown.contains(event.target) && !userIcon.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});