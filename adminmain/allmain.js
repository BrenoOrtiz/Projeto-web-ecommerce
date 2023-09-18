function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('closed');
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