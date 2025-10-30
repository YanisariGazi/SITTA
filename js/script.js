// Login Functionality
// Show alerts with better styling
function showAlert(message, type = 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const loginForm = document.getElementById('loginForm');
    loginForm.insertBefore(alertDiv, loginForm.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Find user in dataPengguna
    const user = dataPengguna.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store user data in session storage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        showAlert('Login berhasil! Mengalihkan ke dashboard...', 'success');
        
        // Redirect to dashboard after alert shows
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showAlert('Email atau password yang Anda masukkan salah!');
    }
    
    return false;
}

// Modal Functions
function showLupaPassword() {
    document.getElementById('lupaPasswordModal').style.display = 'block';
}

function closeLupaPassword() {
    document.getElementById('lupaPasswordModal').style.display = 'none';
}

function showDaftar() {
    document.getElementById('daftarModal').style.display = 'block';
}

function closeDaftar() {
    document.getElementById('daftarModal').style.display = 'none';
}

// Handle Lupa Password Form
if (document.getElementById('lupaPasswordForm')) {
    document.getElementById('lupaPasswordForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('emailReset').value;
        alert('Link reset password telah dikirim ke ' + email);
        closeLupaPassword();
        this.reset();
    });
}

// Handle Daftar Form
if (document.getElementById('daftarForm')) {
    document.getElementById('daftarForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const nama = document.getElementById('namaDaftar').value;
        const email = document.getElementById('emailDaftar').value;
        
        // Check if email already exists
        const emailExists = dataPengguna.some(u => u.email === email);
        if (emailExists) {
            showAlert('Email sudah terdaftar! Silakan gunakan email lain.');
            return;
        }
        
        // Validate password strength
        const password = document.getElementById('passwordDaftar').value;
        if (password.length < 8) {
            showAlert('Password harus minimal 8 karakter!');
            return;
        }
        
        // Add new user to dataPengguna (in real app, this would go to backend)
        const newUser = {
            id: dataPengguna.length + 1,
            nama: nama,
            email: email,
            password: password,
            role: 'UPBJJ-UT',
            lokasi: document.getElementById('lokasiDaftar').value,
            createdAt: new Date().toISOString()
        };
        
        dataPengguna.push(newUser);
        
        showAlert('Pendaftaran berhasil! Silakan login dengan akun Anda.', 'success');
        setTimeout(() => {
            closeDaftar();
            this.reset();
        }, 1500);
    });
}

// Sidebar navigation and logout modal logic for all pages
function navigateTo(page) { window.location.href = page; }
function showLogoutConfirmation() {
    const modal = document.getElementById('logoutModal');
    if (modal) modal.style.display = 'block';
}
function closeLogoutConfirmation() {
    const modal = document.getElementById('logoutModal');
    if (modal) modal.style.display = 'none';
}
function confirmLogout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
window.onclick = function(event) {
    // Modal for login/daftar/lupa password
    const lupaPasswordModal = document.getElementById('lupaPasswordModal');
    const daftarModal = document.getElementById('daftarModal');
    if (lupaPasswordModal && event.target == lupaPasswordModal) {
        lupaPasswordModal.style.display = 'none';
    }
    if (daftarModal && event.target == daftarModal) {
        daftarModal.style.display = 'none';
    }
    // Modal for logout confirmation (used in dashboard & stok)
    const logoutModal = document.getElementById('logoutModal');
    if (logoutModal && event.target == logoutModal) {
        logoutModal.style.display = 'none';
    }
};
