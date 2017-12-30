function onError(e){console.log(`CFMITM_CFG Error:${e}`);}
function saveWhitelist(e){
e.preventDefault();
//WHITELIST
// check each line and remove bad fqdn (simple check)
var cf_tmpdata=document.querySelector("#myset_cfwhite").value.split("\n");
for (var i=0;i<cf_tmpdata.length;i++){
if (!/^([0-9a-z.-]{1,})\.([a-z]{2,20})$/.test(cf_tmpdata[i])||cf_tmpdata[i].startsWith(".")||cf_tmpdata[i].includes("..")||
cf_tmpdata[i].endsWith(".cloudflare.com")||cf_tmpdata[i]=='cloudflare.com'||
cf_tmpdata[i].endsWith(".incapsula.com")||cf_tmpdata[i]=='incapsula.com'||
cf_tmpdata[i].endsWith(".withgoogle.com")||cf_tmpdata[i].endsWith(".google.com")){cf_tmpdata[i]='';}
}
cf_tmpdata=cf_tmpdata.slice().sort(function(a,b){return a>b}).reduce(function(a,b){if (a.slice(-1)[0]!==b){a.push(b);};return a;},[]);// -duplicate
cf_tmpdata=cf_tmpdata.filter(v=>v!='');// -empty
cf_tmpdata=cf_tmpdata.join("\n");
browser.storage.local.set({myset_cfwhite: cf_tmpdata});
document.querySelector("#myset_cfwhite").value=cf_tmpdata;
//workaround - simplewarn didn't work as expected if igncj is active
if (document.querySelector("#myset_xsimplewarn").checked){document.querySelector("#myset_xigncj").checked=false;}
//ADVANCED
if (document.querySelector("#myset_xincapsula").checked){browser.storage.local.set({myset_xincapsula: "y"});}else{browser.storage.local.set({myset_xincapsula: "n"});}
if (document.querySelector("#myset_xgshield").checked){browser.storage.local.set({myset_xgshield: "y"});}else{browser.storage.local.set({myset_xgshield: "n"});}
if (document.querySelector("#myset_xsucuri").checked){browser.storage.local.set({myset_xsucuri: "y"});}else{browser.storage.local.set({myset_xsucuri: "n"});}
if (document.querySelector("#myset_xignhttp").checked){browser.storage.local.set({myset_xignhttp: "y"});}else{browser.storage.local.set({myset_xignhttp: "n"});}
if (document.querySelector("#myset_xigncj").checked){browser.storage.local.set({myset_xigncj: "y"});}else{browser.storage.local.set({myset_xigncj: "n"});}
if (document.querySelector("#myset_xsimplewarn").checked){browser.storage.local.set({myset_xsimplewarn: "y"});}else{browser.storage.local.set({myset_xsimplewarn: "n"});}
browser.runtime.sendMessage({relnow:'go'}).then(function(r){},onError);
}
function loadWhitelist(){
function setCurrentChoice(r){
//WHITELIST
document.querySelector("#myset_cfwhite").value = r.myset_cfwhite||"";
//ADVANCED
if (r.myset_xincapsula=='y'){document.querySelector("#myset_xincapsula").checked=true;}else{document.querySelector("#myset_xincapsula").checked=false;}
if (r.myset_xgshield=='y'){document.querySelector("#myset_xgshield").checked=true;}else{document.querySelector("#myset_xgshield").checked=false;}
if (r.myset_xsucuri=='y'){document.querySelector("#myset_xsucuri").checked=true;}else{document.querySelector("#myset_xsucuri").checked=false;}
if (r.myset_xignhttp=='y'){document.querySelector("#myset_xignhttp").checked=true;}else{document.querySelector("#myset_xignhttp").checked=false;}
if (r.myset_xigncj=='y'){document.querySelector("#myset_xigncj").checked=true;}else{document.querySelector("#myset_xigncj").checked=false;}
if (r.myset_xsimplewarn=='y'){document.querySelector("#myset_xsimplewarn").checked=true;}else{document.querySelector("#myset_xsimplewarn").checked=false;}
}
var getting=browser.storage.local.get();
getting.then(setCurrentChoice, onError);
}
document.addEventListener("DOMContentLoaded", loadWhitelist);
document.querySelector("form").addEventListener("submit", saveWhitelist);