const express = require('express')
const stripe = require('stripe')
('sk_test_51NzCbJCEAatbUnpu2tvuuXqlFDDVZrdryokBcPLqUC9jmO2lqYRD5uBthLHE22GsyHEeHKSUCM0R2muAlrEBWheX001k1JtwUJ');

const port = 3003;
const app = express()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/customers", async(req, res)=>{
    const customers = await stripe.customers.list({
        limit: 3,
      });

    res.json(customers);
})
