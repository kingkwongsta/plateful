"use server";
import { Client } from "@octoai/client";

const client = new Client(process.env.OCTOAI_API_TOKEN);

export async function createImage(data) {
  try {
    console.log("Generating image for recipe:", data.name);

    const endpointUrl = "https://image.octoai.run/generate/sdxl";
    const ingredientString = data.ingredients
      .map((ingredient) => ingredient.name.toLowerCase())
      .join(", ");

    const modifiedPrompt = `A restaurant table setting with a plate featuring ${data.name}. The plate is surrounded by the ingredients: ${ingredientString}. A sign with the text "${data.name}" is next to the plate.`;

    const inputs = {
      prompt: modifiedPrompt,
      negative_prompt: "Blurry image, distortion, low-res, poor quality",
      checkpoint: "octoai:lightning_sdxl",
      // loras: {
      //   "octoai:paint-splash": 0.5,
      // },
      width: 1536,
      height: 640,
      num_images: 1,
      sampler: "DDIM",
      steps: 8,
      cfg_scale: 3,
      use_refiner: true,
      high_noise_frac: 0.8,
      style_preset: "Watercolor",
    };

    console.log("Image prompt:", modifiedPrompt);
    const outputs = await client.infer(endpointUrl, inputs);
    console.log("Image generation successful");

    const images = outputs.images.map((output, i) => {
      const buffer = Buffer.from(output.image_b64, "base64");
      const imageData = buffer.toString("base64");
      // Use base64 for API response
      return { filename: `result${i}.jpg`, imageData };
    });

    console.log("Image data processed successfully");
    return images;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
