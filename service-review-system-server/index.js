require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://services-review-system.web.app",
    "https://services-review-system.firebaseapp.com",
  ],
  credentials: true,
  optionalSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.esc8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// verifyToken
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: "unauthorized access" });
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
  });

  next();
};

async function run() {
  try {
    // await client.connect();
    const serviceCollection = client.db("servicesDB").collection("service");
    const reviewCollection = client.db("reviewsDB").collection("review");

    //generate jwt
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      //create token
      const token = jwt.sign(email, process.env.SECRET_KEY, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // logout || clear cookie from browser
    app.get("/logout", async (req, res) => {
      res
        .clearCookie("token", {
          maxAge: 0,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    //get all services data and also get category based service, search services
    app.get("/services", async (req, res) => {
      const { filter, search } = req.query;
      let query = {};

      if (filter) {
        query.category = filter;
      }
      if (search) {
        query.serviceTitle = { $regex: search, $options: "i" };
      }
      const result = await serviceCollection.find(query).toArray();
      res.send(result);
    });

    //get 6 service data
    app.get("/services-limited", async (req, res) => {
      const cursor = serviceCollection.find({}).limit(8);
      const result = await cursor.toArray();
      res.send(result);
    });

    //get specific service details by id
    app.get("/service-details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    //get specific service detail in my review page
    app.get("/service-detail/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    //get reviews by email
    app.get("/reviews/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const decodedEmail = req.user?.email;
      // console.log('email from token-->', decodedEmail)
      // console.log('email from params-->', email)
      if (decodedEmail !== email)
        return res.status(401).send({ message: "unauthorized access" });
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });

    //get services by email
    app.get("/services/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const decodedEmail = req.user?.email;
      // console.log('email from token-->', decodedEmail)
      // console.log('email from params-->', email)
      if (decodedEmail !== email)
        return res.status(401).send({ message: "unauthorized access" });
      const result = await serviceCollection.find(query).toArray();
      res.send(result);
    });

    //get the all unique user emails from service collection
    app.get("/unique-user-emails", async (req, res) => {
      try {
        const uniqueEmails = await serviceCollection
          .aggregate([
            { $group: { _id: "$userEmail" } },
            { $project: { _id: 0, userEmail: "$_id" } },
          ])
          .toArray();

        res
          .status(200)
          .json(uniqueEmails.map((emailObj) => emailObj.userEmail));
      } catch (error) {
        console.error("Error fetching unique user emails:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //get all reviews
    app.get("/all-reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    // Get multiple reviews by service ID
    app.get("/review/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const query = { serviceId: id };
        const results = await reviewCollection.find(query).toArray();

        if (!results.length) {
          return res.status(404).send({ error: "No reviews found" });
        }

        res.send(results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    //get search result for specific email and query
    app.get("/service", verifyToken, async (req, res) => {
      const { searchParams, email } = req.query;
      let option = {};

      // Add filters dynamically based on provided query parameters
      if (searchParams) {
        option.serviceTitle = { $regex: searchParams, $options: "i" }; // Case-insensitive title search
      }

      if (email) {
        option.userEmail = email; // Exact match for email
      }

      try {
        // Use find() to get all matching documents
        const result = await serviceCollection.find(option).toArray();
        res.send(result); // Send the array of services
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch services" });
      }
    });

    //post review data
    app.post("/reviews", verifyToken, async (req, res) => {
      try {
        const reviewData = req.body;
        console.log("Received data:", reviewData);
        const result = await reviewCollection.insertOne(reviewData);

        //increase review count
        const filter = { _id: new ObjectId(reviewData.serviceId) };
        const update = {
          $inc: { review: 1 },
        };
        const updateReviewCount = await serviceCollection.updateOne(
          filter,
          update
        );
        console.log(updateReviewCount);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error inserting service:", error);
        res.status(500).send({ error: "Failed to insert service" });
      }
    });

    //post service data
    app.post("/services", verifyToken, async (req, res) => {
      try {
        const serviceData = req.body;
        console.log("Received data:", serviceData);
        const result = await serviceCollection.insertOne(serviceData);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error inserting service:", error);
        res.status(500).send({ error: "Failed to insert service" });
      }
    });

    //delete single service data
    app.delete("/service/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);
      res.send(result);
    });

    //delete single review data
    app.delete("/review/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    //update service data
    app.patch("/service/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateServices = req.body;
      const service = {
        $set: {
          serviceTitle: updateServices.serviceTitle,
          companyName: updateServices.companyName,
          website: updateServices.website,
          description: updateServices.description,
          category: updateServices.category,
          price: updateServices.price,
        },
      };
      try {
        const result = await serviceCollection.updateOne(query, service);
        res.send(result);
      } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).send({ error: "Failed to update service" });
      }
    });

    //update review data
    app.patch("/review/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateReviews = req.body;
      const review = {
        $set: {
          text: updateReviews.text,
          rating: updateReviews.rating,
        },
      };
      try {
        const result = await reviewCollection.updateOne(query, review);
        res.send(result);
      } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).send({ error: "Failed to update review" });
      }
    });

    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Connection error:", error);
  }
}

run().catch(console.dir);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
