const mongoose = require('mongoose');
const Student = require('./models/Student');

const MONGO_URI = "mongodb://localhost:27017/Skill_Recommendor";

const studentData = [
  { rollno: "22NM1A4401" },
  { rollno: "22NM1A4402" },
  { rollno: "22NM1A4403" },
  { rollno: "22NM1A4404" },
  { rollno: "22NM1A4405" },
  { rollno: "22NM1A4406" },
  { rollno: "22NM1A4407" },
  { rollno: "22NM1A4408" },
  { rollno: "22NM1A4409" },
  { rollno: "22NM1A4410" },
  { rollno: "22NM1A4411" },
  { rollno: "22NM1A4412" },
  { rollno: "22NM1A4413" },
  { rollno: "22NM1A4414" },
  { rollno: "22NM1A4415" },
  { rollno: "22NM1A4416" },
  { rollno: "22NM1A4417" },
  { rollno: "22NM1A4418" },
  { rollno: "22NM1A4419" },
  { rollno: "22NM1A4420" },
  { rollno: "22NM1A4421" },
  { rollno: "22NM1A4422" },
  { rollno: "22NM1A4423" },
  { rollno: "22NM1A4424" },
  { rollno: "22NM1A4425" },
  { rollno: "22NM1A4426" },
  { rollno: "22NM1A4427" },
  { rollno: "22NM1A4428" },
  { rollno: "22NM1A4429" },
  { rollno: "22NM1A4430" },
  { rollno: "22NM1A4431" },
  { rollno: "22NM1A4432" },
  { rollno: "22NM1A4433" },
  { rollno: "22NM1A4434" },
  { rollno: "22NM1A4435" },
  { rollno: "22NM1A4436" },
  { rollno: "22NM1A4437" },
  { rollno: "22NM1A4438" },
  { rollno: "22NM1A4439" },
  { rollno: "22NM1A4440" },
  { rollno: "22NM1A4441" },
  { rollno: "22NM1A4442" },
  { rollno: "22NM1A4443" },
  { rollno: "22NM1A4444" },
  { rollno: "22NM1A4445" },
  { rollno: "22NM1A4446" },
  { rollno: "22NM1A4447" },
  { rollno: "22NM1A4448" },
  { rollno: "22NM1A4449" },
  { rollno: "22NM1A4450" },
  { rollno: "22NM1A4451" },
  { rollno: "22NM1A4452" },
  { rollno: "22NM1A4453" },
  { rollno: "22NM1A4454" },
  { rollno: "22NM1A4455" },
  { rollno: "22NM1A4456" },
  { rollno: "22NM1A4457" },
  { rollno: "23NM5A4401" },
  { rollno: "23NM5A4402" },
  { rollno: "23NM5A4403" },
  { rollno: "23NM5A4404" },
  { rollno: "23NM5A4405" },
  { rollno: "23NM5A4406" },
  { rollno: "23NM5A4407" },

];

async function seedStudents() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    await Student.deleteMany({});
    console.log("🗑️ Existing students cleared");

    await Student.insertMany(studentData);
    console.log("🌱 Students inserted successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedStudents();
