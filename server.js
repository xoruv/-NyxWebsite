const express = require('express');
const path = require('path');
const app = express();

// Configure MIME types
express.static.mime.define({
    'video/quicktime': ['mov'],
    'video/mp4': ['mp4', 'mov'],
    'video/x-m4v': ['m4v', 'mov']
});

// Serve static files from public directory
app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        if (path.endsWith('.mov')) {
            res.set('Content-Type', 'video/quicktime');
        }
    }
}));

// Main routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs.html'));
});

// Handle 404s
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 