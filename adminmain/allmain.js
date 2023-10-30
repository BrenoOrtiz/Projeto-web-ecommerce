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




