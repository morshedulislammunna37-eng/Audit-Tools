const templates = [
  { id:"eoi", title:"Expression of Interest (EOI)", desc:"For appointing an auditor", category:"Planning", icon:"send" },
  { id:"appointment", title:"Appointment Letter", desc:"Formal appointment for audit", category:"Internal", icon:"brief" },
  { id:"agm", title:"EGM / AGM Notice", desc:"Annual or extra general meeting", category:"Internal", icon:"users" },
  { id:"deputation", title:"Team Deputation", desc:"Audit team assignment letter", category:"Internal", icon:"team" },
  { id:"form23b", title:"Form 23B", desc:"Auditor consent and certificate", category:"Planning", icon:"file" },
  { id:"engagement", title:"Engagement Letter", desc:"Terms of audit engagement", category:"Planning", icon:"handshake" },
  { id:"bank", title:"Bank Confirmation", desc:"External bank balance confirmation", category:"External", icon:"bank" },
  { id:"receivable", title:"Receivable Confirmation", desc:"Customer balance confirmation", category:"External", icon:"arrowin" },
  { id:"payable", title:"Payable Confirmation", desc:"Supplier balance confirmation", category:"External", icon:"arrowout" },
  { id:"management", title:"Management Representation", desc:"Management responsibility letter", category:"External", icon:"shield" }
];

const icons = {
  send:'<svg viewBox="0 0 24 24"><path d="M3 11 21 4l-7 17-4-7-7-3Z"/><path d="m10 14 5-5"/></svg>',
  brief:'<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2"/></svg>',
  users:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c0-4 2-7 6-7s6 3 6 7M16 14c3 0 5 2 5 5"/></svg>',
  team:'<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20c0-4 2-6 6-6s6 2 6 6M14 20c0-3 1-5 4-5 3 0 4 2 4 5"/></svg>',
  file:'<svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6V3Z"/><path d="M15 3v5h5M9 12h7M9 16h7"/></svg>',
  handshake:'<svg viewBox="0 0 24 24"><path d="m8 12 3-3 3 3 3-3 4 4-6 6-3-3-4 4-5-5 5-6 3 3"/></svg>',
  bank:'<svg viewBox="0 0 24 24"><path d="m3 9 9-5 9 5M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/></svg>',
  arrowin:'<svg viewBox="0 0 24 24"><path d="M20 12H4M10 6l-6 6 6 6"/><path d="M15 7h4v10h-4"/></svg>',
  arrowout:'<svg viewBox="0 0 24 24"><path d="M4 12h16M14 6l6 6-6 6"/><path d="M9 7H5v10h4"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3 8-8 10-5-2-8-5-8-10V6l8-3Z"/><path d="m8 12 3 3 5-6"/></svg>'
};

const commonFields = [
  {section:"Organization Details"},
  {name:"company", label:"Company Name", type:"text", placeholder:"Example Limited", required:true},
  {name:"address", label:"Address", type:"textarea", placeholder:"Registered office address"},
  {name:"auditor", label:"Auditor / Firm Name", type:"text", placeholder:"Rahim & Associates"},
  {name:"date", label:"Letter Date", type:"date"},
  {name:"reference", label:"Reference Number", type:"text", placeholder:"RA/2026/001"},
];

const templateFields = {
  eoi: [...commonFields, {name:"period",label:"Audit Period",type:"text",placeholder:"30 June 2026"}],
  appointment: [...commonFields, {name:"period",label:"Audit Period",type:"text",placeholder:"30 June 2026"}, {name:"fee",label:"Professional Fee",type:"text",placeholder:"BDT 150,000"}],
  agm: [...commonFields, {section:"Meeting Details"}, {name:"meeting",label:"Meeting Type",type:"select",options:["Annual General Meeting","Extraordinary General Meeting"]}, {name:"meetingDate",label:"Meeting Date",type:"date"}, {name:"venue",label:"Venue",type:"text",placeholder:"Registered office"}],
  deputation: [...commonFields, {section:"Team Information"}, {name:"teamLead",label:"Team Lead",type:"text",placeholder:"Mr. X, FCA"}, {name:"teamMembers",label:"Team Members",type:"textarea",placeholder:"Name and designation"}, {name:"visitPeriod",label:"Visit Period",type:"text",placeholder:"1-15 July 2026"}],
  form23b: [...commonFields, {name:"retiringAuditor",label:"Retiring Auditor",type:"text",placeholder:"Previous auditor name"}, {name:"previousFirm",label:"Previous Appointment",type:"text",placeholder:"Year(s)"}],
  engagement: [...commonFields, {name:"period",label:"Financial Year",type:"text",placeholder:"30 June 2026"}, {name:"scope",label:"Scope of Audit",type:"textarea",placeholder:"Audit of financial statements..."}, {name:"fee",label:"Professional Fee",type:"text",placeholder:"BDT 150,000"}],
  bank: [...commonFields, {section:"Bank Information"}, {name:"bankName",label:"Bank Name",type:"text",placeholder:"Example Bank PLC"}, {name:"branch",label:"Branch",type:"text",placeholder:"Motijheel Branch"}, {name:"accountNo",label:"Account Number",type:"text",placeholder:"0000000000"}, {name:"balance",label:"Balance",type:"text",placeholder:"BDT 0.00"}],
  receivable: [...commonFields, {section:"Party Information"}, {name:"party",label:"Customer Name",type:"text",placeholder:"Customer Company Ltd."}, {name:"partyAddress",label:"Customer Address",type:"textarea",placeholder:"Customer address"}, {name:"balance",label:"Balance Confirmed",type:"text",placeholder:"BDT 0.00"}, {name:"asOn",label:"As on Date",type:"date"}],
  payable: [...commonFields, {section:"Party Information"}, {name:"party",label:"Supplier Name",type:"text",placeholder:"Supplier Company Ltd."}, {name:"partyAddress",label:"Supplier Address",type:"textarea",placeholder:"Supplier address"}, {name:"balance",label:"Balance Confirmed",type:"text",placeholder:"BDT 0.00"}, {name:"asOn",label:"As on Date",type:"date"}],
  management: [...commonFields, {name:"period",label:"Financial Year",type:"text",placeholder:"30 June 2026"}, {name:"representative",label:"Management Representative",type:"text",placeholder:"Name and designation"}, {name:"responsibility",label:"Additional Responsibilities",type:"textarea",placeholder:"Internal control, compliance and disclosure matters"}]
};

let activeTemplate = null;
let generatedCount = Number(localStorage.getItem("auditGeneratedCount") || 0);
let supabase = null;
let currentUser = null;
let authMode = "signin";
let databaseDrafts = [];

if (window.AUDIT_SUPABASE_URL && window.AUDIT_SUPABASE_ANON_KEY && window.supabase) {
  supabase = window.supabase.createClient(window.AUDIT_SUPABASE_URL, window.AUDIT_SUPABASE_ANON_KEY);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c]));
}
function getData() {
  const data = {};
  document.querySelectorAll("#letterForm [name]").forEach(el => data[el.name] = el.value);
  return data;
}
function setData(data) {
  document.querySelectorAll("#letterForm [name]").forEach(el => { if (data[el.name] !== undefined) el.value = data[el.name]; });
  updatePreview();
}
function formatDate(value) {
  if (!value) return "____ / ____ / ______";
  const d = new Date(value + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day:"2-digit", month:"long", year:"numeric" });
}
function todayText() {
  const d = new Date();
  document.getElementById("todayDate").textContent = d.toLocaleDateString("en-US", { weekday:"long", day:"2-digit", month:"short", year:"numeric" });
}
function renderTemplates(containerId, limit) {
  const container = document.getElementById(containerId);
  const categoryFilter = containerId === "allTemplateGrid" ? document.querySelector(".filter.active")?.dataset.category : "All";
  let items = templates;
  if (categoryFilter && categoryFilter !== "All") items = items.filter(t => t.category === categoryFilter);
  if (limit) items = items.slice(0, limit);
  container.innerHTML = items.map(t => `
    <button class="template-card" data-template="${t.id}">
      <div class="card-icon">${icons[t.icon]}</div>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <footer><span>${t.category} Letter</span><span>›</span></footer>
    </button>`).join("");
  container.querySelectorAll(".template-card").forEach(card => card.addEventListener("click", () => openTemplate(card.dataset.template)));
}
function showView(view) {
  ["dashboardView","lettersView","draftsView","editorView"].forEach(id => document.getElementById(id).classList.add("hidden"));
  document.getElementById(view + "View").classList.remove("hidden");
  document.querySelectorAll(".nav-item[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  document.getElementById("mobileMenu")?.parentElement;
  document.querySelector(".sidebar").classList.remove("open");
  if (view === "dashboard") renderTemplates("templateGrid", 10);
  if (view === "letters") renderTemplates("allTemplateGrid");
  if (view === "drafts") renderDrafts();
}
function openTemplate(id) {
  activeTemplate = templates.find(t => t.id === id);
  document.getElementById("editorTitle").textContent = activeTemplate.title;
  document.getElementById("editorCategory").textContent = (activeTemplate.category + " Letter").toUpper();
  renderForm();
  showView("editor");
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
  updatePreview();
}
function renderForm() {
  const form = document.getElementById("letterForm");
  form.innerHTML = templateFields[activeTemplate.id].map(field => {
    if (field.section) return `<div class="field-section">${field.section.toUpper()}</div>`;
    if (field.type === "textarea") return `<div class="field"><label>${field.label}</label><textarea name="${field.name}" placeholder="${field.placeholder || ""}"></textarea></div>`;
    if (field.type === "select") return `<div class="field"><label>${field.label}</label><select name="${field.name}">${field.options.map(o => `<option>${o}</option>`).join("")}</select></div>`;
    return `<div class="field"><label>${field.label}</label><input name="${field.name}" type="${field.type}" value="${field.type === "date" ? new Date().toISOString().slice(0,10) : ""}" placeholder="${field.placeholder || ""}"></div>`;
  }).join("");
  form.querySelectorAll("input,textarea,select").forEach(el => el.addEventListener("input", updatePreview));
}

function previewShell(d) {
  const firm = escapeHtml(d.auditor || "Rahim & Associates");
  const company = escapeHtml(d.company || "[Company Name]");
  return `
    <div class="letter-head">
      <div class="firm-name">${firm}</div>
      <div class="firm-meta">Chartered Accountants<br>House 12, Road 5, Dhanmondi<br>Dhaka-1205, Bangladesh</div>
    </div>
    <div class="letter-date">Date: ${formatDate(d.date)}</div>
    <div class="address">The Board of Directors<br><strong>${company}</strong><br>${escapeHtml(d.address || "[Registered Address]")}</div>`;
}
function updatePreview() {
  const d = getData();
  let body = "";
  const commonStart = previewShell(d);
  switch(activeTemplate.id) {
    case "eoi": body = `<h1>EXPRESSION OF INTEREST</h1><p class="subject">Subject: Expression of interest for appointment as auditor</p><p class="salutation">Dear Sir / Madam,</p><p>We respectfully express our interest in providing audit and assurance services to <strong>${escapeHtml(d.company || "[Company Name]")}</strong> for the period ended <strong>${escapeHtml(d.period || "[Audit Period]")}</strong>.</p><p>Our firm has the professional capacity, independence and relevant experience to undertake the engagement. We shall comply with applicable laws, the Bangladesh Chartered Accountants Order, 1973 and ICAB professional standards.</p><p>The scope, fee and terms will be agreed upon execution of the formal engagement letter.</p>`; break;
    case "appointment": body = `<h1>APPOINTMENT LETTER</h1><p class="subject">Subject: Appointment as statutory auditor</p><p class="salutation">Dear Sir / Madam,</p><p>This is to confirm that <strong>${escapeHtml(d.auditor || "our firm")}</strong> has been appointed as the auditor of <strong>${escapeHtml(d.company || "[Company Name]")}</strong> for the financial year ended <strong>${escapeHtml(d.period || "[Period]")}</strong>.</p><p>The professional fee for the engagement is <strong>${escapeHtml(d.fee || "[Fee]")}</strong>, exclusive of applicable taxes and reimbursable expenses.</p><p>Please arrange access to the necessary records, personnel and information for completion of the audit.</p>`; break;
    case "agm": body = `<h1>${escapeHtml(d.meeting || "GENERAL MEETING")} NOTICE</h1><p class="subject">Notice is hereby given to the shareholders of <strong>${escapeHtml(d.company || "[Company Name]")}</strong>.</p><p>The meeting will be held on <strong>${formatDate(d.meetingDate)}</strong> at <strong>${escapeHtml(d.venue || "[Venue]")}</strong> to transact the business stated in the agenda circulated with this notice.</p><p>Members are requested to attend the meeting or appoint a proxy in accordance with the Articles and applicable law.</p>`; break;
    case "deputation": body = `<h1>TEAM DEPUTATION LETTER</h1><p class="subject">Subject: Deputation of audit team</p><p class="salutation">Dear Sir / Madam,</p><p>The following team is deputed to conduct audit procedures at <strong>${escapeHtml(d.company || "[Company Name]")}</strong> during <strong>${escapeHtml(d.visitPeriod || "[Visit Period]")}</strong>.</p><p><strong>Team Lead:</strong> ${escapeHtml(d.teamLead || "[Name]")}<br><strong>Team Members:</strong> ${escapeHtml(d.teamMembers || "[Names and Designations]")}</p><p>The team will follow applicable professional standards and maintain the confidentiality of all information obtained during the assignment.</p>`; break;
    case "form23b": body = `<h1>CONSENT AND CERTIFICATE</h1><p>To: The Board of Directors<br><strong>${escapeHtml(d.company || "[Company Name]")}</strong></p><p>This is to certify that we have consented to act as auditor and have not been disqualified under applicable provisions of the Companies Act and professional regulations.</p><p>Previous auditor: <strong>${escapeHtml(d.retiringAuditor || "[Name]")}</strong><br>Previous appointment: <strong>${escapeHtml(d.previousFirm || "[Details]")}</strong></p><p>We confirm that we shall discharge our duties independently and in accordance with applicable standards.</p>`; break;
    case "engagement": body = `<h1>ENGAGEMENT LETTER</h1><p class="subject">Subject: Terms of audit engagement</p><p class="salutation">Dear Sir / Madam,</p><p>This letter confirms our engagement to audit the financial statements of <strong>${escapeHtml(d.company || "[Company Name]")}</strong> for the year ended <strong>${escapeHtml(d.period || "[Period]")}</strong>.</p><p><strong>Scope:</strong> ${escapeHtml(d.scope || "Audit of financial statements in accordance with applicable auditing standards.")}</p><p>Management is responsible for preparation of the financial statements and maintaining adequate internal controls. Our responsibility is to express an independent opinion based on audit evidence obtained.</p><p><strong>Professional fee:</strong> ${escapeHtml(d.fee || "[Fee]")}</p>`; break;
    case "bank": body = `<h1>BANK CONFIRMATION REQUEST</h1><p class="subject">To: ${escapeHtml(d.bankName || "[Bank Name]")}, ${escapeHtml(d.branch || "[Branch]")}</p><p>We are the auditors of <strong>${escapeHtml(d.company || "[Company Name]")}</strong>. Please confirm directly to us the particulars of the account shown below as at <strong>${formatDate(d.date)}</strong>.</p><table class="table-confirm"><tr><th>Account Number</th><th>Account Name</th><th>Balance</th></tr><tr><td>${escapeHtml(d.accountNo || "[Account Number]")}</td><td>${escapeHtml(d.company || "[Company Name]")}</td><td>${escapeHtml(d.balance || "[Balance]")}</td></tr></table><p>Please also state whether the account is clean, charged or subject to any lien. Your direct reply will help us complete our audit.</p>`; break;
    case "receivable": body = `<h1>RECEIVABLE CONFIRMATION</h1><p class="subject">To: ${escapeHtml(d.party || "[Customer Name]")}<br>${escapeHtml(d.partyAddress || "[Address]")}</p><p>Our records show that <strong>${escapeHtml(d.company || "[Company Name]")}</strong> has an account receivable balance of <strong>${escapeHtml(d.balance || "[Balance]")}</strong> as at <strong>${formatDate(d.asOn)}</strong>.</p><p>Please confirm whether this balance is correct. If there is any difference, kindly provide details and supporting information directly to our audit firm.</p>`; break;
    case "payable": body = `<h1>PAYABLE CONFIRMATION</h1><p class="subject">To: ${escapeHtml(d.party || "[Supplier Name]")}<br>${escapeHtml(d.partyAddress || "[Address]")}</p><p>Our records show that <strong>${escapeHtml(d.company || "[Company Name]")}</strong> has an account payable balance of <strong>${escapeHtml(d.balance || "[Balance]")}</strong> as at <strong>${formatDate(d.asOn)}</strong>.</p><p>Please confirm whether this balance is correct. If there is any difference, kindly provide details and supporting information directly to our audit firm.</p>`; break;
    case "management": body = `<h1>MANAGEMENT REPRESENTATION LETTER</h1><p class="subject">To: ${escapeHtml(d.auditor || "[Auditor / Firm]")}</p><p>We confirm that we provided you with all information and explanations relevant to the audit of <strong>${escapeHtml(d.company || "[Company Name]")}</strong> for the year ended <strong>${escapeHtml(d.period || "[Period]")}</strong>.</p><p>We acknowledge our responsibility for the preparation of the financial statements in accordance with applicable financial reporting standards and for maintaining adequate accounting records and internal control.</p><p>${escapeHtml(d.responsibility || "All minutes, significant plans and arrangements, related-party transactions and subsequent events have been made available to you.")}</p><p>The representative authorized to respond is <strong>${escapeHtml(d.representative || "[Name and designation]")}</strong>.</p>`; break;
  }
  document.getElementById("letterPreview").innerHTML = commonStart + body + `<div class="signature">Yours faithfully,<br><strong>${escapeHtml(d.auditor || "Rahim & Associates")}</strong><br>Chartered Accountants<br>Ref: ${escapeHtml(d.reference || "[Reference]")}</div>`;
  document.getElementById("previewStatus").textContent = "Auto-updated";
}

function getDrafts() {
  if (currentUser) return databaseDrafts;
  try { return JSON.parse(localStorage.getItem("auditDrafts") || "[]"); } catch { return []; }
}
async function loadDatabaseDrafts() {
  if (!supabase || !currentUser) return;
  const { data, error } = await supabase
    .from("documents")
    .select("id,template_id,title,data,status,created_at,updated_at")
    .eq("user_id", currentUser.id)
    .eq("status", "draft")
    .order("updated_at", { ascending: false });
  if (error) {
    showToast("Could not load drafts");
    return;
  }
  databaseDrafts = (data || []).map(d => ({
    id:d.id,
    templateId:d.template_id,
    title:d.title,
    data:d.data,
    updated:d.updated_at
  }));
  updateCounts();
  if (!document.getElementById("draftsView").classList.contains("hidden")) renderDrafts();
}
async function saveDraft() {
  if (!activeTemplate) return;
  if (!currentUser) {
    openAuth();
    showToast("Sign in to save to your account");
    return;
  }
  const draft = { id:crypto.randomUUID(), templateId:activeTemplate.id, title:activeTemplate.title, data:getData(), updated:new Date().toISOString() };
  const { error } = await supabase.from("documents").insert({
    id:draft.id,
    user_id:currentUser.id,
    template_id:draft.templateId,
    title:draft.title,
    data:draft.data,
    status:"draft"
  });
  if (error) {
    showToast("Could not save draft");
    return;
  }
  databaseDrafts.unshift(draft);
  updateCounts();
  showToast("Draft saved successfully");
  renderDrafts();
}
function renderDrafts() {
  const drafts = getDrafts();
  const list = document.getElementById("draftList");
  if (!drafts.length) { list.innerHTML = `<div class="draft-empty"><div><strong>No saved drafts</strong><br><br>Create a letter and save it for later.</div></div>`; return; }
  list.innerHTML = drafts.map(d => `<div class="draft-item"><div><strong>${escapeHtml(d.title)}</strong><small>${escapeHtml(d.data.company || "Unnamed company")} · ${new Date(d.updated).toLocaleDateString("en-GB")}</small></div><button class="secondary-button" data-draft="${d.id}">Open</button></div>`).join("");
  list.querySelectorAll("[data-draft]").forEach(btn => btn.addEventListener("click", () => {
    const draft = drafts.find(d => String(d.id) === String(btn.dataset.draft));
    openTemplate(draft.templateId);
    setTimeout(() => setData(draft.data), 0);
  }));
}
function updateCounts() {
  const drafts = getDrafts();
  document.getElementById("draftCount").textContent = drafts.length;
  document.getElementById("savedCount").textContent = drafts.length;
  document.getElementById("generatedCount").textContent = generatedCount;
  document.getElementById("totalCount").textContent = templates.length;
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function openAuth() {
  document.getElementById("authOverlay").classList.remove("hidden");
  document.getElementById("authError").textContent = "";
  document.getElementById("authEmail").focus();
}
function closeAuth() {
  document.getElementById("authOverlay").classList.add("hidden");
}
function updateUserUI() {
  const profileName = document.querySelector(".profile strong");
  const profileSub = document.querySelector(".profile small");
  const avatar = document.querySelector(".profile .avatar");
  if (currentUser) {
    const name = currentUser.user_metadata?.full_name || currentUser.email?.split("@")[0] || "User";
    profileName.textContent = name;
    profileSub.textContent = "Signed in";
    avatar.textContent = name.split(" ").map(n => n[0]).join("").slice(0,2).toUpper();
  } else {
    profileName.textContent = "Sign in";
    profileSub.textContent = "Save drafts securely";
    avatar.textContent = "IN";
  }
  updateCounts();
  if (currentUser) loadDatabaseDrafts();
  else databaseDrafts = [];
}
async function handleEmailAuth(event) {
  event.preventDefault();
  if (!supabase) {
    document.getElementById("authError").textContent = "Supabase is not configured.";
    return;
  }
  const signupUsername = document.getElementById("authUsername").value.trim().toLowerCase();
  const loginUsername = document.getElementById("authUsernameLogin").value.trim().toLowerCase();
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  const confirmPassword = document.getElementById("authPasswordConfirm").value;
  const fullName = document.getElementById("authName").value.trim();
  const errorElement = document.getElementById("authError");
  errorElement.textContent = "";
  if (authMode === "signup" && password !== confirmPassword) {
    errorElement.textContent = "Passwords do not match.";
    return;
  }
  if (authMode === "signup" && !fullName) {
    errorElement.textContent = "Please enter your full name.";
    return;
  }
  if (authMode === "signup" && !/^[a-z0-9._-]{3,30}$/.test(signupUsername)) {
    errorElement.textContent = "Username must be 3-30 characters and use letters, numbers, dot, underscore or hyphen.";
    return;
  }
  let loginEmail = email;
  if (authMode === "signin") {
    if (!loginUsername) {
      errorElement.textContent = "Please enter your username.";
      return;
    }
    const { data: resolvedEmail, error: lookupError } = await supabase.rpc("get_login_email", {
      lookup_username: loginUsername
    });
    if (lookupError || !resolvedEmail) {
      errorElement.textContent = "Username or password is incorrect.";
      return;
    }
    loginEmail = resolvedEmail;
  } else if (!email) {
    errorElement.textContent = "Please enter your email address.";
    return;
  }
  const result = authMode === "signup"
    ? await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + window.location.pathname,
          data: { full_name: fullName, username: signupUsername }
        }
      })
    : await supabase.auth.signInWithPassword({ email: loginEmail, password });
  if (result.error) {
    errorElement.textContent = result.error.message;
    return;
  }
  if (authMode === "signup" && !result.data.session) {
    errorElement.textContent = "Account created. Check your email to confirm.";
    return;
  }
  closeAuth();
  showToast("Signed in successfully");
}

document.querySelectorAll(".nav-item[data-view]").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
document.getElementById("newLetterButton").addEventListener("click", () => showView("letters"));
document.getElementById("viewAllButton").addEventListener("click", () => showView("letters"));
document.getElementById("backButton").addEventListener("click", () => showView("letters"));
document.getElementById("saveDraftButton").addEventListener("click", saveDraft);
document.getElementById("printButton").addEventListener("click", () => { generatedCount++; localStorage.setItem("auditGeneratedCount", generatedCount); updateCounts(); window.print(); });
document.getElementById("mobileMenu").addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("open"));
document.getElementById("globalSearch").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  showView("letters");
  const items = templates.filter(t => (t.title + " " + t.desc).toLowerCase().includes(q));
  document.getElementById("allTemplateGrid").innerHTML = items.map(t => `<button class="template-card" data-template="${t.id}"><div class="card-icon">${icons[t.icon]}</div><h3>${t.title}</h3><p>${t.desc}</p><footer><span>${t.category} Letter</span><span>›</span></footer></button>`).join("");
  document.getElementById("allTemplateGrid").querySelectorAll(".template-card").forEach(card => card.addEventListener("click", () => openTemplate(card.dataset.template)));
});
document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderTemplates("allTemplateGrid");
}));
document.addEventListener("keydown", e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); document.getElementById("globalSearch").focus(); } });

document.getElementById("authClose").addEventListener("click", closeAuth);
document.getElementById("authOverlay").addEventListener("click", event => { if (event.target.id === "authOverlay") closeAuth(); });
document.getElementById("emailAuthForm").addEventListener("submit", handleEmailAuth);
document.getElementById("authSwitch").addEventListener("click", () => {
  authMode = authMode === "signin" ? "signup" : "signin";
  document.getElementById("authTitle").textContent = authMode === "signin" ? "Sign in to your workspace" : "Create your workspace";
  document.getElementById("emailLogin").textContent = authMode === "signin" ? "Sign in" : "Create account";
  document.getElementById("authSwitch").textContent = authMode === "signin" ? "New here? Create an account" : "Already have an account? Sign in";
  document.getElementById("usernameField").classList.toggle("hidden", authMode !== "signup");
  document.getElementById("signupEmailField").classList.toggle("hidden", authMode !== "signup");
  document.getElementById("loginIdentityLabel").classList.toggle("hidden", authMode !== "signin");
  document.getElementById("nameField").classList.toggle("hidden", authMode !== "signup");
  document.getElementById("confirmField").classList.toggle("hidden", authMode !== "signup");
  document.getElementById("authPassword").autocomplete = authMode === "signin" ? "current-password" : "new-password";
  document.getElementById("forgotPassword").classList.toggle("hidden", authMode !== "signin");
  document.getElementById("authName").required = authMode === "signup";
  document.getElementById("authUsername").required = authMode === "signup";
  document.getElementById("authEmail").required = authMode === "signup";
  document.getElementById("authUsernameLogin").required = authMode === "signin";
  document.getElementById("authPasswordConfirm").required = authMode === "signup";
  document.getElementById("authError").textContent = "";
});
document.getElementById("forgotPassword").addEventListener("click", async () => {
  if (!supabase) {
    document.getElementById("authError").textContent = "Supabase is not configured.";
    return;
  }
  const email = document.getElementById("authEmail").value.trim();
  if (!email) {
    document.getElementById("authError").textContent = "Enter your email first.";
    return;
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  });
  document.getElementById("authError").textContent = error
    ? error.message
    : "Password reset instructions sent to your email.";
});
document.querySelector(".profile").addEventListener("click", async () => {
  if (currentUser) {
    if (window.confirm("Sign out of your audit workspace?")) {
      await supabase.auth.signOut();
      showToast("Signed out");
    }
  } else {
    openAuth();
  }
});

if (supabase) {
  supabase.auth.getSession().then(({ data }) => {
    currentUser = data.session?.user || null;
    updateUserUI();
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    updateUserUI();
  });
}

todayText();
renderTemplates("templateGrid", 10);
updateCounts();
