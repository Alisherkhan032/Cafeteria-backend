const mongoose = require('mongoose');
const Dish = require('./models/Dish.model');

const addDishes = async () => {
    try {
        // Dishes for A1 Biryani
        await new Dish({
            name: "Chicken Biryani",
            price: 300,
            description: "Delicious chicken biryani with spices.",
            image: "chicken-biryani.jpg",
            category: "non-veg",
            counter: "6793efe21858c1493728ab6d",
        }).save();

        await new Dish({
            name: "Mutton Biryani",
            price: 350,
            description: "Tender mutton pieces in flavorful biryani.",
            image: "mutton-biryani.jpg",
            category: "non-veg",
            counter: "6793efe21858c1493728ab6d",
        }).save();

        await new Dish({
            name: "Veg Biryani",
            price: 250,
            description: "Spicy and aromatic vegetarian biryani.",
            image: "veg-biryani.jpg",
            category: "veg",
            counter: "6793efe21858c1493728ab6d",
        }).save();

        await new Dish({
            name: "Biryani with Raita",
            price: 320,
            description: "Biryani served with a side of cool raita.",
            image: "biryani-raita.jpg",
            category: "non-veg",
            counter: "6793efe21858c1493728ab6d",
        }).save();

        await new Dish({
            name: "Chicken Tikka",
            price: 200,
            description: "Grilled chicken marinated in spices.",
            image: "chicken-tikka.jpg",
            category: "non-veg",
            counter: "6793efe21858c1493728ab6d",
        }).save();

        // Dishes for Starbucks Coffee
        await new Dish({
            name: "Espresso",
            price: 150,
            description: "Strong and aromatic coffee.",
            image: "espresso.jpg",
            category: "veg",
            counter: "6794b9aca6f78579f47eeaa1",
        }).save();

        await new Dish({
            name: "Latte",
            price: 200,
            description: "Coffee with steamed milk and a layer of foam.",
            image: "latte.jpg",
            category: "veg",
            counter: "6794b9aca6f78579f47eeaa1",
        }).save();

        await new Dish({
            name: "Cappuccino",
            price: 220,
            description: "Coffee topped with frothed milk.",
            image: "cappuccino.jpg",
            category: "veg",
            counter: "6794b9aca6f78579f47eeaa1",
        }).save();

        await new Dish({
            name: "Caramel Macchiato",
            price: 250,
            description: "Sweet coffee with caramel flavor.",
            image: "caramel-macchiato.jpg",
            category: "veg",
            counter: "6794b9aca6f78579f47eeaa1",
        }).save();

        await new Dish({
            name: "Mocha",
            price: 230,
            description: "A combination of chocolate and coffee.",
            image: "mocha.jpg",
            category: "veg",
            counter: "6794b9aca6f78579f47eeaa1",
        }).save();

        // Dishes for McDonald's
        await new Dish({
            name: "Big Mac",
            price: 350,
            description: "Classic burger with two patties and special sauce.",
            image: "big-mac.jpg",
            category: "non-veg",
            counter: "6794b9b7a6f78579f47eeaa3",
        }).save();

        await new Dish({
            name: "Chicken Nuggets",
            price: 200,
            description: "Crispy fried chicken nuggets.",
            image: "chicken-nuggets.jpg",
            category: "non-veg",
            counter: "6794b9b7a6f78579f47eeaa3",
        }).save();

        await new Dish({
            name: "Veg McMuffin",
            price: 180,
            description: "Vegetarian muffin with veggies and cheese.",
            image: "veg-mcmuffin.jpg",
            category: "veg",
            counter: "6794b9b7a6f78579f47eeaa3",
        }).save();

        await new Dish({
            name: "McChicken",
            price: 220,
            description: "Chicken patty in a soft bun.",
            image: "mcchicken.jpg",
            category: "non-veg",
            counter: "6794b9b7a6f78579f47eeaa3",
        }).save();

        await new Dish({
            name: "French Fries",
            price: 120,
            description: "Crispy and golden fries.",
            image: "fries.jpg",
            category: "veg",
            counter: "6794b9b7a6f78579f47eeaa3",
        }).save();

        // Dishes for Subway
        await new Dish({
            name: "Veggie Delight",
            price: 180,
            description: "Healthy and delicious sandwich with fresh veggies.",
            image: "veggie-delight.jpg",
            category: "veg",
            counter: "6794b9c2a6f78579f47eeaa5",
        }).save();

        await new Dish({
            name: "Chicken Teriyaki",
            price: 250,
            description: "Grilled chicken with teriyaki sauce.",
            image: "chicken-teriyaki.jpg",
            category: "non-veg",
            counter: "6794b9c2a6f78579f47eeaa5",
        }).save();

        await new Dish({
            name: "Subway Club",
            price: 270,
            description: "Turkey, ham, roast beef and bacon in a sandwich.",
            image: "subway-club.jpg",
            category: "non-veg",
            counter: "6794b9c2a6f78579f47eeaa5",
        }).save();

        await new Dish({
            name: "Italian BMT",
            price: 230,
            description: "Salami, pepperoni, and ham with veggies.",
            image: "italian-bmt.jpg",
            category: "non-veg",
            counter: "6794b9c2a6f78579f47eeaa5",
        }).save();

        await new Dish({
            name: "Tuna Sub",
            price: 240,
            description: "Tuna with fresh veggies in a sandwich.",
            image: "tuna-sub.jpg",
            category: "non-veg",
            counter: "6794b9c2a6f78579f47eeaa5",
        }).save();

        // Dishes for Domino's Pizza
        await new Dish({
            name: "Margherita Pizza",
            price: 400,
            description: "Classic pizza with cheese and tomato sauce.",
            image: "margherita-pizza.jpg",
            category: "veg",
            counter: "6794b9d0a6f78579f47eeaa7",
        }).save();

        await new Dish({
            name: "Pepperoni Pizza",
            price: 450,
            description: "Pizza topped with spicy pepperoni.",
            image: "pepperoni-pizza.jpg",
            category: "non-veg",
            counter: "6794b9d0a6f78579f47eeaa7",
        }).save();

        await new Dish({
            name: "Veg Supreme",
            price: 380,
            description: "Veg pizza with a variety of fresh vegetables.",
            image: "veg-supreme.jpg",
            category: "veg",
            counter: "6794b9d0a6f78579f47eeaa7",
        }).save();

        await new Dish({
            name: "BBQ Chicken Pizza",
            price: 500,
            description: "BBQ chicken with sweet and smoky sauce.",
            image: "bbq-chicken-pizza.jpg",
            category: "non-veg",
            counter: "6794b9d0a6f78579f47eeaa7",
        }).save();

        await new Dish({
            name: "Hawaiian Pizza",
            price: 460,
            description: "Pizza with ham and pineapple.",
            image: "hawaiian-pizza.jpg",
            category: "non-veg",
            counter: "6794b9d0a6f78579f47eeaa7",
        }).save();

        console.log("Dishes added successfully!");
    } catch (error) {
        console.error("Error adding dishes:", error);
    }
};

mongoose.connect('mongodb+srv://alisherkhan:alisherkhan26645226@cluster0.gdx5cap.mongodb.net/Cafeteria?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('MongoDB connected');
        addDishes();
    })
    .catch((err) => console.log('MongoDB connection error:', err));
