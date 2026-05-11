const fs = require('fs');
const FormData = require('form-data');
const { default: fetch } = require('node-fetch');
const { v4: uuidv4 } = require('uuid');


exports.uploadQuotation = async (req, res) => {
    try {
        // Generate unique ID for this upload
        const uploadId = uuidv4();
        const filePath = req.file.path;

        // Create FormData to send to Python Flask app
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath), {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        // Make request to Flask app (assuming it runs on localhost:8000)
        const response = await fetch('http://localhost:8000/analyze', {
            method: 'POST',
            body: form
        });

        const result = await response.json();

        // Cleanup
        fs.unlinkSync(filePath);

        if (response.ok) {
            res.json({
                message: "Processed successfully",
                uploadId: uploadId,
                fileName: req.file.originalname,
                uploadedAt: new Date().toISOString(),
                data: result
            });
        } else {
            res.status(500).json({ error: result.error || 'Analysis failed' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};