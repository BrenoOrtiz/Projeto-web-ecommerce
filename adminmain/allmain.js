function toggleSidebar() {
    var image = document.getElementById('menu-icon');
    var sidebar = document.getElementById('sidebar');

    sidebar.classList.toggle('closed');
    
    if (sidebar.classList.contains('closed')) {
        image.src = "icons/close.png";
    }
    else {
        image.src = "icons/menu.png";
    }
    
}

function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = dropdown.style.display === 'none' || !dropdown.style.display ? 'block' : 'none';
}

window.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    const userIcon = document.querySelector('.user-icon');
    if (!dropdown.contains(event.target) && !userIcon.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});