document.getElementById('initialForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // ดึงค่าของคำตอบจากแบบประเมินชุดที่ 1
    const question1 = parseInt(document.querySelector('input[name="question1"]:checked').value);
    const question2 = parseInt(document.querySelector('input[name="question2"]:checked').value);
    const question3 = parseInt(document.querySelector('input[name="question3"]:checked').value);
    const question4 = parseInt(document.querySelector('input[name="question4"]:checked').value);
    const question5 = parseInt(document.querySelector('input[name="question5"]:checked').value);

    // คำนวณคะแนนรวมของแบบประเมินชุดที่ 1
    const totalScore = question1 + question2 + question3 + question4 + question5;

    // ถ้าคะแนนมากกว่า 8 ให้แสดงฟอร์มสำหรับแบบประเมินเพิ่มเติมชุดที่ 2
    if (totalScore > 8) {
        document.getElementById('initialForm').style.display = 'none';  // ซ่อนฟอร์มแรก
        document.getElementById('additionalForm1').style.display = 'block';  // แสดงฟอร์มแบบประเมินเพิ่มเติมชุดที่ 2
    } else {
        // แสดงผลลัพธ์ทันทีถ้าคะแนน <= 8
        showFinalResult(totalScore);
    }
});

document.getElementById('additionalForm1').addEventListener('submit', function(e) {
    e.preventDefault();

    // ดึงค่าของคำตอบจากแบบประเมินชุดที่ 2
    const question6 = parseInt(document.querySelector('input[name="question6"]:checked').value);
    const question7 = parseInt(document.querySelector('input[name="question7"]:checked').value);
    const question8 = parseInt(document.querySelector('input[name="question8"]:checked').value);
    const question9 = parseInt(document.querySelector('input[name="question9"]:checked').value);
    const question10 = parseInt(document.querySelector('input[name="question10"]:checked').value);

    // คำนวณคะแนนรวมของแบบประเมินชุดที่ 2
    const additionalScore1 = question6 + question7 + question8 + question9 + question10;

    // ถ้าคะแนนมากกว่า 8 ให้แสดงฟอร์มสำหรับแบบประเมินเพิ่มเติมชุดที่ 3
    if (additionalScore1 > 8) {
        document.getElementById('additionalForm1').style.display = 'none';  // ซ่อนฟอร์มชุดที่ 2
        document.getElementById('additionalForm2').style.display = 'block';  // แสดงฟอร์มแบบประเมินเพิ่มเติมชุดที่ 3
    } else {
        // แสดงผลลัพธ์ทันทีถ้าคะแนน <= 8
        showFinalResult(additionalScore1);
    }
});

document.getElementById('additionalForm2').addEventListener('submit', function(e) {
    e.preventDefault();

    // ดึงค่าของคำตอบจากแบบประเมินชุดที่ 3
    const question11 = parseInt(document.querySelector('input[name="question11"]:checked').value);
    const question12 = parseInt(document.querySelector('input[name="question12"]:checked').value);
    const question13 = parseInt(document.querySelector('input[name="question13"]:checked').value);
    const question14 = parseInt(document.querySelector('input[name="question14"]:checked').value);
    const question15 = parseInt(document.querySelector('input[name="question15"]:checked').value);

    // คำนวณคะแนนรวมของแบบประเมินชุดที่ 3
    const additionalScore2 = question11 + question12 + question13 + question14 + question15;

    // แสดงผลลัพธ์สุดท้าย
    showFinalResult(additionalScore2);
});

// ฟังก์ชันสำหรับแสดงผลลัพธ์
function showFinalResult(score, currentStage) {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // ดึงข้อมูลเดิมจาก Local Storage
    let userResults = JSON.parse(localStorage.getItem('userResults')) || [];
    
    // ตรวจสอบว่ามีข้อมูลของผู้ใช้แล้วหรือยัง (โดยใช้ชื่อเป็นตัวระบุ)
    let existingUser = userResults.find(user => user.name === name);
    
    // ถ้ายังไม่มี ให้เพิ่มผู้ใช้ใหม่
    if (!existingUser) {
        existingUser = { name, age, gender, score: 0 };  // เริ่มต้นด้วยคะแนน 0
        userResults.push(existingUser);
    }

    // เพิ่มคะแนนจากแต่ละชุดคำถาม
    existingUser.score += score;

    // บันทึกข้อมูลที่อัปเดตลง Local Storage
    localStorage.setItem('userResults', JSON.stringify(userResults));

    // แสดงผลลัพธ์ให้ผู้ใช้
    document.getElementById('initialForm').style.display = 'none';
    document.getElementById('additionalForm1').style.display = 'none';
    document.getElementById('additionalForm2').style.display = 'none';

    // let resultMessage = '';
    // if (existingUser.score <= 8 ) {
    //     resultMessage = 'สุขภาพจิตของคุณดูเหมือนจะปกติ';
    // } else if (existingUser.score <= 15) {
    //     resultMessage = 'คุณอาจมีปัญหาสุขภาพจิตเล็กน้อย';
    // } else {
    //     resultMessage = 'คุณควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิต';
    // }
    // แก้
    let resultMessage = '';
    if (existingUser.score <= 8 ) {
        resultMessage = 'สุขภาพจิตของคุณดูเหมือนจะปกติ';
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>คะแนนรวม: ${existingUser.score}</p><p>${resultMessage}</p>`;
    } else if (existingUser.score <= 70) {
        resultMessage = 'ขอให้โลกใบนี้ใจดีกับคุณ Love Lift ขอโอบกอดคุณ';
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.className = 'alert alert-light mt-3'; // ใช้คลาสที่เหมาะสม
        resultDiv.innerHTML = `<p>${resultMessage}</p>`;
    }

    // const resultDiv = document.getElementById('result');
    // resultDiv.style.display = 'block';
    // resultDiv.innerHTML = `<p>คะแนนรวม: ${existingUser.score}</p><p>${resultMessage}</p>`;
}

//  window.onload = function() {
//      alert("///คำแนะนำในการทดสอบต่อไปนี้เป็นปัญหาที่ อาจเกิดขึ้นกับคุณ โปรดอ่านแต่ละข้ออย่างรอบคอบ หลังจากที่อ่านแล้วให้เลือกคำตอบที่ตรงกับตัวของคุณ มากที่สุด ว่าอาการหรือความรู้สึกนี้ได้รบกวนคุณมาก น้อยเพียงใดในช่วงระยะเวลา 2-4 สัปดาห์ ที่ผ่านมา");
// };


document.addEventListener('DOMContentLoaded', function() {
    var alert = document.getElementById('infoAlert');
        if (alert) {
            var bsAlert = new bootstrap.Alert(alert);
            bsAlert.show();
        }
});