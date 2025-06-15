"use server";

import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function imageGen({ imageGenInput }) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseModalities: ["IMAGE", "TEXT"],
    responseMimeType: "text/plain",
  };
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: imageGenInput,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    config: config,
    contents: contents,
  });

  const part = response.candidates[0].content.parts?.find((p) => p.inlineData);

  if (!part || !part.inlineData) {
    throw new Error("Image generation failed");
  }

  const bas64Image = part.inlineData.data;
  const buffer = Buffer.from(bas64Image, "base64");

  const fileName = `ailearning-image-${Date.now()}.png`;
  const publicPath = path.join(process.cwd(), "public", "temp");
  const filePath = path.join(publicPath, fileName);

  await fs.mkdir(publicPath, { recursive: true });
  await fs.writeFile(filePath, buffer);

  const cloudinaryRes = await cloudinary.uploader.upload(filePath, {
    folder: "ailearning-images",
  });

  await fs.unlink(filePath);

  return {
    url: cloudinaryRes.secure_url,
    public_id: cloudinaryRes.public_id,
  };
}
