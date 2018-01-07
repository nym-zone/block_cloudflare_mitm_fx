function onError(e){console.log(`CFMITM_CFG Error:${e}`);}
function saveWhitelist(e){
e.preventDefault();
//WHITELIST
// check each line and remove bad fqdn (simple check)
var cf_tmpdata=document.querySelector("#myset_cfwhite").value.split("\n");
for (var i=0;i<cf_tmpdata.length;i++){
if (!/^([0-9a-z.-]{1,})\.([a-z]{2,20})$/.test(cf_tmpdata[i])||cf_tmpdata[i].includes("..")||
cf_tmpdata[i].endsWith(".cloudflare.com")||cf_tmpdata[i]=='cloudflare.com'||
cf_tmpdata[i].endsWith(".incapsula.com")||cf_tmpdata[i]=='incapsula.com'||
cf_tmpdata[i].endsWith(".withgoogle.com")||cf_tmpdata[i].endsWith(".google.com")){cf_tmpdata[i]='';}
}
cf_tmpdata=cf_tmpdata.slice().sort(function(a,b){return a>b}).reduce(function(a,b){if (a.slice(-1)[0]!==b){a.push(b);};return a;},[]);// -duplicate
cf_tmpdata=cf_tmpdata.filter(v=>v!='');// -empty
cf_tmpdata=cf_tmpdata.join("\n");
browser.storage.local.set({myset_cfwhite: cf_tmpdata});document.querySelector("#myset_cfwhite").value=cf_tmpdata;
//workaround - simplewarn didn't work as expected if ign3p is active
if (document.querySelector("#myset_xsimplewarn_1").checked){document.querySelector("#myset_xign3p").checked=false;}
//ADVANCED
if (document.querySelector("#myset_xautoclean").checked){browser.storage.local.set({myset_xautoclean: "y"});}else{browser.storage.local.set({myset_xautoclean: "n"});}
if (document.querySelector("#myset_xincapsula").checked){browser.storage.local.set({myset_xincapsula: "y"});}else{browser.storage.local.set({myset_xincapsula: "n"});}
if (document.querySelector("#myset_xgshield").checked){browser.storage.local.set({myset_xgshield: "y"});}else{browser.storage.local.set({myset_xgshield: "n"});}
if (document.querySelector("#myset_xsucuri").checked){browser.storage.local.set({myset_xsucuri: "y"});}else{browser.storage.local.set({myset_xsucuri: "n"});}
if (document.querySelector("#myset_xign3p").checked){browser.storage.local.set({myset_xign3p: "y"});}else{browser.storage.local.set({myset_xign3p: "n"});}
if (document.querySelector("#myset_xwhitemark").checked){browser.storage.local.set({myset_xwhitemark: "y"});}else{browser.storage.local.set({myset_xwhitemark: "n"});}
//ACTION
if (document.querySelector("#myset_xsimplewarn_0").checked){browser.storage.local.set({myset_xsimplewarn:0});}
if (document.querySelector("#myset_xsimplewarn_1").checked){browser.storage.local.set({myset_xsimplewarn:1});}
if (document.querySelector("#myset_xsimplewarn_2").checked){browser.storage.local.set({myset_xsimplewarn:2});}
browser.runtime.sendMessage({relnow:'go'}).then(function(r){},onError);
}
function loadWhitelist(){
function setCurrentChoice(r){
//WHITELIST
document.querySelector("#myset_cfwhite").value = r.myset_cfwhite||"";
//ADVANCED
if (r.myset_xautoclean=='y'){document.querySelector("#myset_xautoclean").checked=true;}else{document.querySelector("#myset_xautoclean").checked=false;}
if (r.myset_xincapsula=='y'){document.querySelector("#myset_xincapsula").checked=true;}else{document.querySelector("#myset_xincapsula").checked=false;}
if (r.myset_xgshield=='y'){document.querySelector("#myset_xgshield").checked=true;}else{document.querySelector("#myset_xgshield").checked=false;}
if (r.myset_xsucuri=='y'){document.querySelector("#myset_xsucuri").checked=true;}else{document.querySelector("#myset_xsucuri").checked=false;}
if (r.myset_xign3p=='y'){document.querySelector("#myset_xign3p").checked=true;}else{document.querySelector("#myset_xign3p").checked=false;}
if (r.myset_xwhitemark=='y'){document.querySelector("#myset_xwhitemark").checked=true;}else{document.querySelector("#myset_xwhitemark").checked=false;}
if (r.myset_xsimplewarn){switch(r.myset_xsimplewarn){
case 1:document.querySelector("#myset_xsimplewarn_1").checked=true;break;
case 2:document.querySelector("#myset_xsimplewarn_2").checked=true;break;
default:document.querySelector("#myset_xsimplewarn_0").checked=true;break;
}}else{document.querySelector("#myset_xsimplewarn_0").checked=true;}
}
var getting=browser.storage.local.get();getting.then(setCurrentChoice,onError);
}
document.addEventListener("DOMContentLoaded", loadWhitelist);
document.querySelector("form").addEventListener("submit", saveWhitelist);