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

## 📦 Deployment

### Vercel
1. **Push your code to GitHub.**
2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
   - Import your GitHub repository.
3. **Configure Environment Variables:**
   - In the Vercel project settings, add an environment variable named `VITE_GEMINI_API_KEY` with your API key value.
4. **Deploy:**
   - Click **"Deploy"**.

### Netlify
1. **GitHub (Recommended):**
   - Push your code to GitHub.
   - Connect to Netlify: **"Add new site"** -> **"Import an existing project"**.
   - Configure Environment Variables: **"Site settings"** -> **"Environment variables"**. Add `VITE_OPENROUTER_API_KEY`.
   - Netlify will automatically build and deploy.

2. **Manual Deploy (Drag & Drop):**
   - **বিল্ড করুন:** আপনার কম্পিউটারে `npm run build` কমান্ডটি চালান।
   - **Environment Variables:** বিল্ড করার আগে আপনার কম্পিউটারে একটি `.env` ফাইল তৈরি করুন এবং তাতে `VITE_OPENROUTER_API_KEY=আপনার_কী` লিখুন।
   - **আপলোড:** বিল্ড করার পর তৈরি হওয়া `dist` ফোল্ডারটি জিপ করে Netlify-এ আপলোড করুন।
   - **নোট:** ড্র্যাগ-অ্যান্ড-ড্রপ পদ্ধতিতে Netlify ড্যাশবোর্ডের ভেরিয়েবলগুলো কাজ করে না। আপনাকে বিল্ড করার সময়ই কী-টি যুক্ত করতে হবে।

## ⚠️ Disclaimer

ই-আইনজীবী (E-Ainjibi) is an AI-based information assistant. The information provided is for educational purposes and does not constitute professional legal advice. Always consult with a registered lawyer for final legal decisions.

## 📄 License

This project is licensed under the Apache-2.0 License.

---
Developed with ❤️ by [Shafayat](https://github.com/shafayat83)
