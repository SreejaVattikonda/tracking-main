const ServiceProvider = require("../models/serviceProvider");
const express = require("express");
const router = express.Router();

router.post(
  "/createuser",

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let success = false;
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "This user already exists" });
      }

      //creating a password hash
      let salt = bcrypt.genSaltSync(10);
      let secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        date: req.body.date,
      });

      let data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, jwtsecret); //data need to be object, secret should be string
      success = true;
      res.json({ success, auth_token: token }); //sending jwt token to user

      // Create Service Provider if provided in request body
      if (req.body.serviceProvider) {
        const { name, location } = req.body.serviceProvider;
        const newServiceProvider = new Service({ name, location });
        await newServiceProvider.save();
      }
    } catch (err) {
      console.log({ error: err.message });
      return res.status(500).send("Some error occurred");
    }
  }
);


// use the middle ware to know which user used


router.get("/nearby/:userLocation", async (req, res) => {
  try {
    const { userLocation } = req.params;
    const nearbyProviders = await ServiceProvider.find({
      location: { $near: userLocation },
    });
    res.status(200).json(nearbyProviders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching nearby service providers" });
  }
});

module.exports = router;
