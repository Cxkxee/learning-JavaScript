"use strict";

const feelingForm = document.getElementById("feelingForm");

// หน้า index.html: ตรวจสอบข้อมูล เก็บไว้ใน sessionStorage แล้วไปหน้าผลลัพธ์
if (feelingForm) {
  feelingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const feelingInput = document.getElementById("feeling");
    const name = nameInput.value.trim();
    const feeling = feelingInput.value.trim();

    if (!name || !feeling) {
      alert("กรุณากรอกชื่อและความรู้สึกให้ครบ");
      return;
    }

    try {
      sessionStorage.setItem("myFeelingUsername", name);
      sessionStorage.setItem("myFeelingText", feeling);
      window.location.href = "result.html";
    } catch (error) {
      alert("ไม่สามารถเก็บข้อมูลในเบราว์เซอร์ได้ กรุณาตรวจสอบการตั้งค่าเบราว์เซอร์");
    }
  });
}

// หน้า result.html: อ่านข้อมูลและแสดงด้วย textContent เพื่อความปลอดภัย
const resultName = document.getElementById("resultName");
const resultFeeling = document.getElementById("resultFeeling");

if (resultName && resultFeeling) {
  const emptyMessage = document.getElementById("emptyMessage");
  let name = null;
  let feeling = null;

  try {
    name = sessionStorage.getItem("myFeelingUsername");
    feeling = sessionStorage.getItem("myFeelingText");
  } catch (error) {
    // แสดงข้อความเมื่อเบราว์เซอร์ปิดการใช้งาน sessionStorage
  }

  if (name !== null && feeling !== null) {
    resultName.textContent = `สวัสดีคุณ ${name}`;
    resultFeeling.textContent = feeling;
    if (emptyMessage) emptyMessage.hidden = true;
  } else {
    resultName.textContent = "ยังไม่มีข้อมูล";
    resultFeeling.textContent = "";
    if (emptyMessage) emptyMessage.hidden = false;
  }
}