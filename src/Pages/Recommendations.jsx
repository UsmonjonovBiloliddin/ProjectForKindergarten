import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Baby, MapPin, Globe, Sparkles, ChevronRight, ChevronLeft,
  Star, CheckCircle2, ArrowRight, Zap, BookOpen,
  Loader2, AlertCircle,
} from "lucide-react";
import Data_Service from "../Service/data.service";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80";

const STEPS = ["Yosh", "Joylashuv", "Imtiyozlar"];

const AGE_OPTIONS = [
  { value: "1-3", label: "1–3 yosh", emoji: "🍼", desc: "Kichik guruh"    },
  { value: "3-5", label: "3–5 yosh", emoji: "🚀", desc: "O'rta guruh"     },
  { value: "5-7", label: "5–7 yosh", emoji: "🎓", desc: "Tayyorlov guruhi"},
];

const REGIONS = [
  "Toshkent","Samarqand","Farg'ona","Namangan",
  "Andijon","Buxoro","Xorazm","Qashqadaryo",
];

const TYPE_OPTIONS = [
  { value:"xususiy", label:"Xususiy",    emoji:"🏫", desc:"Yuqori sifat"},
  { value:"davlat",  label:"Davlat",     emoji:"🏛️", desc:"Arzon narx" },
  { value:"any",     label:"Farqi yo'q", emoji:"✨", desc:"Har qanday" },
];

const LANG_OPTIONS = [
  { value:"uzbek",   label:"O'zbek", emoji:"🇺🇿" },
  { value:"english", label:"Ingliz", emoji:"🇬🇧" },
  { value:"russian", label:"Rus",    emoji:"🇷🇺" },
];

const METHOD_OPTIONS = [
  { value:"montessori", label:"Montessori", icon:<Sparkles size={20}/>, desc:"Mustaqil o'rganish"},
  { value:"steam",      label:"STEAM",      icon:<Zap size={20}/>,      desc:"Fan + Texnologiya" },
  { value:"classic",    label:"Klassik",    icon:<BookOpen size={20}/>,  desc:"An'anaviy usul"   },
];

/* ── scoring ─────────────────────────────────────────────────────────────────*/
function score(kg, p) {
  let s = 0;
  if (p.region && kg.region?.toLowerCase().includes(p.region.toLowerCase())) s += 35;
  if (p.type && p.type !== "any" && kg.type === p.type) s += 25;
  if (p.language) {
    const langs = (kg.languages || []).map(l => l.toLowerCase());
    if (langs.includes(p.language)) s += 20;
  }
  if (p.method === "montessori" && (kg.type === "montessori" || (kg.programs||[]).includes("Montessori"))) s += 20;
  if (p.method === "steam" && (kg.programs||[]).includes("STEAM")) s += 20;
  return s;
}

function rankData(data, p) {
  return [...data]
    .map(k => ({ ...k, _score: score(k, p) }))
    .sort((a, b) => b._score !== a._score ? b._score - a._score : (b.rating||0) - (a.rating||0))
    .slice(0, 6);
}

/* ── OptionCard ──────────────────────────────────────────────────────────────*/
function OptionCard({ selected, onClick, children }) {
  return (
    <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={onClick}
      className={`relative p-4 rounded-2xl border-2 text-left transition-all cursor-pointer w-full
        ${selected
          ?"border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-lg"
          :"border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300 dark:hover:border-indigo-600"
        }`}>
      {selected && (
        <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute top-2.5 right-2.5">
          <CheckCircle2 size={16} className="text-indigo-500"/>
        </motion.div>
      )}
      {children}
    </motion.button>
  );
}

/* ── Steps ───────────────────────────────────────────────────────────────────*/
function Step1({ prefs, set }) {
  return (
    <motion.div key="s1" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl mb-3">
          <Baby className="text-indigo-600 dark:text-indigo-400" size={24}/>
        </div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Farzandingiz necha yoshda?</h2>
        <p className="text-sm text-gray-400 mt-1">Yoshga mos bog'chalarni topamiz</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {AGE_OPTIONS.map(o=>(
          <OptionCard key={o.value} selected={prefs.age===o.value} onClick={()=>set({...prefs,age:o.value})}>
            <div className="text-2xl mb-1.5 text-center">{o.emoji}</div>
            <div className="font-semibold text-gray-800 dark:text-white text-sm text-center">{o.label}</div>
            <div className="text-xs text-gray-400 text-center">{o.desc}</div>
          </OptionCard>
        ))}
      </div>
    </motion.div>
  );
}

function Step2({ prefs, set }) {
  return (
    <motion.div key="s2" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} className="space-y-5">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-2xl mb-3">
          <MapPin className="text-purple-600 dark:text-purple-400" size={24}/>
        </div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Qayerdan qidirasiz?</h2>
        <p className="text-sm text-gray-400 mt-1">Yaqin atrofdagi bog'chalarni ko'rsatamiz</p>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">Viloyat</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {REGIONS.map(r=>(
            <button key={r} onClick={()=>set({...prefs,region:prefs.region===r?"":r})}
              className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all border-2 ${
                prefs.region===r
                  ?"bg-indigo-600 border-indigo-600 text-white shadow-md"
                  :"border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400 bg-white dark:bg-gray-800"
              }`}>{r}</button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">Bog'cha turi</label>
        <div className="grid grid-cols-3 gap-3">
          {TYPE_OPTIONS.map(o=>(
            <OptionCard key={o.value} selected={prefs.type===o.value} onClick={()=>set({...prefs,type:o.value})}>
              <div className="text-2xl text-center mb-1">{o.emoji}</div>
              <div className="font-semibold text-sm text-gray-800 dark:text-white text-center">{o.label}</div>
              <div className="text-xs text-gray-400 text-center">{o.desc}</div>
            </OptionCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Step3({ prefs, set }) {
  return (
    <motion.div key="s3" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} className="space-y-5">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-2xl mb-3">
          <Globe className="text-green-600 dark:text-green-400" size={24}/>
        </div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Ta'lim imtiyozlari</h2>
        <p className="text-sm text-gray-400 mt-1">Muhim xususiyatlarni belgilang</p>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">O'qitish tili</label>
        <div className="grid grid-cols-3 gap-3">
          {LANG_OPTIONS.map(o=>(
            <OptionCard key={o.value} selected={prefs.language===o.value}
              onClick={()=>set({...prefs,language:prefs.language===o.value?"":o.value})}>
              <div className="text-2xl text-center mb-1">{o.emoji}</div>
              <div className="text-sm font-semibold text-gray-800 dark:text-white text-center">{o.label}</div>
            </OptionCard>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">Ta'lim uslubi</label>
        <div className="grid grid-cols-3 gap-3">
          {METHOD_OPTIONS.map(o=>(
            <OptionCard key={o.value} selected={prefs.method===o.value}
              onClick={()=>set({...prefs,method:prefs.method===o.value?"":o.value})}>
              <div className="text-indigo-500 dark:text-indigo-400 mb-1.5 flex justify-center">{o.icon}</div>
              <div className="text-sm font-semibold text-gray-800 dark:text-white text-center">{o.label}</div>
              <div className="text-xs text-gray-400 text-center">{o.desc}</div>
            </OptionCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── ResultCard ──────────────────────────────────────────────────────────────*/
function ResultCard({ kg, index }) {
  const pct = Math.min(99, 65 + Math.round((kg._score||0)/1.5));
  return (
    <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:index*0.08}}>
      <Link to={`/kindergartendetail/${kg.id}`}>
        <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
          <div className="relative h-44 overflow-hidden">
            <img src={kg.image||FALLBACK_IMG} alt={kg.name}
              onError={e=>{e.target.src=FALLBACK_IMG;}}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2.5 py-1 rounded-full">
              <Sparkles size={10} className="text-indigo-500"/>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{pct}% mos</span>
            </div>
            {index===0 && (
              <div className="absolute top-3 right-3 bg-amber-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">🏆 Eng mos</div>
            )}
            {kg.rating && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/55 backdrop-blur px-2 py-1 rounded-full">
                <Star size={10} className="fill-yellow-400 text-yellow-400"/>
                <span className="text-white text-xs font-semibold">{Number(kg.rating).toFixed(1)}</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h4 className="font-bold text-gray-800 dark:text-white text-sm leading-snug mb-1.5 line-clamp-2">{kg.name}</h4>
            {(kg.location_address||kg.region) && (
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                <MapPin size={10}/> {kg.location_address||`${kg.region}${kg.district?", "+kg.district:""}`}
              </p>
            )}
            {kg.type && (
              <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium capitalize mb-2">
                {kg.type}
              </span>
            )}
            <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 dark:border-gray-700">
              {kg.price
                ? <div><span className="font-bold text-gray-800 dark:text-white text-sm">{Number(kg.price).toLocaleString()}</span><span className="text-xs text-gray-400 ml-1">UZS/oy</span></div>
                : <span/>
              }
              <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                Ko'rish <ArrowRight size={12}/>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Main ────────────────────────────────────────────────────────────────────*/
export default function RecommendationsPage() {
  const [step,    setStep]    = useState(0);
  const [prefs,   setPrefs]   = useState({age:"",region:"",type:"",language:"",method:""});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const isValid = () => step===0 ? !!prefs.age : step===1 ? !!(prefs.region||prefs.type) : true;

  const handleNext = useCallback(async () => {
    if (step < 2) { setStep(s=>s+1); return; }
    setLoading(true); setError("");
    try {
      const res  = await Data_Service.GetKinder();
      const data = Array.isArray(res?.data) ? res.data : [];
      if (!data.length) { setError("Server javob bermadi. Qayta urinib ko'ring."); return; }
      setResults(rankData(data, prefs));
    } catch { setError("Ulanishda xatolik. Internet aloqasini tekshiring."); }
    finally { setLoading(false); }
  }, [step, prefs]);

  const reset = () => { setStep(0); setPrefs({age:"",region:"",type:"",language:"",method:""}); setResults(null); setError(""); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}
          className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Sparkles size={13}/> Aqlli tavsiya tizimi
        </motion.div>
        <motion.h1 initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white leading-tight">
          Farzandingizga mos{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">bog'chani toping</span>
        </motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}
          className="mt-3 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          3 ta savolga javob bering — biz <strong>real ma'lumotlar</strong> asosida eng mos variantlarni topamiz
        </motion.p>
      </div>

      <AnimatePresence mode="wait">

        {/* WIZARD */}
        {!results && (
          <motion.div key="wiz" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="max-w-2xl mx-auto">

            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-6">
              {STEPS.map((s,i)=>(
                <div key={i} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all
                    ${i<step?"bg-indigo-600 text-white":i===step?"bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900":"bg-gray-200 dark:bg-gray-700 text-gray-500"}`}>
                    {i<step?<CheckCircle2 size={14}/>:i+1}
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-400 hidden sm:block">{s}</span>
                  {i<STEPS.length-1&&(
                    <div className="flex-1 h-0.5 mx-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <motion.div className="h-full bg-indigo-600" animate={{width:i<step?"100%":"0%"}} transition={{duration:0.4}}/>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {step===0&&<Step1 prefs={prefs} set={setPrefs}/>}
                {step===1&&<Step2 prefs={prefs} set={setPrefs}/>}
                {step===2&&<Step3 prefs={prefs} set={setPrefs}/>}
              </AnimatePresence>

              {error&&(
                <div className="mt-4 flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
                  <AlertCircle size={14}/> {error}
                </div>
              )}

              <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
                <button onClick={()=>setStep(s=>s-1)} disabled={step===0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition">
                  <ChevronLeft size={15}/> Orqaga
                </button>
                <motion.button whileHover={isValid()?{scale:1.04}:{}} whileTap={isValid()?{scale:0.97}:{}}
                  onClick={handleNext} disabled={!isValid()||loading}
                  className="flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  {loading?<><Loader2 size={14} className="animate-spin"/>Qidirilmoqda...</>
                    :step===2?<><Sparkles size={14}/>Tavsiyalarni ko'r</>
                    :<>Davom etish<ChevronRight size={14}/></>}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* RESULTS */}
        {results && (
          <motion.div key="res" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  🎯 {results.length} ta bog'cha topildi
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {[prefs.region, prefs.type!=="any"&&prefs.type].filter(Boolean).join(" · ")} · Reyting bo'yicha
                </p>
              </div>
              <button onClick={reset}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition">
                <ChevronLeft size={14}/> Qayta qidirish
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((kg,i)=><ResultCard key={kg.id} kg={kg} index={i}/>)}
            </div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
              className="mt-10 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Barcha bog'chalarni ko'rmoqchimisiz?</h3>
              <p className="text-white/75 text-sm mb-5">Filtr va qidiruv bilan to'liq ro'yxat</p>
              <Link to="/kindergartens">
                <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.97}}
                  className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all">
                  Barcha bog'chalar →
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}