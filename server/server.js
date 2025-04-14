
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

let db;

// Connect to MongoDB before starting the server
connectToDatabase()
  .then((database) => {
    db = database;
    console.log("Database connection established");
    
    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });

// API Routes for transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await db.collection('transactions').find().toArray();
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    
    const result = await db.collection('transactions').insertOne({
      amount: Number(amount),
      date,
      description,
      category
    });
    
    res.status(201).json({
      id: result.insertedId,
      amount: Number(amount),
      date,
      description,
      category
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, description, category } = req.body;
    
    await db.collection('transactions').updateOne(
      { _id: new ObjectId(id) },
      { $set: { amount: Number(amount), date, description, category } }
    );
    
    res.json({
      id,
      amount: Number(amount),
      date,
      description,
      category
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Failed to update transaction' });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
    
    res.json({ id });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});
