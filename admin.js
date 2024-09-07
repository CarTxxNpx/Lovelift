// ดึงข้อมูลผู้ใช้จาก Local Storage
const userResults = JSON.parse(localStorage.getItem('userResults')) || [];

// ฟังก์ชันแสดงผลลัพธ์ในหน้าแอดมิน
function displayResults() {
    const resultsTable = document.getElementById('resultsTable');
    userResults.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.gender === 'male' ? 'ชาย' : user.gender === 'female' ? 'หญิง' : 'อื่น ๆ'}</td>
            <td>${user.score}</td>
        `;
        resultsTable.appendChild(row);
    });
}

// เรียกฟังก์ชันเพื่อแสดงผลลัพธ์
displayResults();
