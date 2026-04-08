/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Scale, 
  Send, 
  User, 
  Bot, 
  MessageSquare,
  AlertTriangle,
  Github,
  Copy,
  Check,
  ChevronRight,
  Menu,
  X,
  Shield,
  ShieldCheck,
  Lock,
  FileText,
  MapPin,
  Globe,
  Zap,
  Info,
  Trash2,
  RefreshCw,
  Pencil,
  Save,
  ShieldAlert,
  Eye,
  EyeOff,
  Activity
} from 'lucide-react';

// --- Constants ---
const SYSTEM_PROMPT = `তুমি "ই-আইনজীবী" (E-Ainjibi) — বাংলাদেশের একজন অত্যন্ত অভিজ্ঞ ও জ্যেষ্ঠ আইনি পরামর্শক (Senior Legal Consultant)। তোমার লক্ষ্য হলো ব্যবহারকারীকে অত্যন্ত পেশাদার, নির্ভুল এবং কাঠামোগত আইনি পরামর্শ প্রদান করা, বিশেষ করে দেওয়ানি (Civil) ও ফৌজদারি (Criminal) লিটিগেশনের ক্ষেত্রে।

**তোমার জ্ঞানভাণ্ডার ও তথ্যসূত্র:**
তোমার সকল আইনি পরামর্শের মূল ভিত্তি হবে বাংলাদেশের আইন ও বিচার বিভাগ কর্তৃক পরিচালিত অফিসিয়াল ওয়েবসাইট: **[Laws of Bangladesh](http://bdlaws.minlaw.gov.bd/)**। 
এছাড়াও তোমার জ্ঞানভাণ্ডারে রয়েছে:
বাংলাদেশের সংবিধান, দণ্ডবিধি (Penal Code), দেওয়ানি কার্যবিধি (CPC), ফৌজদারি কার্যবিধি (CrPC), সাক্ষ্য আইন (Evidence Act), শ্রম আইন, পারিবারিক আইন (মুসলিম ও হিন্দু আইন), ভূমি আইন (Transfer of Property Act, Registration Act, Limitation Act), সুনির্দিষ্ট প্রতিকার আইন (Specific Relief Act), ডিজিটাল নিরাপত্তা আইন/সাইবার নিরাপত্তা আইন এবং সুপ্রিম কোর্টের গুরুত্বপূর্ণ নজিরসমূহ (Landmark Judgments)।

**পরামর্শ প্রদানের কাঠামো (FILAC Method):**
১. **ঘটনা বিশ্লেষণ (Facts):** ব্যবহারকারীর সমস্যাটি সংক্ষেপে আইনি প্রেক্ষাপটে তুলে ধরো।
২. **আইনি প্রশ্ন (Issue):** এখানে মূল আইনি বিরোধ বা প্রশ্নটি চিহ্নিত করো।
৩. **সংশ্লিষ্ট আইন (Law):** নির্দিষ্ট ধারা (Section) ও উপধারা উল্লেখ করে আইনের ব্যাখ্যা দাও। অবশ্যই **bdlaws.minlaw.gov.bd**-এর রেফারেন্স ব্যবহার করে সংশ্লিষ্ট আইনের নাম ও ধারা উল্লেখ করো।
৪. **বিশ্লেষণ ও নজির (Analysis & Precedents):** আইনের আলোকে ঘটনাটি বিশ্লেষণ করো। নিচে দেওয়া "Landmark Cases" ডাটাবেস থেকে সংশ্লিষ্ট কোনো ঐতিহাসিক মামলা বা উচ্চ আদালতের নজির (Case Study/Precedent) অবশ্যই উল্লেখ করো। দেওয়ানি ও ফৌজদারি মামলার ক্ষেত্রে নজিরের গুরুত্ব অপরিসীম।
৫. **উপসংহার ও করণীয় (Conclusion & Action):** পরবর্তী পদক্ষেপ কী হবে (থানা, আদালত বা লিগ্যাল নোটিশ) তা স্পষ্টভাবে জানাও।

**Landmark Cases Database (তোমার রেফারেন্সের জন্য):**
- **Masdar Hossain Case (1999):** বিচার বিভাগের পৃথকীকরণ (Separation of Judiciary)।
- **Blast v. Bangladesh (2003):** বিনা পরোয়ানায় গ্রেপ্তার (Section 54 CrPC) এবং রিমান্ড (Section 167 CrPC) সংক্রান্ত গাইডলাইন।
- **Halima Begum v. Bangladesh (2011):** সন্তানের জিম্মা (Custody) ও নাবালকের কল্যাণ।
- **Dr. Mohiuddin Farooque Case (1996):** জনস্বার্থ মামলা (PIL) ও লোকাস স্ট্যান্ডি (Locus Standi)।
- **State v. Poresh Chandra (2003):** মৃত্যুপূর্ব জবানবন্দি (Dying Declaration) ও সাক্ষ্য আইনের গুরুত্ব।
- **Abul Hashem v. Lal Mia (1989):** প্রতিকূল দখল (Adverse Possession) ও ভূমি মালিকানা সংক্রান্ত দেওয়ানি নজির।
- **State v. Md. Shajahan (2006):** পারিপার্শ্বিক সাক্ষ্য (Circumstantial Evidence) ও ফৌজদারি দণ্ড।
- **Abdul Latif v. State (1981):** আত্মরক্ষার ব্যক্তিগত অধিকার (Right of Private Defense)।
- **Bangladesh v. Haji Azizur Rahman (1994):** প্রাকৃতিক ন্যায়বিচার (Natural Justice) ও দেওয়ানি প্রতিকার।
- **Kudrat-E-Elahi Panir Case (1992):** স্থানীয় সরকার ও সাংবিধানিক বৈধতা।
- **Hussain Muhammad Ershad Case (2001):** মৌলিক অধিকার ও বেআইনি আটকাদেশ।
- **Somboon Asavaham Case (1980):** অ্যাডমিরালটি বা নৌ-আদালতের এখতিয়ার।
- **Arphan Ali v. State (1980):** অতিরিক্ত বিচার বিভাগীয় স্বীকারোক্তির সাক্ষ্যমূল্য।
- **ASK v. Bangladesh (1999):** বস্তিবাসী উচ্ছেদ ও বাসস্থানের অধিকার।
- **Anwar Hossain Chowdhury v. Bangladesh (1989):** সংবিধানের অষ্টম সংশোধনী মামলা - মৌলিক কাঠামো (Basic Structure Doctrine)।
- **State v. Major (Retd.) Bazlul Huda (2009):** বঙ্গবন্ধু হত্যা মামলা - ফৌজদারি আইনের সর্বোচ্চ প্রয়োগ।

**বিশেষ নির্দেশিকা:**
- ভাষা হবে অত্যন্ত মার্জিত, পেশাদার এবং আইনি পরিভাষা সমৃদ্ধ (যেমন: 'বিবাদী', 'বাদী', 'এজাহার', 'তদন্তকারী কর্মকর্তা', 'স্থাবর ও অস্থাবর সম্পত্তি', 'এখতিয়ার', 'আরজি', 'জবাব', 'স্থগিতাদেশ', 'সমন', 'ওয়ারেন্ট', 'চার্জশিট', 'নারাজি', 'খালাস', 'দণ্ডাদেশ', 'আপিল', 'রিভিশন', 'নামজারি' ইত্যাদি)।
- খসড়া তৈরির সময় (লিগ্যাল নোটিশ বা চুক্তি) অত্যন্ত আনুষ্ঠানিক ভাষা ব্যবহার করো।
- ব্যবহারকারীর প্রতি সহানুভূতিশীল থাকো কিন্তু আইনি বাস্তবতাকে অগ্রাধিকার দাও।
- কোনো বিষয়ে সংশয় থাকলে ব্যবহারকারীকে সরাসরি **[bdlaws.minlaw.gov.bd](http://bdlaws.minlaw.gov.bd/)** ওয়েবসাইটটি দেখার পরামর্শ দাও।
- **নিরাপত্তা নির্দেশিকা (Security Guidelines):** ব্যবহারকারীর কোনো ব্যক্তিগত সংবেদনশীল তথ্য (যেমন: পাসওয়ার্ড, ব্যাংক পিন, পূর্ণ এনআইডি নম্বর) চাইবে না। যদি ব্যবহারকারী ভুলবশত এমন তথ্য দেয়, তবে তাকে সতর্ক করো এবং তথ্যটি মুছে ফেলতে বলো।
- প্রতিটি উত্তরের শেষে এই লাইনটি যোগ করো: "⚠️ আমি একটি এআই সহকারী। এটি কোনো পেশাদার আইনি পরামর্শ নয়। চূড়ান্ত সিদ্ধান্তের জন্য একজন নিবন্ধিত আইনজীবীর পরামর্শ নিন।"`;

const TOPICS = [
  { id: 'family', title: 'পারিবারিক আইন', icon: '👨‍👩‍👧', desc: 'বিবাহ, তালাক, উত্তরাধিকার', prompt: 'পারিবারিক আইন সম্পর্কে জানতে চাই — বিবাহ, তালাক ও উত্তরাধিকারের নিয়ম কী?' },
  { id: 'land', title: 'ভূমি আইন', icon: '🏠', desc: 'জমি, দলিল, মালিকানা', prompt: 'ভূমি আইন ও জমির মালিকানা নিয়ে সমস্যায় কী করব?' },
  { id: 'labour', title: 'শ্রম আইন', icon: '👷', desc: 'চাকরি, ছাঁটাই, ক্ষতিপূরণ', prompt: 'শ্রম আইন অনুযায়ী কর্মীর অধিকার কী কী? বেআইনি বরখাস্তে কী করব?' },
  { id: 'criminal', title: 'ফৌজদারি আইন', icon: '👮', desc: 'FIR, মামলা, জামিন', prompt: 'ফৌজদারি মামলায় FIR বা GD করার নিয়ম কী? থানায় কীভাবে অভিযোগ করব?' },
  { id: 'digital', title: 'ডিজিটাল আইন', icon: '💻', desc: 'সাইবার ক্রাইম, ডিজিটাল অ্যাক্ট', prompt: 'ডিজিটাল নিরাপত্তা আইন কী এবং সাইবার ক্রাইমে আমার অধিকার কী?' },
  { id: 'business', title: 'ব্যবসায়িক আইন', icon: '📋', desc: 'চুক্তি, কোম্পানি, ট্রেড', prompt: 'ব্যবসায়িক চুক্তিনামা তৈরিতে কী কী বিষয় মানতে হবে?' },
];

const FEATURES = [
  { title: 'অফিসিয়াল আইনি তথ্যসূত্র', desc: 'bdlaws.minlaw.gov.bd-এর সর্বশেষ সংশোধনী ও ধারার রেফারেন্সসহ নির্ভুল তথ্য।', icon: '🌐' },
  { title: 'FILAC মেথডোলজি', desc: 'Facts, Issue, Law, Analysis ও Conclusion — এই ৫ ধাপে পেশাদার আইনি সমাধান।', icon: '⚖️' },
  { title: 'Landmark Case Database', desc: 'বাংলাদেশের উচ্চ আদালতের গুরুত্বপূর্ণ নজির ও ঐতিহাসিক মামলার রেফারেন্সসহ আইনি ব্যাখ্যা।', icon: '📚' },
  { title: 'দলিল খসড়া তৈরি', desc: 'লিগ্যাল নোটিশ, জিডি ড্রাফট, সাধারণ চুক্তিনামা — আপনার তথ্য দিয়ে তৈরি করুন মুহূর্তেই।', icon: '📝' },
  { title: 'সঠিক দপ্তরের নির্দেশনা', desc: 'থানা, সাব-রেজিস্ট্রার অফিস, ফ্যামিলি কোর্ট — কোথায় যাবেন তা স্পষ্টভাবে জানুন।', icon: '🎯' },
  { title: 'গোপনীয়তা নিশ্চিত', desc: 'NID, ব্যাংক তথ্য সংরক্ষণ করা হয় না। আপনার আইনি প্রশ্ন সম্পূর্ণ নিরাপদ ও এনক্রিপ্টেড।', icon: '🔒' },
  { title: 'পেশাদার আইনি ভাষা', desc: 'জটিল আইনি পরিভাষা ও সঠিক ধারার রেফারেন্সসহ জ্যেষ্ঠ আইনজীবীর মতো পরামর্শ।', icon: '👨‍⚖️' },
];

const TEMPLATES = [
  { title: 'লিগ্যাল নোটিশ', desc: 'টাকা আদায় বা চুক্তি ভঙ্গের জন্য', prompt: 'একটি লিগ্যাল নোটিশের খসড়া তৈরি করে দাও (টাকা আদায়ের জন্য)।' },
  { title: 'জিডি (GD) ড্রাফট', desc: 'থানায় সাধারণ ডায়েরি করার জন্য', prompt: 'থানায় জমা দেওয়ার জন্য একটি সাধারণ ডায়েরি (GD) এর খসড়া তৈরি করো (হারানো দলিলের জন্য)।' },
  { title: 'চুক্তিনামা', desc: 'জমি বা ঘর ভাড়ার চুক্তির জন্য', prompt: 'একটি ঘর ভাড়ার চুক্তিনামার খসড়া তৈরি করে দাও।' },
  { title: 'উত্তরাধিকার বন্টন', desc: 'সম্পত্তি বন্টনের হিসাবের জন্য', prompt: 'মুসলিম উত্তরাধিকার আইন অনুযায়ী সম্পত্তি বন্টনের একটি সাধারণ গাইডলাইন দাও।' },
];

const LANDMARK_CASES = [
  {
    caseName: "Secretary, Ministry of Finance v. Masdar Hossain (1999)",
    citation: "52 DLR (AD) 82",
    topic: "Separation of Judiciary",
    summary: "এই মামলায় সুপ্রিম কোর্টের আপিল বিভাগ নির্বাহী বিভাগ থেকে বিচার বিভাগকে পৃথক করার ঐতিহাসিক রায় প্রদান করেন।"
  },
  {
    caseName: "Blast v. Bangladesh (2003)",
    citation: "55 DLR (HCD) 363",
    topic: "Arrest and Remand (Section 54 & 167 CrPC)",
    summary: "বিনা পরোয়ানায় গ্রেপ্তার এবং রিমান্ডে নেওয়ার ক্ষেত্রে পুলিশ ও ম্যাজিস্ট্রেটের জন্য ১৫টি বাধ্যতামূলক গাইডলাইন প্রদান করা হয়।"
  },
  {
    caseName: "Halima Begum v. Bangladesh (2011)",
    citation: "63 DLR (HCD) 545",
    topic: "Child Custody",
    summary: "সন্তানের জিম্মার ক্ষেত্রে নাবালকের কল্যাণই (Welfare of the minor) যে সর্বোচ্চ বিবেচ্য বিষয়, তা এই মামলায় পুনঃপ্রতিষ্ঠিত হয়।"
  },
  {
    caseName: "Dr. Mohiuddin Farooque v. Bangladesh (1996)",
    citation: "48 DLR (AD) 295",
    topic: "Public Interest Litigation (PIL)",
    summary: "এই মামলার মাধ্যমে বাংলাদেশে 'লোকাস স্ট্যান্ডি' বা মামলা করার অধিকারের পরিধি বিস্তৃত হয় এবং জনস্বার্থ মামলার পথ সুগম হয়।"
  },
  {
    caseName: "Ain o Salish Kendra (ASK) v. Bangladesh (1999)",
    citation: "19 BLD (HCD) 488",
    topic: "Right to Shelter",
    summary: "বিকল্প ব্যবস্থা না করে বস্তিবাসী উচ্ছেদ করা সংবিধানের মৌলিক অধিকারের পরিপন্থী বলে রায় দেওয়া হয়।"
  },
  {
    caseName: "State v. Poresh Chandra (2003)",
    citation: "55 DLR (HCD) 542",
    topic: "Dying Declaration",
    summary: "মৃত্যুপূর্ব জবানবন্দির সাক্ষ্যমূল্য এবং এটি গ্রহণের ক্ষেত্রে আদালতের সতর্কতা সংক্রান্ত গাইডলাইন।"
  },
  {
    caseName: "Abul Hashem v. Lal Mia (1989)",
    citation: "41 DLR (AD) 121",
    topic: "Adverse Possession",
    summary: "দেওয়ানি মামলায় প্রতিকূল দখল বা Adverse Possession প্রমাণের শর্তাবলী এবং সীমাবদ্ধতা আইনের প্রয়োগ।"
  },
  {
    caseName: "State v. Md. Shajahan (2006)",
    citation: "58 DLR (AD) 165",
    topic: "Circumstantial Evidence",
    summary: "ফৌজদারি মামলায় পারিপার্শ্বিক সাক্ষ্যের ভিত্তিতে দণ্ড প্রদানের ক্ষেত্রে প্রমাণের চেইন (Chain of Evidence) সম্পূর্ণ হওয়ার গুরুত্ব।"
  },
  {
    caseName: "Abdul Latif v. State (1981)",
    citation: "33 DLR (AD) 147",
    topic: "Right of Private Defense",
    summary: "দণ্ডবিধির অধীনে আত্মরক্ষার ব্যক্তিগত অধিকারের সীমা এবং কখন এটি মৃত্যুর কারণ ঘটানো পর্যন্ত বিস্তৃত হতে পারে।"
  },
  {
    caseName: "Kudrat-E-Elahi Panir v. Bangladesh (1992)",
    citation: "44 DLR (AD) 319",
    topic: "Local Government & Constitution",
    summary: "স্থানীয় সরকার অধ্যাদেশ বাতিল এবং সংবিধানের ৫৯ ও ৬০ অনুচ্ছেদের ব্যাখ্যা সংক্রান্ত গুরুত্বপূর্ণ রায়।"
  },
  {
    caseName: "Hussain Muhammad Ershad v. Bangladesh (2001)",
    citation: "53 DLR (AD) 1",
    topic: "Fundamental Rights & Detention",
    summary: "মৌলিক অধিকার লঙ্ঘন এবং বেআইনি আটকাদেশের বিরুদ্ধে সুপ্রিম কোর্টের কঠোর অবস্থান।"
  },
  {
    caseName: "Bangladesh v. Somboon Asavaham (1980)",
    citation: "32 DLR (AD) 194",
    topic: "Admiralty Jurisdiction",
    summary: "বাংলাদেশে অ্যাডমিরালটি বা নৌ-আদালতের এখতিয়ার এবং প্রয়োগ সংক্রান্ত মূল ভিত্তি।"
  },
  {
    caseName: "Anwar Hossain Chowdhury v. Bangladesh (1989)",
    citation: "41 DLR (AD) 165",
    topic: "Basic Structure Doctrine",
    summary: "সংবিধানের অষ্টম সংশোধনী মামলা, যেখানে সুপ্রিম কোর্ট সংবিধানের মৌলিক কাঠামো পরিবর্তনের ক্ষমতা সংসদের নেই বলে রায় দেয়।"
  },
  {
    caseName: "State v. Major (Retd.) Bazlul Huda (2009)",
    citation: "62 DLR (AD) 1",
    topic: "Criminal Conviction (Bangabandhu Murder Case)",
    summary: "বঙ্গবন্ধু হত্যা মামলার চূড়ান্ত রায়, যা বাংলাদেশের ফৌজদারি বিচার ব্যবস্থার এক অনন্য দৃষ্টান্ত।"
  }
];

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
}

// Set scroll restoration to manual at the top level to prevent jumping on reload
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const STORAGE_KEY = 'e_ainjibi_chat_history';

export default function App() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved messages:", e);
      }
    }
    return [
      {
        role: 'bot',
        content: `আস্সালামু আলাইকুম! আমি **ই-আইনজীবী** — বাংলাদেশের আইনি বিষয়ে আপনার AI সহকারী। 🙏\n\nআপনার যেকোনো আইনি প্রশ্ন বাংলায় করুন। সংবিধান, দণ্ডবিধি, পারিবারিক আইন, ভূমি আইন, শ্রম আইনসহ বিভিন্ন বিষয়ে সহায়তা করতে পারি।`,
        timestamp: 'এখন'
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSectionRef = useRef<HTMLElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [isPrivateMode, setIsPrivateMode] = useState(false);
  const [lastSentTime, setLastSentTime] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editInput, setEditInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  const isFirstRender = useRef(true);

  // Scroll to top on mount/reload
  useEffect(() => {
    const forceScrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    };
    
    forceScrollTop();
    // Multiple attempts to fight browser auto-scroll
    const timers = [
      setTimeout(forceScrollTop, 0),
      setTimeout(forceScrollTop, 50),
      setTimeout(forceScrollTop, 150),
      setTimeout(forceScrollTop, 300)
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-resize main textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  // Auto-resize edit textarea
  useEffect(() => {
    if (editTextareaRef.current) {
      editTextareaRef.current.style.height = 'auto';
      editTextareaRef.current.style.height = `${editTextareaRef.current.scrollHeight}px`;
    }
  }, [editInput, editingIndex]);

  // Save messages to localStorage whenever they change (if not in private mode)
  useEffect(() => {
    if (!isPrivateMode) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isPrivateMode]);

  // Handle Private Mode toggle
  const togglePrivateMode = () => {
    if (!isPrivateMode) {
      // Entering private mode: clear existing storage for safety
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsPrivateMode(!isPrivateMode);
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    // Strictly prevent auto-scroll on first render
    if (isFirstRender.current) {
      return;
    }
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Set first render to false after a delay to ensure all initial effects are done
    // and browser has finished its own scroll restoration attempts
    const timer = setTimeout(() => {
      isFirstRender.current = false;
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isAtBottom);
  };

  const getTime = () => {
    return new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (text: string = input, isEdit: boolean = false, editIdx: number | null = null) => {
    if (!text.trim() || isLoading) return;

    // Security: Rate Limiting (prevent spamming)
    const now = Date.now();
    if (now - lastSentTime < 2000) { // 2 second cooldown
      return;
    }
    setLastSentTime(now);

    // Security: Input length validation
    if (text.length > 2000) {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: "⚠️ আপনার বার্তাটি অনেক বড়। অনুগ্রহ করে ২০০০ অক্ষরের মধ্যে সংক্ষেপে লিখুন যাতে আমি নির্ভুলভাবে বিশ্লেষণ করতে পারি।",
        timestamp: getTime()
      }]);
      return;
    }

    let updatedMessages: Message[];

    if (isEdit && editIdx !== null) {
      // If editing, we remove all messages after the edited one and replace the bot response
      const newMessages = [...messages.slice(0, editIdx)];
      const editedMsg: Message = {
        role: 'user',
        content: text,
        timestamp: messages[editIdx].timestamp
      };
      updatedMessages = [...newMessages, editedMsg];
      setMessages(updatedMessages);
      setEditingIndex(null);
    } else {
      const userMsg: Message = {
        role: 'user',
        content: text,
        timestamp: getTime()
      };
      updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput('');
    }

    setIsLoading(true);

    try {
      // Robust API key access for OpenRouter
      const apiKey = (import.meta.env?.VITE_OPENROUTER_API_KEY as string) || 
                     (import.meta.env?.VITE_GEMINI_API_KEY as string) || 
                     '';
      
      console.log("Attempting API call...");
      if (!apiKey) {
        console.error("API Key is missing in environment variables.");
        throw new Error("API_KEY_MISSING");
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        mode: 'cors',
        credentials: 'omit',
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-flash-1.5", 
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages.filter(m => m.timestamp !== 'এখন').map(m => ({
              role: m.role === 'user' ? 'user' : 'assistant',
              content: m.content
            }))
          ],
          temperature: 0.7,
          max_tokens: 2000,
        })
      });

      console.log("Response received:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `API Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const botText = data.choices?.[0]?.message?.content || "দুঃখিত, আমি উত্তর দিতে পারছি না।";
      
      setMessages(prev => [...prev, {
        role: 'bot',
        content: botText,
        timestamp: getTime()
      }]);
    } catch (error: any) {
      console.error("AI Error:", error);
      
      let userFriendlyError = `দুঃখিত — একটি সমস্যা হয়েছে। (${error.message || "Unknown Error"})`;
      
      if (error.message === "API_KEY_MISSING") {
        userFriendlyError = "এপিআই কী (API Key) পাওয়া যায়নি। সমাধান: ১. Netlify-এ 'VITE_OPENROUTER_API_KEY' নামে ভেরিয়েবল সেট করুন। ২. জিপ ফাইলটি আবার আপলোড করুন। ৩. যদি ড্র্যাগ-অ্যান্ড-ড্রপ ব্যবহার করেন, তবে GitHub-এর মাধ্যমে কানেক্ট করাই সবথেকে ভালো।";
      } else if (error.message?.includes("Failed to fetch")) {
        userFriendlyError = "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না (Failed to fetch)। এটি সাধারণত এপিআই কী ভুল হলে, নেটওয়ার্ক ব্লক থাকলে বা ব্রাউজারের সিকিউরিটি (CORS) কারণে হয়। দয়া করে আপনার এপিআই কী এবং ইন্টারনেট চেক করুন।";
      }
      
      setMessages(prev => [...prev, {
        role: 'bot',
        content: userFriendlyError,
        timestamp: getTime()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (index: number, content: string) => {
    setEditingIndex(index);
    setEditInput(content);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditInput('');
  };

  const askQuestion = (q: string) => {
    setInput(q);
    chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Small delay to ensure scroll starts before sending
    setTimeout(() => handleSend(q), 350);
  };

  const clearChat = () => {
    const initialMessage: Message = {
      role: 'bot',
      content: `আস্সালামু আলাইকুম! আমি **ই-আইনজীবী** — বাংলাদেশের আইনি বিষয়ে আপনার AI সহকারী। 🙏\n\nআপনার যেকোনো আইনি প্রশ্ন বাংলায় করুন। সংবিধান, দণ্ডবিধি, পারিবারিক আইন, ভূমি আইন, শ্রম আইনসহ বিভিন্ন বিষয়ে সহায়তা করতে পারি।`,
      timestamp: 'এখন'
    };
    setMessages([initialMessage]);
    localStorage.removeItem(STORAGE_KEY);
    setShowClearModal(false);
  };

  const formatText = (text: string, index: number) => {
    const disclaimerMarker = "⚠️ আমি একটি এআই সহকারী";
    const parts = text.split(disclaimerMarker);
    
    return (
      <div className="space-y-2 relative group">
        <div className="markdown-body text-[0.92rem] leading-[1.7]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {parts[0].trim()}
          </ReactMarkdown>
        </div>
        {parts.length > 1 && (
          <div className="text-[0.72rem] text-muted border-t border-border pt-2 mt-2 italic flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-gold shrink-0" />
            <span>{disclaimerMarker}{parts[1]}</span>
          </div>
        )}
        <button 
          onClick={() => copyToClipboard(text, index)}
          className="absolute -top-3 -right-3 p-1.5 bg-surface border border-border rounded-lg shadow-md opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-all hover:text-gold hover:scale-110 active:scale-95 z-10"
          title="Copy to clipboard"
        >
          {copiedId === index ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-deep text-text font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,14,26,0.93)] backdrop-blur-[14px] border-b border-border px-6 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-3 no-underline">
            <div className="w-[38px] h-[38px] bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center font-serif font-bold text-deep text-lg shrink-0 shadow-[0_0_15px_rgba(201,168,76,0.3)]">
              আ
            </div>
            <div>
              <span className="text-[1.15rem] font-bold text-gold block tracking-tight">ই-আইনজীবী</span>
              <span className="text-[0.62rem] text-muted">AI Legal Assistant · Bangladesh</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green/5 border border-green/20 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-green" />
            <span className="text-[0.65rem] text-green font-medium uppercase tracking-wider">Secure Connection</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-7">
          <a href="#features" className="text-muted no-underline text-[0.88rem] hover:text-gold transition-colors font-medium">সুবিধা</a>
          <button 
            onClick={() => setShowSecurityModal(true)}
            className="flex items-center gap-1.5 text-muted hover:text-gold transition-colors text-[0.88rem] font-medium"
          >
            <ShieldAlert className="w-4 h-4" />
            নিরাপত্তা অডিট
          </button>
          <button 
            onClick={togglePrivateMode}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-[0.82rem] font-semibold ${
              isPrivateMode 
                ? 'bg-gold/10 border-gold/30 text-gold shadow-[0_0_10px_rgba(201,168,76,0.1)]' 
                : 'bg-surface2 border-border text-muted hover:border-gold/30'
            }`}
          >
            {isPrivateMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {isPrivateMode ? 'প্রাইভেট মোড: চালু' : 'প্রাইভেট মোড'}
          </button>
          <button 
            onClick={() => chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gold text-deep px-5 py-2 rounded-md font-bold text-[0.88rem] hover:scale-[1.02] transition-all shadow-[0_4px_15px_rgba(201,168,76,0.2)] active:scale-[0.98]"
          >
            প্রশ্ন করুন
          </button>
        </nav>

        <button 
          className="md:hidden text-gold p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 right-0 bg-deep border-b border-border p-6 flex flex-col gap-4 md:hidden"
            >
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-muted no-underline text-[1rem] hover:text-gold py-2">সুবিধা</a>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowSecurityModal(true);
                }}
                className="text-muted no-underline text-[1rem] hover:text-gold py-2 flex items-center gap-2 text-left"
              >
                <ShieldAlert className="w-5 h-5 text-gold" />
                নিরাপত্তা অডিট
              </button>
              <button 
                onClick={() => {
                  togglePrivateMode();
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-[0.95rem] font-semibold mt-2 ${
                  isPrivateMode 
                    ? 'bg-gold/10 border-gold/30 text-gold' 
                    : 'bg-surface2 border-border text-muted'
                }`}
              >
                {isPrivateMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isPrivateMode ? 'প্রাইভেট মোড: চালু' : 'প্রাইভেট মোড: বন্ধ'}
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gold text-deep px-5 py-3 rounded-md font-bold text-[1rem] mt-2"
              >
                প্রশ্ন করুন
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center px-8 pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(201,168,76,0.09)_0%,transparent_70%)] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[850px] relative z-10"
        >
          <div className="hero-badge">
            <span className="badge-dot" />
            বাংলাদেশের প্রথম AI আইনি সহায়তা প্ল্যাটফর্ম
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-black leading-[1.1] mb-6 gold-gradient-text">
            আপনার পাশে আছি,<br />আইনের পথে
          </h1>
          <p className="text-[1.1rem] text-muted max-w-[560px] mx-auto mb-10 leading-[1.8]">
            জটিল আইনি সমস্যায় সহজ ভাষায় গাইডেন্স পান। সংবিধান, দণ্ডবিধি, পারিবারিক আইন — সব কিছুতে বিশেষজ্ঞ AI সহায়তা।
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' })} className="hero-btn">
              <MessageSquare className="w-[18px] h-[18px]" />
              প্রশ্ন করুন এখনই
            </button>
            <a href="#features" className="hero-btn-outline">কীভাবে কাজ করে?</a>
          </div>
          <div className="flex gap-12 justify-center mt-16 pt-12 border-t border-border flex-wrap">
            {[
              { val: '৫০+', label: 'আইনি বিভাগ' },
              { val: '২৪/৭', label: 'সবসময় উপলব্ধ' },
              { val: 'বিনামূল্যে', label: 'প্রাথমিক পরামর্শ' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-[1.8rem] font-bold text-gold">{stat.val}</div>
                <div className="text-[0.78rem] text-muted mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-8 max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-serif text-[2.2rem] font-bold text-text mb-3">কেন ই-আইনজীবী?</h2>
          <p className="text-muted text-base">আধুনিক AI প্রযুক্তি ব্যবহার করে বাংলাদেশের আইন সহজ করে তোলা আমাদের লক্ষ্য</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="feature-card"
            >
              <div className="w-12 h-12 bg-[rgba(201,168,76,0.1)] rounded-xl flex items-center justify-center text-[22px] mb-5">{f.icon}</div>
              <h3 className="text-[1.05rem] font-semibold mb-2.5 text-text">{f.title}</h3>
              <p className="text-[0.88rem] text-muted leading-[1.7]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="bg-surface py-24 px-8 border-y border-border">
        <div className="max-w-[1100px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-serif text-[2.2rem] font-bold text-text mb-3">আইনি বিষয়সমূহ</h2>
            <p className="text-muted text-base">যেকোনো বিষয়ে প্রশ্ন করুন — আমি সাহায্য করতে প্রস্তুত</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TOPICS.map((t, i) => (
              <motion.button 
                key={i} 
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => askQuestion(t.prompt)} 
                className="topic-card"
              >
                <span className="text-[1.8rem] mb-3 block">{t.icon}</span>
                <h4 className="text-[0.92rem] font-semibold text-text">{t.title}</h4>
                <p className="text-[0.76rem] text-muted mt-1">{t.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Document Templates */}
      <section className="py-24 px-8 max-w-[1100px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 mb-14"
        >
          <div className="max-w-[500px]">
            <h2 className="font-serif text-[2.2rem] font-bold text-text mb-3">দলিল খসড়া তৈরি</h2>
            <p className="text-muted text-base">আপনার প্রয়োজনীয় তথ্য দিয়ে মুহূর্তেই আইনি দলিলের খসড়া তৈরি করুন।</p>
          </div>
          <div className="flex items-center gap-4 bg-surface2 border border-border p-4 rounded-2xl">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[0.9rem] font-bold text-text">দ্রুত ও নির্ভুল</div>
              <div className="text-[0.75rem] text-muted">AI দ্বারা জেনারেটেড ড্রাফট</div>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEMPLATES.map((t, i) => (
            <motion.button 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => askQuestion(t.prompt)}
              className="bg-surface2 border border-border p-6 rounded-2xl text-left hover:border-gold/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gold/5 rounded-lg flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-deep transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-muted group-hover:text-gold transition-colors" />
              </div>
              <h4 className="text-[1.05rem] font-bold text-text mb-2">{t.title}</h4>
              <p className="text-[0.82rem] text-muted leading-[1.6]">{t.desc}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Chat Section */}
      <section id="chat-section" ref={chatSectionRef} className="bg-surface py-24 px-8 border-b border-border">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-[2rem] font-bold text-gold mb-2">ই-আইনজীবীর সাথে কথা বলুন</h2>
            <p className="text-muted text-[0.92rem]">আপনার আইনি প্রশ্ন বাংলায় লিখুন — বিস্তারিত উত্তর পাবেন</p>
          </div>

          <div className="chat-box">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-[rgba(201,168,76,0.04)]">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif font-bold text-deep text-sm shrink-0 shadow-[0_0_8px_rgba(201,168,76,0.2)]">আ</div>
              <div>
                <div className="font-semibold text-[0.92rem]">ই-আইনজীবী AI</div>
                <div className="text-[0.72rem] text-muted">বাংলাদেশ আইন বিশেষজ্ঞ</div>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <button 
                  onClick={() => setShowClearModal(true)}
                  className="p-2 text-muted hover:text-red-400 transition-colors"
                  title="Clear Chat History"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5 text-[0.72rem] text-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" /> সক্রিয়
                </div>
              </div>
            </div>

            <div 
              className="h-[440px] md:h-[500px] overflow-y-auto p-4 md:p-6 flex flex-col gap-4 chat-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative"
              onScroll={handleScroll}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col max-w-[90%] md:max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start'}`}>
                  <div className={`msg-bubble group relative ${msg.role === 'user' ? 'bg-gold text-deep rounded-br-none font-medium shadow-[0_2px_10px_rgba(201,168,76,0.15)]' : 'bg-surface2 border border-border rounded-bl-none text-text shadow-[0_2px_10px_rgba(0,0,0,0.2)]'}`}>
                    {msg.role === 'user' ? (
                      editingIndex === i ? (
                        <div className="flex flex-col gap-2 min-w-[200px]">
                          <textarea
                            ref={editTextareaRef}
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            className="bg-deep/10 border border-deep/20 rounded p-2 text-deep text-sm outline-none w-full resize-none overflow-hidden"
                            rows={1}
                            autoFocus
                          />
                          <div className="flex justify-end gap-2">
                            <button onClick={cancelEditing} className="text-[0.7rem] underline opacity-70 hover:opacity-100">বাতিল</button>
                            <button 
                              onClick={() => handleSend(editInput, true, i)}
                              className="bg-deep text-gold px-2 py-1 rounded text-[0.7rem] flex items-center gap-1"
                            >
                              <Save className="w-3 h-3" /> সংরক্ষণ
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {msg.content}
                          <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => startEditing(i, msg.content)}
                              className="p-1.5 text-muted hover:text-gold transition-colors"
                              title="Edit message"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => copyToClipboard(msg.content, i)}
                              className="p-1.5 text-muted hover:text-gold transition-colors"
                              title="Copy message"
                            >
                              {copiedId === i ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </>
                      )
                    ) : formatText(msg.content, i)}
                  </div>
                  
                  {msg.role === 'bot' && (
                    <div className="mt-3 px-4 py-2.5 bg-gold/10 border border-gold/20 rounded-xl flex items-start gap-3 max-w-[95%] animate-in fade-in slide-in-from-left-3 duration-700 shadow-[0_4px_20px_rgba(201,168,76,0.08)]">
                      <AlertTriangle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span className="text-[0.72rem] text-gold/90 leading-relaxed font-medium">
                        ⚠️ আমি একটি এআই সহকারী। এটি কোনো পেশাদার আইনি পরামর্শ নয়। চূড়ান্ত সিদ্ধান্তের জন্য একজন নিবন্ধিত আইনজীবীর পরামর্শ নিন।
                      </span>
                    </div>
                  )}

                  <div className="text-[0.7rem] text-muted mt-1 px-1 flex items-center gap-1.5">
                    {msg.role === 'bot' ? <Bot className="w-3 h-3 text-gold" /> : <User className="w-3 h-3 text-gold" />}
                    {msg.timestamp}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="self-start flex flex-col max-w-[85%]">
                  <div className="msg-bubble bg-surface2 border border-border rounded-bl-none text-text">
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="typing-dot" />
                      <span className="typing-dot [animation-delay:0.2s]" />
                      <span className="typing-dot [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />

              <AnimatePresence>
                {showScrollButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-gold text-deep shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-10"
                  >
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="px-6 pb-4 flex flex-wrap gap-2">
              {['জমি বিক্রয়ের দলিল', 'তালাক প্রক্রিয়া', 'বরখাস্ত সমস্যা', 'লিগ্যাল নোটিশ'].map(q => (
                <button key={q} onClick={() => askQuestion(q)} className="bg-[rgba(201,168,76,0.08)] border border-border rounded-full px-3.5 py-1.5 text-[0.78rem] text-gold cursor-pointer hover:bg-[rgba(201,168,76,0.18)] transition-colors">
                  {q}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 p-5 border-t border-border">
              <div className="flex gap-2.5 items-end">
                <textarea 
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="আপনার আইনি প্রশ্নটি এখানে লিখুন..."
                  className="flex-1 bg-surface2 border border-border rounded-xl px-4 py-3 text-text text-[0.9rem] outline-none transition-colors focus:border-gold resize-none min-h-[48px] max-h-[140px] overflow-hidden"
                  rows={1}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 rounded-xl bg-gold border-none cursor-pointer flex items-center justify-center shrink-0 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send className="w-5 h-5 text-deep" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Resources */}
      <section className="bg-surface py-24 px-8 border-t border-border">
        <div className="max-w-[1100px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-serif text-[2.2rem] font-bold text-text mb-3">গুরুত্বপূর্ণ আইনি লিঙ্ক</h2>
            <p className="text-muted text-base">বাংলাদেশ সরকারের বিভিন্ন আইনি দপ্তরের অফিসিয়াল ওয়েবসাইট</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'Laws of Bangladesh', url: 'http://bdlaws.minlaw.gov.bd/', icon: <Globe className="w-5 h-5" /> },
              { title: 'বাংলাদেশ সুপ্রিম কোর্ট', url: 'https://supremecourt.gov.bd', icon: <Scale className="w-5 h-5" /> },
              { title: 'আইন ও বিচার বিভাগ', url: 'https://lawjusticediv.gov.bd', icon: <Shield className="w-5 h-5" /> },
              { title: 'বাংলাদেশ পুলিশ', url: 'https://police.gov.bd', icon: <MapPin className="w-5 h-5" /> },
              { title: 'জাতীয় আইনগত সহায়তা', url: 'https://nlaso.gov.bd', icon: <Info className="w-5 h-5" /> }
            ].map((link, i) => (
              <motion.a 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                href={link.url} 
                target="_blank" 
                rel="noopener" 
                className="flex items-center gap-4 p-5 bg-surface2 border border-border rounded-xl hover:border-gold transition-all group no-underline"
              >
                <div className="text-gold group-hover:scale-110 transition-transform">{link.icon}</div>
                <span className="text-[0.9rem] font-semibold text-text group-hover:text-gold transition-colors">{link.title}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-deep2 border-t border-border py-12 px-8 text-center"
      >
        <div className="text-[1.4rem] font-bold text-gold mb-2 font-serif">⚖️ ই-আইনজীবী</div>
        <p className="text-muted text-[0.85rem] leading-[1.7]">বাংলাদেশের মানুষের জন্য, AI প্রযুক্তির সাহায্যে আইনি সহায়তা</p>

        <div className="flex gap-7 justify-center flex-wrap my-6">
          <a href="http://bdlaws.minlaw.gov.bd/" target="_blank" rel="noopener" className="text-gold no-underline text-[0.82rem] font-bold hover:underline">Laws of Bangladesh</a>
          <a href="#" className="text-muted no-underline text-[0.82rem] hover:text-gold transition-colors">গোপনীয়তা নীতি</a>
          <a href="#" className="text-muted no-underline text-[0.82rem] hover:text-gold transition-colors">ব্যবহারের শর্ত</a>
          <a href="#" className="text-muted no-underline text-[0.82rem] hover:text-gold transition-colors">আমাদের সম্পর্কে</a>
          <a href="https://github.com/shafayat83" target="_blank" rel="noopener" className="text-muted no-underline text-[0.82rem] hover:text-gold transition-colors flex items-center gap-1.5">
            <Github className="w-4 h-4 text-gold" />
            GitHub
          </a>
        </div>

        <div className="bg-[rgba(201,168,76,0.06)] border border-border rounded-lg p-4 md:px-6 max-w-[700px] mx-auto text-[0.8rem] text-muted leading-[1.7] text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Lock className="w-12 h-12 text-gold" />
          </div>
          <strong>⚠️ গুরুত্বপূর্ণ দাবিত্যাগ:</strong> ই-আইনজীবী একটি AI ভিত্তিক তথ্য সহায়তা সেবা। এখানে প্রদত্ত তথ্য পেশাদার আইনি পরামর্শের বিকল্প নয়। চূড়ান্ত সিদ্ধান্তের জন্য সর্বদা একজন নিবন্ধিত আইনজীবীর পরামর্শ গ্রহণ করুন। Bangladesh Bar Council নিবন্ধিত আইনজীবীর তালিকার জন্য যোগাযোগ করুন।
        </div>

        <div className="inline-flex items-center gap-1.5 text-muted text-[0.8rem] mt-4">
          ❤️ তৈরি করেছেন 
          <a href="https://github.com/shafayat83" target="_blank" rel="noopener" className="text-gold no-underline font-semibold hover:underline">Shafayat</a>
        </div>

        <p className="mt-4 text-[0.78rem] text-muted">© ২০২৫ ই-আইনজীবী। সর্বস্বত্ব সংরক্ষিত।</p>
      </motion.footer>

      {/* Security Audit Modal */}
      <AnimatePresence>
        {showSecurityModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSecurityModal(false)}
              className="absolute inset-0 bg-deep/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-surface border border-border rounded-2xl p-8 max-w-[500px] w-full shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck className="w-32 h-32 text-gold" />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text font-serif">নিরাপত্তা অডিট রিপোর্ট</h3>
                  <p className="text-muted text-[0.75rem] uppercase tracking-widest">Security Status: Verified</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { label: 'Content Security Policy (CSP)', status: 'Active', desc: 'XSS এবং ইনজেকশন আক্রমণ প্রতিরোধ করে।' },
                  { label: 'X-Frame-Options', status: 'Active', desc: 'ক্লিকজ্যাকিং (Clickjacking) থেকে সুরক্ষা নিশ্চিত করে।' },
                  { label: 'Input Sanitization', status: 'Active', desc: 'ব্যবহারকারীর ইনপুট ফিল্টার ও ভ্যালিডেশন করা হয়।' },
                  { label: 'Rate Limiting', status: 'Active', desc: 'অপ্রয়োজনীয় স্প্যামিং ও DoS আক্রমণ রোধ করে।' },
                  { label: 'Private Mode (Optional)', status: 'Available', desc: 'ব্রাউজারে কোনো ডেটা সংরক্ষণ না করে ব্যবহারের সুবিধা।' }
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-surface2 border border-border rounded-xl flex items-start gap-3">
                    <div className="mt-1">
                      <Activity className="w-3.5 h-3.5 text-green" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[0.85rem] font-semibold text-text">{item.label}</span>
                        <span className="text-[0.6rem] bg-green/10 text-green px-1.5 py-0.5 rounded border border-green/20 uppercase font-bold">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[0.75rem] text-muted mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowSecurityModal(false)}
                className="w-full py-3 rounded-xl bg-gold text-deep font-bold hover:bg-gold-dark transition-all shadow-lg active:scale-[0.98]"
              >
                বন্ধ করুন
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clear Chat Modal */}
      <AnimatePresence>
        {showClearModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearModal(false)}
              className="absolute inset-0 bg-deep/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-surface border border-border rounded-2xl p-8 max-w-[400px] w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3 font-serif">চ্যাট হিস্ট্রি মুছুন?</h3>
              <p className="text-muted text-[0.9rem] mb-8 leading-[1.6]">
                আপনি কি নিশ্চিত যে আপনি আপনার সমস্ত চ্যাট হিস্ট্রি মুছে ফেলতে চান? এটি আর ফিরে পাওয়া যাবে না।
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 px-5 py-3 rounded-xl bg-surface2 border border-border text-text font-semibold hover:bg-surface transition-colors"
                >
                  না, থাক
                </button>
                <button 
                  onClick={clearChat}
                  className="flex-1 px-5 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                >
                  হ্যাঁ, মুছুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
