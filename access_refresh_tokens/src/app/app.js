import express from 'express';

const app = express();

// Global Middleware

app.use(express.json());

// Connection to Routes



export default app;