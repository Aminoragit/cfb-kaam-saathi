/* Kaam Saathi — all logic runs in the browser. Data is kept in localStorage
   on this device only. No account, no server, no tracking. */

(function () {
  "use strict";

  var KEY = "kaamSaathiV1";

  var WORK_TYPES = [
    "Construction work", "Domestic work", "Street vending", "Farm work",
    "Delivery / driving", "Artisan / craft work", "Tailoring",
    "Cleaning / sanitation", "Loading / helper work", "Other work"
  ];

  var SKILLS = [
    { name: "Bricklaying / masonry", works: ["Construction work"] },
    { name: "Carpentry / wood work", works: ["Artisan / craft work", "Construction work"] },
    { name: "Tailoring / stitching", works: ["Tailoring"] },
    { name: "Cooking", works: ["Domestic work"] },
    { name: "Cleaning", works: ["Domestic work", "Cleaning / sanitation"] },
    { name: "Driving", works: ["Delivery / driving"] },
    { name: "Delivery / courier", works: ["Delivery / driving"] },
    { name: "Farming / harvesting", works: ["Farm work"] },
    { name: "Painting walls", works: ["Construction work"] },
    { name: "Plumbing", works: ["Construction work"] },
    { name: "Weaving / basket making", works: ["Artisan / craft work"] },
    { name: "Selling in a market", works: ["Street vending"] },
    { name: "Childcare", works: ["Domestic work"] },
    { name: "Loading and carrying", works: ["Loading / helper work"] }
  ];

  /* Scheme facts checked against the official pages on 10 November 2026.
     See the Sources list on the Benefits tab. */
  var SCHEMES = [
    {
      id: "eshram",
      name: "e-Shram — worker registration",
      what: "A free national register of unorganised workers. You get a 12-digit Universal Account Number (UAN) that links you to welfare schemes.",
      facts: ["Free to register. Nobody should charge you for it.", "Launched 26 August 2021 by the Ministry of Labour & Employment.", "31.89 crore workers had registered by August 2026."],
      who: "Unorganised workers aged 16 or above, who are not members of EPFO or ESIC and do not pay income tax.",
      link: "https://eshram.gov.in/",
      linkText: "eshram.gov.in",
      steps: ["Keep your Aadhaar number ready", "Keep the mobile number linked to Aadhaar ready", "Register at eshram.gov.in or at your nearest Common Service Centre (CSC)", "Write down your 12-digit UAN and keep it safe"]
    },
    {
      id: "pmsym",
      name: "PM-SYM — pension for unorganised workers",
      what: "A voluntary pension. You pay a small amount each month, the government pays the same amount, and after age 60 you get an assured pension of ₹3,000 a month.",
      facts: ["Monthly contribution ₹55–₹200, by the age you join at; the government matches it.", "Assured pension of ₹3,000 a month after age 60.", "Over 54 lakh workers had enrolled by July 2026."],
      who: "Unorganised workers aged 18–40 with monthly income of ₹15,000 or less, who are not EPFO/ESIC/NPS members and do not pay income tax.",
      link: "https://maandhan.in/",
      linkText: "maandhan.in",
      steps: ["Check your age and monthly income against the limits above", "Take Aadhaar and your bank account details", "Enrol at maandhan.in or at your nearest Common Service Centre (CSC)", "Keep the receipt and pay the monthly contribution on time"]
    },
    {
      id: "pmjay",
      name: "Ayushman Bharat PM-JAY — hospital cover",
      what: "Free hospital treatment up to ₹5 lakh per family per year, cashless at empanelled government and private hospitals.",
      facts: ["Cover of ₹5 lakh per family per year for hospital treatment.", "Eligibility follows the SECC 2011 list.", "Everyone aged 70 or above is covered, whatever their income."],
      who: "Families on the SECC 2011 list, and all citizens aged 70 or above. Only the official list can confirm a family.",
      link: "https://pmjay.gov.in/",
      linkText: "pmjay.gov.in",
      steps: ["Check your name at beneficiary.nha.gov.in or call 14555", "If listed, get your Ayushman card made at a CSC or empanelled hospital", "Carry the card when you go to hospital", "Treatment at an empanelled hospital is cashless — do not pay for covered treatment"]
    },
    {
      id: "pmsby",
      name: "PMSBY — accident cover",
      what: "Low-cost accident insurance through your bank: ₹2 lakh for accidental death or full disability, ₹1 lakh for partial disability.",
      facts: ["Premium ₹20 a year, taken from your bank account.", "Cover runs 1 June to 31 May each year.", "Age 18–70, with a bank or post office account."],
      who: "Anyone aged 18–70 with a bank or post office savings account.",
      link: "https://jansuraksha.gov.in/",
      linkText: "jansuraksha.gov.in",
      steps: ["Go to the bank where you hold your savings account", "Fill in the PMSBY form (also on jansuraksha.gov.in)", "Make sure ₹20 is in the account for the yearly auto-debit", "Tell your nominee (family member) that this cover exists"]
    },
    {
      id: "pmjjby",
      name: "PMJJBY — life cover",
      what: "Low-cost life insurance through your bank: ₹2 lakh paid to your nominee if you die, from any cause.",
      facts: ["Premium ₹436 a year, taken from your bank account.", "Cover runs 1 June to 31 May each year.", "Entry age 18–50, with a bank or post office account."],
      who: "Anyone aged 18–50 with a bank or post office savings account.",
      link: "https://jansuraksha.gov.in/",
      linkText: "jansuraksha.gov.in",
      steps: ["Go to the bank where you hold your savings account", "Fill in the PMJJBY form (also on jansuraksha.gov.in)", "Make sure ₹436 is in the account for the yearly auto-debit", "Name your nominee on the form and tell them about it"]
    },
    {
      id: "vishwakarma",
      name: "PM Vishwakarma — support for artisans",
      what: "Support for traditional artisans: recognition, skill training, a ₹15,000 toolkit incentive, and collateral-free loans for the trade.",
      facts: ["Toolkit incentive of ₹15,000.", "First loan up to ₹1 lakh (18 months), then up to ₹2 lakh (30 months), at 5% interest.", "Covers 18 listed traditional trades. Apply through a Common Service Centre (CSC)."],
      who: "Artisans aged 18 or above, self-employed in one of the 18 listed traditional trades (carpenter, tailor, potter, blacksmith, goldsmith, mason, cobbler, weaver, and others).",
      link: "https://pmvishwakarma.gov.in/",
      linkText: "pmvishwakarma.gov.in",
      steps: ["Check your trade is one of the 18 listed trades", "Take Aadhaar and bank account details to your nearest CSC", "Complete the artisan registration at the CSC", "Finish the basic skill training to become eligible for the first loan"]
    }
  ];

  /* ---------- state ---------- */

  function blankState() {
    return { profile: {}, entries: [], checks: {}, rates: {}, skills: [] };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blankState();
      var s = JSON.parse(raw);
      if (!s || typeof s !== "object") return blankState();
      s.profile = s.profile || {};
      s.entries = Array.isArray(s.entries) ? s.entries : [];
      s.checks = s.checks || {};
      s.rates = s.rates || {};
      s.skills = Array.isArray(s.skills) ? s.skills : [];
      return s;
    } catch (e) { return blankState(); }
  }

  function saveState() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage full or blocked */ }
  }

  var state = loadState();

  /* ---------- helpers ---------- */

  function $(id) { return document.getElementById(id); }
  function rupees(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function todayStr() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function dateNDaysAgo(n) { var d = new Date(); d.setDate(d.getDate() - n); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function monthOf(dateStr) { return dateStr ? dateStr.slice(0, 7) : ""; }
  function showNotice(msg, ok) {
    var el = $("notice");
    el.textContent = msg;
    el.className = "banner" + (ok ? " ok" : "");
    el.classList.remove("hidden");
    setTimeout(function () { el.classList.add("hidden"); }, 6000);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function statusOf(e) {
    var owed = Math.max(0, e.earned - e.received);
    if (owed === 0) return { label: "Paid", cls: "paid" };
    if (e.received === 0) return { label: "Unpaid", cls: "unpaid" };
    return { label: "Partly paid", cls: "partial" };
  }

  /* ---------- tabs ---------- */

  var tabButtons = document.querySelectorAll(".tab");
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { showTab(btn.getAttribute("data-tab")); });
  });
  function showTab(name) {
    tabButtons.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-tab") === name); });
    ["log", "money", "benefits", "skills", "profile"].forEach(function (t) {
      $("tab-" + t).classList.toggle("hidden", t !== name);
    });
    if (name === "money") renderMoney();
    if (name === "benefits") renderBenefits();
    if (name === "skills") renderSkills();
    window.scrollTo(0, 0);
  }

  /* ---------- work log ---------- */

  var entryForm = $("entry-form");
  $("f-date").value = todayStr();

  entryForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var earned = Number($("f-earned").value);
    var received = Number($("f-received").value);
    var hours = Number($("f-hours").value);
    if (!isFinite(earned) || earned < 0 || !isFinite(received) || received < 0 ||
        !isFinite(hours) || hours < 0 || hours > 24 || !$("f-date").value) {
      showNotice("Please check the numbers: hours 0–24, pay 0 or more, and a date.");
      return;
    }
    var id = $("edit-id").value;
    var entry = {
      id: id || ("e" + Date.now() + Math.floor(Math.random() * 1000)),
      date: $("f-date").value,
      work: $("f-work").value,
      hours: hours,
      earned: earned,
      received: received,
      payer: $("f-payer").value.trim(),
      note: $("f-note").value.trim(),
      sample: false
    };
    if (id) {
      var i = state.entries.findIndex(function (e) { return e.id === id; });
      if (i >= 0) { entry.sample = state.entries[i].sample; state.entries[i] = entry; }
    } else {
      state.entries.push(entry);
    }
    saveState();
    resetEntryForm();
    renderEntries();
    showNotice(id ? "Day updated." : "Day saved.", true);
  });

  function resetEntryForm() {
    entryForm.reset();
    $("f-date").value = todayStr();
    $("edit-id").value = "";
    $("save-entry").textContent = "Save this day";
    $("cancel-edit").hidden = true;
  }
  $("cancel-edit").addEventListener("click", resetEntryForm);

  function renderEntries() {
    var body = $("entries-body");
    var list = state.entries.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    $("entries-count").textContent = list.length ? list.length + " day(s) saved" : "";
    $("no-entries").style.display = list.length ? "none" : "";
    body.innerHTML = list.map(function (e) {
      var st = statusOf(e);
      var owed = Math.max(0, e.earned - e.received);
      return "<tr><td>" + esc(e.date) + (e.sample ? ' <span class="pill sample">sample</span>' : "") + "</td>" +
        "<td>" + esc(e.work) + (e.payer ? "<br><span class='muted'>" + esc(e.payer) + "</span>" : "") +
        (e.note ? "<br><span class='muted'>" + esc(e.note) + "</span>" : "") + "</td>" +
        "<td>" + e.hours + "</td><td>" + rupees(e.earned) + "</td><td>" + rupees(e.received) + "</td>" +
        "<td>" + rupees(owed) + "</td>" +
        "<td><span class='pill " + st.cls + "'>" + st.label + "</span></td>" +
        "<td><button type='button' class='link-btn' data-edit='" + e.id + "'>Edit</button>" +
        "<button type='button' class='link-btn' data-del='" + e.id + "'>Delete</button></td></tr>";
    }).join("");
    var hasSample = state.entries.some(function (e) { return e.sample; });
    $("sample-banner").classList.toggle("hidden", !hasSample);
    body.querySelectorAll("[data-edit]").forEach(function (b) {
      b.addEventListener("click", function () { startEdit(b.getAttribute("data-edit")); });
    });
    body.querySelectorAll("[data-del]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.entries = state.entries.filter(function (e) { return e.id !== b.getAttribute("data-del"); });
        saveState(); renderEntries(); showNotice("Day deleted.", true);
      });
    });
  }

  function startEdit(id) {
    var e = state.entries.find(function (x) { return x.id === id; });
    if (!e) return;
    $("edit-id").value = e.id;
    $("f-date").value = e.date;
    $("f-work").value = e.work;
    $("f-hours").value = e.hours;
    $("f-earned").value = e.earned;
    $("f-received").value = e.received;
    $("f-payer").value = e.payer || "";
    $("f-note").value = e.note || "";
    $("save-entry").textContent = "Save changes";
    $("cancel-edit").hidden = false;
    showTab("log");
    entryForm.scrollIntoView();
  }

  $("load-sample").addEventListener("click", function () {
    if (state.entries.some(function (e) { return e.sample; })) {
      showNotice("A sample week is already loaded. Remove it first to load it again.");
      return;
    }
    var rows = [
      { d: 6, work: "Construction work", hours: 8, earned: 600, received: 600, payer: "Site contractor", note: "" },
      { d: 5, work: "Construction work", hours: 8, earned: 600, received: 400, payer: "Site contractor", note: "₹200 promised tomorrow" },
      { d: 4, work: "Loading / helper work", hours: 6, earned: 450, received: 450, payer: "Market godown", note: "" },
      { d: 3, work: "Domestic work", hours: 5, earned: 400, received: 400, payer: "House in Block C", note: "" },
      { d: 2, work: "Construction work", hours: 8, earned: 600, received: 600, payer: "Site contractor", note: "" },
      { d: 1, work: "Street vending", hours: 7, earned: 550, received: 550, payer: "Own stall", note: "" },
      { d: 0, work: "Construction work", hours: 8, earned: 600, received: 0, payer: "Site contractor", note: "Not paid yet" }
    ];
    rows.forEach(function (r, i) {
      state.entries.push({
        id: "sample" + Date.now() + i, date: dateNDaysAgo(r.d), work: r.work, hours: r.hours,
        earned: r.earned, received: r.received, payer: r.payer, note: r.note, sample: true
      });
    });
    saveState(); renderEntries();
    showNotice("Sample week loaded. These are examples only — remove them any time.", true);
  });

  $("remove-sample").addEventListener("click", function () {
    state.entries = state.entries.filter(function (e) { return !e.sample; });
    saveState(); renderEntries();
    showNotice("Sample entries removed.", true);
  });

  $("export-csv").addEventListener("click", function () {
    if (!state.entries.length) { showNotice("Nothing to download yet — save a day first."); return; }
    var head = "Date,Work,Hours,Pay agreed (INR),Pay received (INR),Still owed (INR),Status,Payer,Note,Sample\n";
    var lines = state.entries.slice().sort(function (a, b) { return a.date.localeCompare(b.date); }).map(function (e) {
      var q = function (v) { return '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"'; };
      return [e.date, q(e.work), e.hours, e.earned, e.received, Math.max(0, e.earned - e.received),
        statusOf(e).label, q(e.payer || ""), q(e.note || ""), e.sample ? "yes" : "no"].join(",");
    });
    downloadBlob(new Blob([head + lines.join("\n")], { type: "text/csv" }), "kaam-saathi-work-log.csv");
  });

  function downloadBlob(blob, filename) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------- money ---------- */

  function renderMoney() {
    var m = monthOf(todayStr());
    var thisMonth = state.entries.filter(function (e) { return monthOf(e.date) === m; });
    var earned = 0, received = 0, owed = 0;
    thisMonth.forEach(function (e) { earned += e.earned; received += e.received; owed += Math.max(0, e.earned - e.received); });
    var days = thisMonth.length;
    $("stat-earned").textContent = rupees(earned);
    $("stat-received").textContent = rupees(received);
    $("stat-owed").textContent = rupees(owed);
    $("stat-days").textContent = String(days);
    $("stat-avg").textContent = rupees(days ? earned / days : 0);
    var weekAgo = dateNDaysAgo(6);
    var weekReceived = 0;
    state.entries.forEach(function (e) { if (e.date >= weekAgo && e.date <= todayStr()) weekReceived += e.received; });
    $("stat-week").textContent = rupees(weekReceived);

    var chart = $("chart");
    var max = 1;
    var daysArr = [];
    for (var i = 6; i >= 0; i--) {
      var ds = dateNDaysAgo(i);
      var sum = 0;
      state.entries.forEach(function (e) { if (e.date === ds) sum += e.received; });
      daysArr.push({ date: ds, sum: sum });
      if (sum > max) max = sum;
    }
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    chart.innerHTML = daysArr.map(function (d) {
      var dt = new Date(d.date + "T00:00:00");
      var h = d.sum === 0 ? 3 : Math.max(6, Math.round((d.sum / max) * 120));
      return "<div class='bar-col'><span class='bar-val'>" + (d.sum ? rupees(d.sum) : "—") + "</span>" +
        "<div class='bar" + (d.sum === 0 ? " zero" : "") + "' style='height:" + h + "px'></div>" +
        "<span class='bar-day'>" + weekday[dt.getDay()] + " " + dt.getDate() + "</span></div>";
    }).join("");
    $("chart-note").textContent = "Each bar is the pay received on that day, from your saved days.";

    var items = [];
    if (owed > 0) {
      var unpaidDays = thisMonth.filter(function (e) { return e.earned - e.received > 0; }).length;
      items.push({ text: rupees(owed) + " is still owed to you across " + unpaidDays + " day(s) this month. Ask the payer named on those days, and keep the note of what was promised.", ok: false });
    }
    var lastEntry = state.entries.map(function (e) { return e.date; }).sort().pop();
    if (!lastEntry) {
      items.push({ text: "No days saved yet. Add a day under Work log to start your record.", ok: false });
    } else {
      var gap = Math.round((new Date(todayStr() + "T00:00:00") - new Date(lastEntry + "T00:00:00")) / 86400000);
      if (gap >= 3) items.push({ text: "No work logged for " + gap + " days (last entry " + lastEntry + "). Add missing days so your record stays complete.", ok: false });
    }
    SCHEMES.forEach(function (s) {
      var v = checkScheme(s.id);
      if (v.level === "match") {
        var done = (state.checks[s.id] || []).filter(Boolean).length;
        if (done < s.steps.length) {
          items.push({ text: "Likely match: " + s.name + " — " + (s.steps.length - done) + " step(s) left on its checklist. See the Benefits tab.", ok: false });
        }
      }
    });
    if (!items.length) items.push({ text: "Nothing waiting. Your log is up to date and no money is owed.", ok: true });
    $("followups").innerHTML = items.map(function (it) {
      return "<li" + (it.ok ? " class='ok'" : "") + ">" + esc(it.text) + "</li>";
    }).join("");
  }

  $("export-json").addEventListener("click", function () {
    downloadBlob(new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }), "kaam-saathi-backup.json");
  });

  $("import-json").addEventListener("change", function (ev) {
    var file = ev.target.files && ev.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var s = JSON.parse(reader.result);
        if (!s || typeof s !== "object" || !Array.isArray(s.entries)) throw new Error("bad file");
        state = loadState();
        state.profile = s.profile || {};
        state.entries = s.entries;
        state.checks = s.checks || {};
        state.rates = s.rates || {};
        state.skills = Array.isArray(s.skills) ? s.skills : [];
        saveState(); renderAll();
        showNotice("Backup loaded: " + state.entries.length + " day(s).", true);
      } catch (e) { showNotice("That file is not a Kaam Saathi backup."); }
      ev.target.value = "";
    };
    reader.readAsText(file);
  });

  $("wipe-all").addEventListener("click", function () {
    if (!window.confirm("Delete everything — your profile, work log, checklists and rates? This cannot be undone.")) return;
    try { localStorage.removeItem(KEY); } catch (e) {}
    state = blankState();
    renderAll();
    showNotice("Everything deleted.", true);
  });

  /* ---------- benefits checker ---------- */

  function age() {
    var a = Number(state.profile.age);
    return state.profile.age === "" || state.profile.age == null || !isFinite(a) ? null : a;
  }

  function checkScheme(id) {
    var p = state.profile, a = age();
    var need = { level: "need", text: "Fill in your details first — age, income, bank account and work — so this can be checked." };
    if (id === "eshram") {
      if (p.eshram === "yes") return { level: "match", text: "You said you are already registered. Keep your 12-digit UAN safe — it links you to other schemes." };
      if (a !== null && a < 16) return { level: "no", text: "Does not fit: e-Shram is for workers aged 16 or above." };
      if (p.formal === "yes") return { level: "no", text: "Does not fit: workers who are members of EPFO or ESIC cannot register on e-Shram." };
      if (p.tax === "yes") return { level: "no", text: "Does not fit: income-tax payers cannot register on e-Shram." };
      if (a !== null && a >= 16 && p.formal === "no" && p.tax === "no") return { level: "match", text: "Looks like a match: you are 16 or above, in unorganised work, with no EPFO/ESIC and no income tax. Registration is free." };
      return need;
    }
    if (id === "pmsym") {
      if (a !== null && (a < 18 || a > 40)) return { level: "no", text: "Does not fit: PM-SYM is for workers aged 18–40." };
      if (p.income === "over15000") return { level: "no", text: "Does not fit: PM-SYM is for monthly income of ₹15,000 or less." };
      if (p.formal === "yes") return { level: "no", text: "Does not fit: EPFO/ESIC/NPS members cannot join PM-SYM." };
      if (p.tax === "yes") return { level: "no", text: "Does not fit: income-tax payers cannot join PM-SYM." };
      if (a !== null && a >= 18 && a <= 40 && (p.income === "under10000" || p.income === "10000-15000") && p.formal === "no" && p.tax === "no")
        return { level: "match", text: "Looks like a match: age 18–40, income ₹15,000 or less, no EPFO/ESIC and no income tax." };
      return need;
    }
    if (id === "pmjay") {
      if (a !== null && a >= 70) return { level: "match", text: "Looks like a match: everyone aged 70 or above is covered under PM-JAY, whatever their income." };
      return { level: "check", text: "Check the official list: PM-JAY eligibility follows the SECC 2011 list, which this app cannot look up. Check your name at beneficiary.nha.gov.in or call 14555." };
    }
    if (id === "pmsby") {
      if (a !== null && (a < 18 || a > 70)) return { level: "no", text: "Does not fit: PMSBY is for ages 18–70." };
      if (p.bank === "no") return { level: "no", text: "Does not fit yet: PMSBY needs a bank or post office savings account." };
      if (p.bank === "yes" && a !== null && a >= 18 && a <= 70) return { level: "match", text: "Looks like a match: age 18–70 with a bank or post office account. Premium is ₹20 a year." };
      return need;
    }
    if (id === "pmjjby") {
      if (a !== null && (a < 18 || a > 50)) return { level: "no", text: "Does not fit: PMJJBY entry age is 18–50." };
      if (p.bank === "no") return { level: "no", text: "Does not fit yet: PMJJBY needs a bank or post office savings account." };
      if (p.bank === "yes" && a !== null && a >= 18 && a <= 50) return { level: "match", text: "Looks like a match: entry age 18–50 with a bank or post office account. Premium is ₹436 a year." };
      return need;
    }
    if (id === "vishwakarma") {
      if (p.artisan === "no") return { level: "no", text: "Does not fit: PM Vishwakarma is only for the 18 listed traditional trades." };
      if (a !== null && a < 18) return { level: "no", text: "Does not fit: PM Vishwakarma is for artisans aged 18 or above." };
      if (p.artisan === "yes" && a !== null && a >= 18) return { level: "match", text: "Looks like a match: you work in a listed traditional trade and are 18 or above. Apply through a Common Service Centre." };
      if (p.artisan === "yes" || p.work === "Artisan / craft work") return { level: "check", text: "Check: add your age under My details, and confirm your trade is one of the 18 listed trades on pmvishwakarma.gov.in." };
      return need;
    }
    return need;
  }

  var VERDICT_LABEL = { match: "Likely match", check: "Check", no: "Does not fit", need: "Details needed" };

  function renderBenefits() {
    var p = state.profile;
    var answered = ["age", "income", "bank", "aadhaar", "formal", "tax"].some(function (k) { return p[k] !== undefined && p[k] !== "" && p[k] !== null; });
    var counts = { match: 0, check: 0, no: 0, need: 0 };
    SCHEMES.forEach(function (s) { counts[checkScheme(s.id).level]++; });
    $("checker-status").textContent = answered
      ? ("Based on your answers: " + counts.match + " likely match(es), " + counts.check + " to check, " + counts.no + " do not fit, " + counts.need + " need more details.")
      : "No details saved yet — the checks below will say what is missing.";
    $("scheme-list").innerHTML = SCHEMES.map(function (s) {
      var v = checkScheme(s.id);
      var done = (state.checks[s.id] || []).filter(Boolean).length;
      var stepsHtml = s.steps.map(function (step, i) {
        var checked = state.checks[s.id] && state.checks[s.id][i];
        return "<li class='" + (checked ? "done" : "") + "'><label><input type='checkbox' data-scheme='" + s.id + "' data-step='" + i + "'" + (checked ? " checked" : "") + "> " + esc(step) + "</label></li>";
      }).join("");
      return "<article class='scheme'><h3>" + esc(s.name) + "</h3>" +
        "<span class='verdict " + v.level + "'>" + VERDICT_LABEL[v.level] + "</span>" +
        "<p>" + esc(v.text) + "</p>" +
        "<p>" + esc(s.what) + "</p>" +
        "<ul>" + s.facts.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
        "<p><strong>Who can get it:</strong> " + esc(s.who) + "</p>" +
        "<p>Official site: <a href='" + s.link + "' target='_blank' rel='noopener'>" + esc(s.linkText) + "</a></p>" +
        "<h4>Your steps <span class='progress'>(" + done + " of " + s.steps.length + " done)</span></h4>" +
        "<ul class='checklist'>" + stepsHtml + "</ul></article>";
    }).join("");
    document.querySelectorAll("#scheme-list input[type=checkbox]").forEach(function (cb) {
      cb.addEventListener("change", function () {
        var sid = cb.getAttribute("data-scheme"), i = Number(cb.getAttribute("data-step"));
        if (!state.checks[sid]) state.checks[sid] = [];
        state.checks[sid][i] = cb.checked;
        saveState();
        renderBenefits();
      });
    });
  }

  $("goto-profile").addEventListener("click", function () { showTab("profile"); });

  /* ---------- profile ---------- */

  function fillProfileForm() {
    var p = state.profile;
    $("p-name").value = p.name || "";
    $("p-age").value = (p.age === undefined || p.age === null) ? "" : p.age;
    $("p-work").value = p.work || "";
    $("p-income").value = p.income || "";
    $("p-bank").value = p.bank || "";
    $("p-aadhaar").value = p.aadhaar || "";
    $("p-eshram").value = p.eshram || "";
    $("p-formal").value = p.formal || "";
    $("p-tax").value = p.tax || "";
    $("p-artisan").value = p.artisan || "";
  }

  $("profile-form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var ageVal = $("p-age").value === "" ? null : Number($("p-age").value);
    if (ageVal !== null && (!isFinite(ageVal) || ageVal < 10 || ageVal > 100)) {
      showNotice("Please enter an age between 10 and 100.");
      return;
    }
    state.profile = {
      name: $("p-name").value.trim(),
      age: ageVal,
      work: $("p-work").value,
      income: $("p-income").value,
      bank: $("p-bank").value,
      aadhaar: $("p-aadhaar").value,
      eshram: $("p-eshram").value,
      formal: $("p-formal").value,
      tax: $("p-tax").value,
      artisan: $("p-artisan").value
    };
    saveState();
    showNotice("Your details are saved in this browser only.", true);
  });

  /* ---------- skills & work ---------- */

  function renderSkills() {
    var list = $("skill-list");
    list.innerHTML = SKILLS.map(function (s) {
      var on = state.skills.indexOf(s.name) >= 0;
      return "<button type='button' class='chip' data-skill='" + esc(s.name) + "' aria-pressed='" + on + "'>" + esc(s.name) + "</button>";
    }).join("");
    list.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () {
        var name = b.getAttribute("data-skill");
        var i = state.skills.indexOf(name);
        if (i >= 0) state.skills.splice(i, 1); else state.skills.push(name);
        saveState(); renderSkills();
      });
    });

    var rates = $("rate-list");
    rates.innerHTML = WORK_TYPES.map(function (w) {
      var val = state.rates[w] === undefined ? "" : state.rates[w];
      return "<label>" + esc(w) + "<input type='number' min='0' step='1' data-rate='" + esc(w) + "' value='" + val + "' placeholder='e.g. 500'></label>";
    }).join("");
    rates.querySelectorAll("[data-rate]").forEach(function (inp) {
      inp.addEventListener("change", function () {
        var v = Number(inp.value);
        if (inp.value === "" || !isFinite(v) || v < 0) delete state.rates[inp.getAttribute("data-rate")];
        else state.rates[inp.getAttribute("data-rate")] = v;
        saveState(); renderSkills();
      });
    });

    var box = $("skill-matches");
    if (!state.skills.length) {
      box.innerHTML = "<p class='muted'>Tick one or more skills above to see matching work.</p>";
      return;
    }
    var works = [];
    state.skills.forEach(function (sn) {
      var s = SKILLS.find(function (x) { return x.name === sn; });
      if (s) s.works.forEach(function (w) { if (works.indexOf(w) < 0) works.push(w); });
    });
    box.innerHTML = works.map(function (w) {
      var rate = state.rates[w];
      var line = (rate === undefined)
        ? "Set your daily rate for this work above to see a weekly figure."
        : "At your rate of " + rupees(rate) + " a day, 6 days of this work would pay " + rupees(rate * 6) + ". This uses only the rate you set.";
      return "<div class='match-card'><h4>" + esc(w) + "</h4><p>" + esc(line) + "</p></div>";
    }).join("");
  }

  /* ---------- boot ---------- */

  function renderAll() {
    fillProfileForm();
    renderEntries();
    renderMoney();
    renderBenefits();
    renderSkills();
  }
  renderAll();
})();
