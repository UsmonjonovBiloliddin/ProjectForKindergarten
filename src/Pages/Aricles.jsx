import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Bookmark, Share2, Clock, Eye, X,
  Search, ArrowUpRight, TrendingUp,
} from "lucide-react";

const W = "max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16";

const CATS = ["Barchasi","Montessori","Psixologiya","Maslahat","Rivojlanish","Taqqoslash"];

const ARTICLES = [
  {
    id:1, cat:"Montessori", featured:true,
    title:"Montessori uslubi: bolangiz uchun to'g'ri tanlovmi?",
    snippet:"Bola o'z sur'atida, mustaqil o'rganadi. Bu uslub haqiqatan ham ishlaydi? Tadqiqotlar va real tajribalar asosida.",
    body:[
      {h:"Uslub haqida",t:"Montessori metodikasi 1900-yillarda Mariya Montessori tomonidan yaratilgan. Bolaning mustaqil rivojlanishiga yo'naltirilgan bu yondashuv bugun 140+ mamlakatda qo'llaniladi."},
      {h:"Asosiy tamoyillar",t:"Bola o'z sur'atida harakat qiladi. O'qituvchi buyuruvchi emas — yo'llovchi. Maxsus muhit va yosh aralash guruhlar Montessori'ning asosi."},
      {h:"Tadqiqotlar nima deydi?",t:"Stanford tadqiqotiga ko'ra, Montessori bolalari ijodiy fikrlashda 40% yuqori natija ko'rsatadi. Matematik va o'qish ko'nikmalarida ham ustunlik bor."},
      {h:"Kimga mos emas?",t:"Juda aktiv bolalar uchun klassik yoki STEAM metodikasi samaraliroq bo'lishi mumkin. Avval bolangizni kuzating."},
    ],
    tip:"💡 3–6 yosh oralig'ida boshlash eng samarali",
    readTime:"5 daq",views:3240,likes:187,saves:92,
    img:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1400&q=80",
    author:"Nilufar Karimova",role:"Ta'lim psixologi",color:"#6366f1",
  },
  {
    id:2, cat:"Psixologiya", featured:false,
    title:"Bog'chaga birinchi kun: to'g'ri tayyorlash",
    snippet:"Ko'p ota-onalar birinchi kuni yig'laydi — lekin bolalardan ham ko'proq! Psixologlar maslahatlarini o'rganing.",
    body:[
      {h:"Nima kutmoq kerak?",t:"Birinchi kun stressli bo'lishi tabiiy. Moslashish vaqti 2 haftadan 2 oygacha davom etishi mumkin — bu mutlaqo normal holat."},
      {h:"2 hafta oldin boshlang",t:"Bog'cha haqida ijobiy gapirib boring. 'Yangi do'stlar topasan' deb tushuntiring. Bir necha marta bog'cha yonidan o'ting."},
      {h:"Birinchi kun qoidalari",t:"Erta turing. Sevimli o'yinchoqni birga oling. Xayrlashishni qisqa qiling — 30 soniyadan oshirmang. 'Qaytib kelaman' deganingizni HECH QACHON unutmang."},
    ],
    tip:"💡 Xayrlashishni 30 soniyadan oshirmang",
    readTime:"7 daq",views:5180,likes:342,saves:210,
    img:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=900&q=80",
    author:"Sherzod Toshmatov",role:"Bolalar psixologi",color:"#ec4899",
  },
  {
    id:3, cat:"Taqqoslash", featured:false,
    title:"Xususiy vs Davlat bog'chasi: raqamlar bilan",
    snippet:"Narx farqi, o'qituvchilar sifati, infratuzilma — qaysi biri haqiqatan afzal? To'liq solishtirma.",
    body:[
      {h:"Narx farqi",t:"Davlat bog'chalari: 200,000–500,000 so'm/oy. Xususiy bog'chalar: 700,000–2,000,000+ so'm/oy. Bu farq nima bilan asoslanadi?"},
      {h:"O'qituvchilar sifati",t:"Davlat: Tajribali, ammo ko'p bola (25–30). Xususiy: Sertifikatlangan, individual yondashuv, guruhda 10–15 bola."},
      {h:"To'g'ri tanlov",t:"Byudjet cheklangan — yaxshi davlat bog'chasi to'g'ri. Individual e'tibor kerak bo'lsa — xususiy afzal."},
    ],
    tip:"💡 Xususiy bog'cha davlatnikidan o'rtacha 4x qimmat",
    readTime:"9 daq",views:7620,likes:521,saves:388,
    img:"https://images.unsplash.com/photo-1588072432836-e10032774350?w=900&q=80",
    author:"Malika Yusupova",role:"Ta'lim mutaxassisi",color:"#22d3ee",
  },
  {
    id:4, cat:"Rivojlanish", featured:false,
    title:"STEAM ta'limi: kelajak avlodga tayyorgarlik",
    snippet:"Fan, texnologiya, muhandislik, san'at va matematika — barchasi birgalikda. Bu kelajak uchunmi?",
    body:[
      {h:"STEAM nima?",t:"Science, Technology, Engineering, Art, Mathematics. Tanqidiy fikrlash va muammo hal etish ko'nikmalarini rivojlantiruvchi yondashuv."},
      {h:"Nima uchun zarur?",t:"2030-yilga kelib ish o'rinlarining 85% hali mavjud bo'lmagan kasblarda bo'ladi. STEAM bolalarni ana shu kelajakka tayyorlaydi."},
      {h:"Bog'chada qanday ko'rinadi?",t:"Suv va qum bilan tajribalar, Lego qurilish, oddiy dasturlash o'yinlari, rasm va musiqa birgalikda — STEAM'ning asosi shu."},
    ],
    tip:"💡 STEAM IQ bilan birga EQ ni ham oshiradi",
    readTime:"6 daq",views:2890,likes:156,saves:74,
    img:"https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=900&q=80",
    author:"Davron Ergashev",role:"STEAM murabbiy",color:"#f97316",
  },
  {
    id:5, cat:"Maslahat", featured:false,
    title:"Bog'cha tanlashda 10 ta muhim mezon",
    snippet:"Ko'p ota-onalar faqat narxga qaraydi. Aslida muhim bo'lgan mezonlar boshqacha — bu ro'yxatni o'qing.",
    body:[
      {h:"Xavfsizlik birinchi",t:"Kamera tizimi, qo'riqchi, kirish/chiqish nazorati — bular murosasiz talablar. Ko'ringan joyda CCTV shart."},
      {h:"O'qituvchilar malakasi",t:"Pedagogika ma'lumoti, ish tajribasi, bolalarga munosabat — bularni bevosita suhbat orqali baholang."},
      {h:"Amaliy maslahat",t:"Ro'yxatdan o'tishdan avval 1 kun mehmon bo'lib koring. Bolangizning reaktsiyasini kuzating. Kamida 3 ta bog'chani solishtirib ko'ring."},
    ],
    tip:"💡 Kamida 3 ta bog'chani tashrif buyuring",
    readTime:"8 daq",views:9100,likes:643,saves:520,
    img:"https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=900&q=80",
    author:"Nilufar Karimova",role:"Ta'lim psixologi",color:"#4ade80",
  },
];

/* ── Read Modal ─────────────────────────────────────────────────────────────── */
function ReadModal({ a, liked, saved, onLike, onSave, onClose }) {
  return (
    <motion.div
      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-8"
      style={{background:"rgba(0,0,0,0.72)",backdropFilter:"blur(8px)"}}
      onClick={onClose}
    >
      <motion.div
        initial={{y:60,opacity:0}} animate={{y:0,opacity:1}} exit={{y:60,opacity:0}}
        transition={{type:"spring",damping:28,stiffness:300}}
        onClick={e=>e.stopPropagation()}
        className="w-full sm:max-w-2xl bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92vh] flex flex-col shadow-2xl"
      >
        {/* hero */}
        <div className="relative h-56 sm:h-72 flex-shrink-0 overflow-hidden">
          <img src={a.img} alt="" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent"/>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/55 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/75 transition">
            <X size={16}/>
          </button>
          <div className="absolute bottom-5 left-6 right-16 space-y-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full text-white inline-block"
              style={{background:a.color}}>{a.cat}</span>
            <h2 className="text-white font-extrabold text-xl sm:text-2xl leading-snug">{a.title}</h2>
          </div>
        </div>
        {/* author */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{background:a.color}}>{a.author[0]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-800 dark:text-white text-sm font-semibold">{a.author}</p>
            <p className="text-gray-400 text-xs">{a.role}</p>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm mr-3">
            <Clock size={13}/>{a.readTime}
          </div>
          <div className="flex items-center gap-1">
            {[
              {icon:<Heart size={18}/>,active:liked,color:a.color,fn:onLike},
              {icon:<Bookmark size={18}/>,active:saved,color:"#f59e0b",fn:onSave},
              {icon:<Share2 size={18}/>,active:false,color:"#6b7280",fn:()=>{}},
            ].map((b,i)=>(
              <button key={i} onClick={b.fn}
                className="p-2.5 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{color:b.active?b.color:"#9ca3af"}}>
                {b.icon}
              </button>
            ))}
          </div>
        </div>
        {/* body */}
        <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6">
          {a.body.map((s,i)=>(
            <div key={i}>
              <h3 className="font-bold text-base mb-2" style={{color:a.color}}>{s.h}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{s.t}</p>
            </div>
          ))}
          <div className="p-4 rounded-2xl text-sm sm:text-base font-semibold"
            style={{background:`${a.color}18`,color:a.color,border:`1px solid ${a.color}35`}}>
            {a.tip}
          </div>
          <div className="h-2"/>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Featured Card ──────────────────────────────────────────────────────────── */
function FeaturedCard({ a, onOpen, liked, saved, onLike, onSave }) {
  return (
    <motion.div
      initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}
      onClick={()=>onOpen(a)}
      className="cursor-pointer group rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row bg-white dark:bg-gray-900"
    >
      {/* image */}
      <div className="relative overflow-hidden h-52 sm:h-60 lg:h-auto lg:w-[45%] flex-shrink-0">
        <img src={a.img} alt={a.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent lg:hidden"/>
        {/* mobile badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full">
            <TrendingUp size={11} className="text-yellow-400"/>
            <span className="text-white text-xs font-bold">Eng ko'p o'qilgan</span>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
            style={{background:a.color}}>{a.cat}</span>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-8 flex-1">
        <div>
          {/* desktop badges */}
          <div className="hidden lg:flex items-center gap-2 mb-5">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
              <TrendingUp size={13} className="text-yellow-500"/>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-bold">Eng ko'p o'qilgan</span>
            </div>
            <span className="text-sm font-bold px-4 py-2 rounded-full text-white"
              style={{background:a.color}}>{a.cat}</span>
          </div>

          <h2 className="text-gray-900 dark:text-white font-extrabold text-xl sm:text-2xl lg:text-3xl leading-tight mb-3">
            {a.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
            {a.snippet}
          </p>
          <div className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium mb-4"
            style={{background:`${a.color}15`,color:a.color,border:`1px solid ${a.color}30`}}>
            {a.tip}
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{background:a.color}}>{a.author[0]}</div>
            <div>
              <p className="text-gray-800 dark:text-white text-sm font-semibold">{a.author}</p>
              <div className="flex items-center gap-3 mt-0.5 text-gray-400 text-xs">
                <span className="flex items-center gap-1"><Clock size={10}/>{a.readTime}</span>
                <span className="flex items-center gap-1"><Eye size={10}/>{(a.views/1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={e=>{e.stopPropagation();onLike(a.id);}}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={{color:liked?a.color:"#9ca3af"}}>
              <Heart size={17} style={{fill:liked?a.color:"none"}}/>
            </button>
            <button onClick={e=>{e.stopPropagation();onSave(a.id);}}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={{color:saved?"#f59e0b":"#9ca3af"}}>
              <Bookmark size={17} style={{fill:saved?"#f59e0b":"none"}}/>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90 transition"
              style={{background:a.color}}>
              O'qish <ArrowUpRight size={14}/>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Article Card ───────────────────────────────────────────────────────────── */
function ArticleCard({ a, onOpen, liked, saved, onLike, onSave, index }) {
  return (
    <motion.div
      initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      transition={{delay:index*0.06}}
      onClick={()=>onOpen(a)}
      className="group cursor-pointer bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col hover:-translate-y-1"
    >
      {/* image */}
      <div className="relative overflow-hidden h-48 sm:h-52 lg:h-56 flex-shrink-0">
        <img src={a.img} alt={a.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"/>
        <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white"
          style={{background:a.color}}>{a.cat}</span>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full">
          <Eye size={10} className="text-white/80"/>
          <span className="text-white/80 text-xs font-medium">{(a.views/1000).toFixed(1)}k</span>
        </div>
      </div>

      {/* body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-gray-800 dark:text-white font-bold text-base sm:text-lg leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {a.title}
        </h3>
        <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
          {a.snippet}
        </p>
        {/* footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{background:a.color}}>{a.author[0]}</div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold leading-none truncate max-w-[110px]">
                {a.author.split(" ")[0]}
              </p>
              <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                <Clock size={9}/>{a.readTime}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={e=>{e.stopPropagation();onLike(a.id);}}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={{color:liked?a.color:"#d1d5db"}}>
              <Heart size={16} style={{fill:liked?a.color:"none"}}/>
            </button>
            <button onClick={e=>{e.stopPropagation();onSave(a.id);}}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={{color:saved?"#f59e0b":"#d1d5db"}}>
              <Bookmark size={16} style={{fill:saved?"#f59e0b":"none"}}/>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────────────── */
export default function ArticlesPage() {
  const [cat,      setCat]      = useState("Barchasi");
  const [search,   setSearch]   = useState("");
  const [modal,    setModal]    = useState(null);
  const [likedSet, setLikedSet] = useState(new Set());
  const [savedSet, setSavedSet] = useState(new Set());

  const toggleLike = id => setLikedSet(p=>{const s=new Set(p);s.has(id)?s.delete(id):s.add(id);return s;});
  const toggleSave = id => setSavedSet(p=>{const s=new Set(p);s.has(id)?s.delete(id):s.add(id);return s;});

  const featured = ARTICLES.find(a=>a.featured);
  const filtered = ARTICLES.filter(a=>{
    const mc = cat==="Barchasi"||a.cat===cat;
    const mq = !search||a.title.toLowerCase().includes(search.toLowerCase())||a.snippet.toLowerCase().includes(search.toLowerCase());
    return mc&&mq&&!a.featured;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className={W}>
          {/* top row */}
          <div className="flex items-center gap-4 py-4 sm:py-5">
            <div className="flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-none">Maqolalar</h1>
              <p className="text-gray-400 text-sm mt-1">Ota-onalar uchun foydali bilimlar</p>
            </div>

            {/* search — desktop */}
            <div className="relative flex-1 max-w-sm hidden sm:block ml-6">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Maqola qidiring..."
                className="w-full pl-11 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400/50 transition"/>
            </div>

            <div className="ml-auto text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0">
              {ARTICLES.length} ta maqola
            </div>
          </div>

          {/* search mobile */}
          <div className="relative sm:hidden pb-3">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Maqola qidiring..."
              className="w-full pl-11 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400/50 transition text-gray-700 dark:text-gray-200"/>
          </div>

          {/* cats */}
          <div className="flex gap-2 overflow-x-auto pb-4" style={{scrollbarWidth:"none"}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all
                  ${cat===c
                    ?"bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900"
                    :"bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className={`${W} py-8 sm:py-10 space-y-8 sm:space-y-10`}>

        {/* featured */}
        {cat==="Barchasi"&&!search&&featured&&(
          <FeaturedCard a={featured} onOpen={setModal}
            liked={likedSet.has(featured.id)} saved={savedSet.has(featured.id)}
            onLike={toggleLike} onSave={toggleSave}/>
        )}

        {/* section label */}
        {filtered.length>0&&(
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              {cat==="Barchasi"?"Barcha maqolalar":cat}
              <span className="ml-2 text-base font-normal text-gray-400">({filtered.length})</span>
            </h2>
          </div>
        )}

        {/* grid — 1 → 2 → 3 → 4 col */}
        <AnimatePresence mode="wait">
          {filtered.length===0?(
            <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}}
              className="text-center py-28">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-400 text-lg font-medium">Hech narsa topilmadi</p>
              <button onClick={()=>{setCat("Barchasi");setSearch("");}}
                className="mt-4 text-indigo-600 text-sm font-semibold hover:underline">Tozalash</button>
            </motion.div>
          ):(
            <motion.div key={cat+search} initial={{opacity:0}} animate={{opacity:1}}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filtered.map((a,i)=>(
                <ArticleCard key={a.id} a={a} index={i} onOpen={setModal}
                  liked={likedSet.has(a.id)} saved={savedSet.has(a.id)}
                  onLike={toggleLike} onSave={toggleSave}/>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {[
            {val:"5+",  label:"Jami maqola", sub:"va ko'paymoqda"},
            {val:"3",   label:"Mualliflar",  sub:"mutaxassis"},
            {val:"27k", label:"O'quvchilar", sub:"ota-ona foydalandi"},
          ].map((s,i)=>(
            <div key={i}
              className="text-center bg-white dark:bg-gray-900 rounded-2xl py-5 sm:py-7 px-4 border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">{s.val}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base font-semibold mt-2">{s.label}</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="h-6"/>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {modal&&(
          <ReadModal a={modal}
            liked={likedSet.has(modal.id)} saved={savedSet.has(modal.id)}
            onLike={()=>toggleLike(modal.id)} onSave={()=>toggleSave(modal.id)}
            onClose={()=>setModal(null)}/>
        )}
      </AnimatePresence>
    </div>
  );
}