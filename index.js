require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./db/connectDb');
const UserRoutes = require('./routes/user.routes');
const DishRoutes = require('./routes/dish.routes');
const CartRoutes = require('./routes/cart.routes');
const CounterRoutes = require('./routes/counter.routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/dishes', DishRoutes);
app.use('/api/v1/cart', CartRoutes);
app.use('/api/v1/counters', CounterRoutes);



app.get('/', (req, res) => {
    res.send('Hello World');
});

connectDb();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});