// --- LOGIKA HALAMAN LOGIN ---
// Data Akun Demo
const USERS = {
    admin: { pass: "admin1", role: "admin" },
    karyawan: { pass: "user1", role: "user" }
};

// Menangkap event submit form login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah halaman refresh
            
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            // Cek apakah username dan password cocok dengan data demo
            if (USERS[usernameInput] && USERS[usernameInput].pass === passwordInput) {
                // Simpan Role ke dalam LocalStorage komputer
                localStorage.setItem('userRole', USERS[usernameInput].role);
                
                // Pindah halaman ke Dashboard
                window.location.href = 'index.html';
            } else {
                alert('Username atau password salah! Silakan cek petunjuk akun demo di bawah.');
            }
        });
    }
});

// --- KODE BERIKUTNYA YANG SUDAH ADA (JANGAN DIHAPUS) ---
// function toggleDropdown() { ... dst

// --- MANAJEMEN DROPDOWN PROFIL ---
function toggleDropdown() {
    const menu = document.getElementById('profileDropdownMenu');
    menu.classList.toggle('show');
}

// Menutup dropdown jika pengguna mengklik di luar area profil
window.addEventListener('click', function(e) {
    const profileArea = document.querySelector('.profile-dropdown');
    const menu = document.getElementById('profileDropdownMenu');
    
    if (profileArea && !profileArea.contains(e.target)) {
        menu.classList.remove('show');
    }
});


// --- MANAJEMEN TEMA (MATAHARI / BULAN) ---
function checkTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const themeLabel = document.getElementById('themeLabel');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeLabel) {
        themeLabel.innerText = currentTheme === 'dark' ? 'Mode Gelap' : 'Mode Terang';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
    const themeLabel = document.getElementById('themeLabel');
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    
    if (themeLabel) {
        themeLabel.innerText = targetTheme === 'dark' ? 'Mode Gelap' : 'Mode Terang';
    }
}


// --- NAVIGASI TAB MENU ---
function showSection(sectionId) {
    const sections = document.querySelectorAll('.tab-content');
    sections.forEach(sec => sec.classList.remove('active'));
    
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    navLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(sectionId).classList.add('active');
    
    const activeLink = Array.from(navLinks).find(link => link.getAttribute('onclick').includes(sectionId));
    if (activeLink) activeLink.classList.add('active');
}


// --- CHAT SYSTEM (ADMIN) ---
function sendMessage() {
    const input = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (input.value.trim() !== "") {
        const newMsg = document.createElement('div');
        newMsg.className = "msg admin";
        newMsg.innerHTML = `<p>${input.value}</p>`;
        chatMessages.appendChild(newMsg);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        input.value = "";
    }
}


// --- INISIALISASI HALAMAN ---
document.addEventListener('DOMContentLoaded', function() {
    checkTheme();
    
    // Tampilkan Tanggal Saat Ini
    const currentDateLabel = document.getElementById('currentDate');
    if (currentDateLabel) {
        const now = new Date();
        currentDateLabel.innerText = now.toLocaleDateString('id-ID', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });
    }

    // Role Handler di Header
    const role = localStorage.getItem('userRole') || 'Admin';
    const roleHeader = document.getElementById('userRoleHeader');
    const adminChatArea = document.getElementById('adminChatArea');
    const karyawanChatArea = document.getElementById('karyawanChatArea');

    if (roleHeader) roleHeader.innerText = role;

    // Filter Konten Chat berdasar Role
    if (role === 'Karyawan') {
        document.querySelector('header h2').innerText = "Panel Karyawan";
        if (adminChatArea && karyawanChatArea) {
            adminChatArea.classList.add('hidden');
            karyawanChatArea.classList.remove('hidden');
        }
    }
});

function logout() {
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
}

// --- FITUR TEKAN ENTER UNTUK KIRIM PESAN ---
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    
    // Pastikan elemen chatInput ada di halaman ini
    if (chatInput) {
        chatInput.addEventListener('keydown', function(e) {
            // Cek apakah tombol yang ditekan adalah Enter (kode 13)
            // dan pastikan tombol Shift TIDAK sedang ditekan (agar bisa Shift+Enter buat baris baru jika nanti dibutuhkan)
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Mencegah kursor pindah ke baris baru di input
                sendMessage();      // Memanggil fungsi kirim pesan yang sudah kita buat sebelumnya
            }
        });
    }
});
