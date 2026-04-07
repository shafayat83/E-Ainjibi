# ই-আইনজীবী (E-Ainjibi) ⚖️

**ই-আইনজীবী** is a sophisticated, AI-powered Legal-Tech platform specifically designed for the people of Bangladesh. It provides expert legal guidance, document drafting assistance, and information on various branches of Bangladeshi law in simple, accessible Bengali.

![E-Ainjibi Banner](https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200)

## 🌟 Features

- **Expert AI Legal Guidance:** Powered by Google's Gemini 1.5 Pro, with deep knowledge of the Bangladesh Constitution, Penal Code, CPC, CrPC, Labour Law, Family Law, and Land Law.
- **Document Drafting:** Instant generation of drafts for Legal Notices, GD (General Diary), Rent Agreements, and more.
- **Chat History Persistence:** Automatically saves your conversations locally so you can resume them anytime.
- **Message Editing:** Edit your sent messages to refine your queries; the AI will re-generate its response accordingly.
- **Session Memory:** The AI maintains context throughout the conversation for accurate follow-up answers.
- **Luxury Dark Theme:** A premium, responsive UI designed with a deep navy and gold aesthetic.
- **Mobile-First Design:** Fully optimized for smartphones, tablets, and desktops.
- **Privacy Focused:** No personal data like NID or bank details are stored.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS 4.0
- **AI Engine:** Google Gemini AI (@google/genai)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Markdown Rendering:** React Markdown with GFM support

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google AI Studio API Key (Get it from [aistudio.google.com](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/e-ainjibi.git
   cd e-ainjibi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
   *(Note: In the current build, the app uses `process.env.GEMINI_API_KEY`. For Vite deployment, ensure you use the correct prefix or handle it in your build settings.)*

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📦 Deployment on Vercel

1. **Push your code to GitHub.**
2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
   - Import your GitHub repository.
3. **Configure Environment Variables:**
   - In the Vercel project settings, add an environment variable named `VITE_GEMINI_API_KEY` (or `GEMINI_API_KEY` depending on your final code configuration) with your API key value.
4. **Deploy:**
   - Click **"Deploy"**. Vercel will automatically detect the Vite configuration and build your app.

## ⚠️ Disclaimer

ই-আইনজীবী (E-Ainjibi) is an AI-based information assistant. The information provided is for educational purposes and does not constitute professional legal advice. Always consult with a registered lawyer for final legal decisions.

## 📄 License

This project is licensed under the Apache-2.0 License.

---
Developed with ❤️ by [Shafayat](https://github.com/shafayat83)
