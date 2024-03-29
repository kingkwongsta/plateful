# Plateful
Find the recipe to satisfy your cravings
### Live Site: [https://plateful-ten.vercel.app/](https://plateful-ten.vercel.app/)

- Create a food recipe based on your preference with Generative AI

## Tech Stack

**Client**
- Hosted on Vercel
- Next.js, Zustand, TailwindCSS, Shadcn

**Backend**
- Docker Container containing a Python FastAPI app hosted on Google Cloud Run (Serverless)
- Langchain to orchestrate an inference API call to Mixtral-8x7B LLM for recipe generation
- React Server Action for text to image generation using Stable Diffusion XL with the [Paint Splash Style](https://civitai.com/models/140335/sdxl-paint-splash-style) LoRA
 
 

  
![app screenshot2](https://github.com/kingkwongsta/plateful/blob/main/client/public/Screenshot%202024-03-17%20170001.png?raw=true)
