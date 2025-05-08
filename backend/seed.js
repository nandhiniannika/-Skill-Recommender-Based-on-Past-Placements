const mongoose = require('mongoose');
const placements = require('./models/placements');

const MONGO_URI = "mongodb://localhost:27017/Skill_Recommendor";

const data = [
    {
      name: "B. Yasaswini",
      company: "Deloitte",
      skills: ["Java", "Python", "OOP", "Algorithms", "Communication"],
      package: "4 LPA"
    },
    {
      name: "S. Pranitha Reddy",
      company: "Deloitte",
      skills: ["C++", "JavaScript", "Git", "Problem Solving"],
      package: "4 LPA"
    },
    {
      name: "Rajam Sravanthi",
      company: "Amado IT Solutions",
      skills: ["Frontend Development", "Java", "React", "Problem Solving"],
      package: "6.8 LPA"
    },
    {
      name: "Pathalam Devi Naga Satyavathi",
      company: "NXT SYNC",
      skills: ["Communication", "Business Analytics"],
      package: "5.5 LPA"
    },
    {
      name: "Seetepalli Meghana",
      company: "NXT SYNC",
      skills: ["Business Strategy", "Market Research"],
      package: "5.5 LPA"
    },
    {
      name: "Bobbili Gayathri",
      company: "NXT SYNC",
      skills: ["Team Management", "Operations"],
      package: "5.5 LPA"
    },
    {
      name: "Maddala Keerthi Priya",
      company: "NXT SYNC",
      skills: ["Electronics", "Communication", "Analytical Thinking"],
      package: "5.5 LPA"
    },
    {
      name: "Danabala Sri Gnaneswari",
      company: "NXT SYNC",
      skills: ["Circuit Design", "Leadership"],
      package: "5.5 LPA"
    },
    {
      name: "Adari Bineeta",
      company: "NXT SYNC",
      skills: ["Signal Processing", "Problem Solving"],
      package: "5.5 LPA"
    },
    {
      name: "Nammi Gayathri Bhavani",
      company: "NXT SYNC",
      skills: ["Digital Systems", "Communication"],
      package: "5.5 LPA"
    },
    {
      name: "Bojanki Madhuri",
      company: "NXT SYNC",
      skills: ["VLSI", "Teamwork"],
      package: "5.5 LPA"
    },
    {
      name: "Eerella Sampoorna",
      company: "NXT SYNC",
      skills: ["Finance", "Presentation Skills"],
      package: "5.5 LPA"
    },
    {
      name: "Lalam Jayavardhini",
      company: "NXT SYNC",
      skills: ["Business Analysis", "Leadership"],
      package: "5.5 LPA"
    },
    {
      name: "V. Sai Greeshma",
      company: "NXT SYNC",
      skills: ["Marketing", "Communication"],
      package: "5.5 LPA"
    },
    {
      name: "Konkupudi Durga Prasanna",
      company: "NXT SYNC",
      skills: ["Sales Strategy", "CRM Tools"],
      package: "5.5 LPA"
    },
    {
      name: "Kanchipati Vijaya",
      company: "NXT SYNC",
      skills: ["Data Analysis", "Teamwork"],
      package: "5.5 LPA"
    },
    {
      name: "Angadala Sireesha",
      company: "NXT SYNC",
      skills: ["Strategic Planning", "Business Communication"],
      package: "5.5 LPA"
    },
    {
      name: "Geddam Bhavani Kusuma Shree",
      company: "NXT SYNC",
      skills: ["Market Research", "Customer Service"],
      package: "5.5 LPA"
    },
    {
      name: "Karnam Girija",
      company: "NXT SYNC",
      skills: ["Entrepreneurship", "Data Interpretation"],
      package: "5.5 LPA"
    },
    {
      name: "Malla Tejasree",
      company: "NXT SYNC",
      skills: ["Financial Analysis", "Decision Making"],
      package: "5.5 LPA"
    },
    {
      name: "Nambari Lavanya",
      company: "NXT SYNC",
      skills: ["Operations Management", "Team Leadership"],
      package: "5.5 LPA"
    },
    {
      name: "Madaka Uma",
      company: "NXT SYNC",
      skills: ["Business Forecasting", "Problem Solving"],
      package: "5.5 LPA"
    },
    {
      name: "Pakalapati Swetha",
      company: "NXT SYNC",
      skills: ["Organizational Behavior", "Leadership"],
      package: "5.5 LPA"
    },
    {
      name: "Rishitha Pedapati",
      company: "NXT SYNC",
      skills: ["Time Management", "Team Collaboration"],
      package: "5.5 LPA"
    },
    {
      name: "Teppala Sirisha",
      company: "NXT SYNC",
      skills: ["Presentation", "Teamwork"],
      package: "5.5 LPA"
    },
    {
      name: "Molli Ramya",
      company: "NXT SYNC",
      skills: ["Analytics", "Communication"],
      package: "5.5 LPA"
    },
    {
      name: "Rapaka Joyithirmai",
      company: "NXT SYNC",
      skills: ["Marketing", "CRM"],
      package: "5.5 LPA"
    },
    {
      name: "K. Vijaya Lakshmi",
      company: "K12 Techno Services",
      skills: ["Presentation", "Marketing", "Customer Interaction"],
      package: "2.4 LPA"
    },
    {
      name: "Pampireddi Dharani",
      company: "K12 Techno Services",
      skills: ["Communication", "Sales"],
      package: "2.4 LPA"
    },
    {
      name: "V. Prathyusha",
      company: "K12 Techno Services",
      skills: ["Business Communication", "Public Speaking"],
      package: "2.4 LPA"
    },
    {
      name: "Baliji Lakshmi",
      company: "K12 Techno Services",
      skills: ["Client Handling", "Marketing"],
      package: "2.4 LPA"
    }
  ];
  

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    await placements.deleteMany({});
    console.log("🗑️ Existing placements cleared");

    await placements.insertMany(data);
    console.log("🌱 placements inserted successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedDatabase();