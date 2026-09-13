// Emits a print-ready HTML rendering of src/content/resume.ts (A4, one page).
import { resume } from "../src/content/resume.ts";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rich = (s: string) => esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
const r = resume;
const side = `
<h3>Education</h3>${r.sidebar.education.map(e=>`<div class="blk"><b>${esc(e.head)}</b><div>${esc(e.body)}</div><div class="meta">${esc(e.meta)}</div></div>`).join("")}
<h3>Links</h3>${r.sidebar.links.map(l=>`<div class="blk"><b>${esc(l.head)}</b><div><a href="${l.href}">${esc(l.body)}</a></div></div>`).join("")}
<h3>Skills</h3>${r.sidebar.skills.map(s=>`<div class="blk"><b>${esc(s.head)}</b><div>${esc(s.body)}</div></div>`).join("")}
<h3>Projects</h3>${r.sidebar.projects.map(p=>`<div class="blk"><b>${esc(p.head)}</b><div class="meta">${esc(p.meta)}</div><div>${rich(p.body)}</div></div>`).join("")}`;
const main = `
<h3>Summary</h3><p>${esc(r.summary)}</p>
<h3>Work experience</h3>${r.roles.map(role=>`<div class="role"><div class="rh"><b>${esc(role.title)}</b><span class="meta">${esc(role.date)}</span></div><ul>${role.items.map(it=>`<li class="${it.kind}">${rich(it.text)}</li>`).join("")}</ul></div>`).join("")}`;
console.log(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(r.name.first+" "+r.name.last)} — resume</title>
<style>
@page{size:A4;margin:7mm 8mm}
*{box-sizing:border-box}body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:#1f1c18;font-size:8.2pt;line-height:1.3;margin:0}
a{color:#0d6e55;text-decoration:none}
.head{text-align:center;border-bottom:1px solid #b3a993;padding-bottom:5pt;margin-bottom:6pt}
.name{font-size:22pt;letter-spacing:-.01em}.name b{font-weight:700}.name span{font-weight:300;color:#6b665e}
.sub{font-size:8.6pt;color:#6b665e;margin-top:2pt}.contact{font-size:8pt;color:#6b665e;margin-top:2pt}
.grid{display:grid;grid-template-columns:29% 1fr;gap:0 9mm}
h3{font-size:7pt;letter-spacing:.18em;text-transform:uppercase;color:#6b665e;border-bottom:1px solid #e1d9c9;padding-bottom:2pt;margin:7pt 0 4pt}
h3:first-child{margin-top:0}.blk{margin-bottom:3pt}.meta{color:#6b665e;font-size:7.8pt}
p{margin:0}.role{margin-bottom:4pt}.rh{display:flex;justify-content:space-between;gap:6pt;font-size:9.2pt}
ul{list-style:none;margin:1pt 0 0;padding:0}li{margin-top:1.5pt;padding-left:9pt;position:relative}
li:before{content:"•";position:absolute;left:0;color:#6b665e}li.sub{font-weight:700;margin-top:3.5pt}
li.leaf{padding-left:16pt}li.leaf:before{content:"○";left:7pt}
</style></head><body>
<div class="head"><div class="name"><span>${esc(r.name.first)}</span> <b>${esc(r.name.last)}</b></div>
<div class="sub">${esc(r.subtitle)}</div>
<div class="contact"><a href="mailto:${r.contact.email}">${r.contact.email}</a> · ${esc(r.contact.phone)} · <a href="${r.contact.portfolio.href}">${r.contact.portfolio.href.replace("https://","")}</a> · <a href="${r.contact.linkedin.href}">linkedin.com/in/sanskar-modi-220a42151</a> · <a href="${r.contact.github.href}">github.com/SanskarModi22</a></div></div>
<div class="grid"><aside>${side}</aside><main>${main}</main></div></body></html>`);
