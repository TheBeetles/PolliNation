// pages/api/upload.js
import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { image } = req.body;

    // Create a buffer from the base64 image string
    const buffer = Buffer.from(image.split(',')[1], 'base64');

    // Define the path where the image will be saved
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, `${Date.now()}.png`);

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write the buffer to a file
    fs.writeFileSync(filePath, buffer);

    return res.status(200).json({ message: 'Upload successful', filePath });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};
