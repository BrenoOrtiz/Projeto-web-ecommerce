function changePassword() {
    let currentPassword = document.getElementById("currentPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // AJAX call to PHP to change the password
    fetch('changePassword.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `currentPassword=${currentPassword}&newPassword=${newPassword}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Password changed successfully!");
        } else {
            alert("Error changing password.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function saveSettings() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let theme = document.getElementById("themeSelector").value;
    let volume = document.getElementById("volume").value;

    fetch('updateSettings.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${name}&email=${email}&theme=${theme}&volume=${volume}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Settings saved successfully!");
        } else {
            alert("Error saving settings.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function changeTheme() {
    let selectedTheme = document.getElementById("themeSelector").value;

    document.body.classList.remove("theme-dark", "theme-cherry-blossom", "theme-light", "theme-navy-blue");
    document.body.classList.add("theme-" + selectedTheme);

    fetch('updateTheme.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `theme=${selectedTheme}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status !== 'success') {
            alert("Error saving theme.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


