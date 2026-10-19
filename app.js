(() => {
const cfg=window.UTSAV_CONFIG||{};
const valid=cfg.SUPABASE_URL?.startsWith("https://")&&!cfg.SUPABASE_URL.includes("PASTE_")&&cfg.SUPABASE_ANON_KEY&&!cfg.SUPABASE_ANON_KEY.includes("PASTE_");
const wa=(cfg.WHATSAPP_NUMBER||"9198235345").replace(/\D/g,"");
const waUrl="https://wa.me/"+wa+"?text="+encodeURIComponent("Hello Utsav Ethnic Studio, please share your latest collection.");
["navWhatsApp","heroWhatsApp","aboutWhatsApp","floatingWhatsApp"].forEach(id=>{const el=document.getElementById(id);if(el)el.href=waUrl;});
const phone=(cfg.PHONE_NUMBER||"9198235345").replace(/\D/g,"");document.getElementById("phoneLink").href="tel:+"+phone;document.getElementById("callButton").href="tel:+"+phone;
document.getElementById("mapLink").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(cfg.MAPS_QUERY||"Utsav Ethnic Studio Gorakhpur");
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
const grid=document.getElementById("productGrid"),empty=document.getElementById("emptyMessage");
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function card(p){const img=p.image_url?`<img src="${escapeHtml(p.image_url)}" alt="${escapeHtml(p.name)}" loading="lazy">`:`<div class="product-placeholder">UTSAV<br><span>ETHNIC STUDIO</span></div>`;const price=p.price!==null&&p.price!==""&&p.price!==undefined?`<p class="product-price">₹${Number(p.price).toLocaleString("en-IN")}</p>`:`<p class="product-price">Price on request</p>`;const msg=encodeURIComponent(`Hello Utsav Ethnic Studio, I am interested in ${p.name}${p.price?` (₹${Number(p.price).toLocaleString("en-IN")})`:""}. Please share details.`);return `<article class="product-card"><div class="product-photo">${img}${p.featured?'<span class="featured-tag">FEATURED</span>':""}</div><div class="product-info"><p class="product-category">${escapeHtml(p.category)}</p><h3>${escapeHtml(p.name)}</h3>${p.description?`<p class="product-description">${escapeHtml(p.description)}</p>`:""}${price}<a class="product-enquire" target="_blank" rel="noopener" href="https://wa.me/${wa}?text=${msg}">Enquire on WhatsApp ↗</a></div></article>`;}
if(!valid){grid.innerHTML='<div class="setup-notice"><strong>Website setup in progress</strong><p>Products will appear here after the owner connects the free catalogue database. For current styles, contact us on WhatsApp.</p><a class="button button-maroon" href="'+waUrl+'">WhatsApp us</a></div>';return;}
const db=window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
db.from("products").select("*").order("created_at",{ascending:false}).then(({data,error})=>{if(error){grid.innerHTML='<div class="setup-notice">Collection is temporarily unavailable. Please contact us on WhatsApp.</div>';return;}if(!data?.length){grid.innerHTML="";empty.hidden=false;return;}grid.innerHTML=data.map(card).join("");});
})();