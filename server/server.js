// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const Visitor = require("./models/Visitor");

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((error) => {
//     console.error("MongoDB connection failed:", error.message);
//   });

// app.get("/", (req, res) => {
//   res.json({
//     message: "Tourism Intelligence API is running",
//   });
// });

// // CREATE visitor
// app.post("/api/visitors", async (req, res) => {
//   try {
//     const visitor = await Visitor.create(req.body);

//     res.status(201).json(visitor);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to create visitor",
//       error: error.message,
//     });
//   }
// });

// // READ visitors
// app.get("/api/visitors", async (req, res) => {
//   try {
//     const visitors = await Visitor.find();

//     res.status(200).json(visitors);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch visitors",
//       error: error.message,
//     });
//   }
// });

// // UPDATE visitor
// app.put("/api/visitors/:id", async (req, res) => {
//   try {
//     const visitor = await Visitor.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!visitor) {
//       return res.status(404).json({
//         message: "Visitor not found",
//       });
//     }

//     res.status(200).json(visitor);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to update visitor",
//       error: error.message,
//     });
//   }
// });

// // DELETE visitor
// app.delete("/api/visitors/:id", async (req, res) => {
//   try {
//     const visitor = await Visitor.findByIdAndDelete(
//       req.params.id
//     );

//     if (!visitor) {
//       return res.status(404).json({
//         message: "Visitor not found",
//       });
//     }

//     res.status(200).json({
//       message: "Visitor deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to delete visitor",
//       error: error.message,
//     });
//   }
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const visitorRoutes = require("./routes/visitorRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Tourism Intelligence API is running",
  });
});

app.use("/api/visitors", visitorRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});