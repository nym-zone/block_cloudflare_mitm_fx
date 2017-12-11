/*
		<<< Detect Cloudflare MiTM Attack >>>
						by Sw
	why? because...
	https://trac.torproject.org/projects/tor/ticket/24351
	http://www.crimeflare.com/
*/
//===============================================
function analyzemydata(res){
//console.log("mitmdetector: scanning: "+res.url);
var cflink=document.createElement('a');cflink.setAttribute('href',res.url);
var cf_hostname=cflink.hostname;
var cf_protocol=cflink.protocol;
var cf_gothead=res.responseHeaders;
cflink=null;
if ((cf_protocol=='http:'||cf_protocol=='https:') && cf_hostname.length>=4){
//console.log("mitmdetector: testing...: "+res.url);
var is_cloudflare_infected=0;// 2 to confirm
for(var i=0;i<cf_gothead.length;i++){
var cfv=cf_gothead[i];
if (cfv['name']=='cf-ray' && cfv['value']!=undefined){is_cloudflare_infected+=1;}
if (cfv['name']=='server' && cfv['value'].includes("cloudflare")){is_cloudflare_infected+=1;}
if (is_cloudflare_infected==2){break;}
}
if (is_cloudflare_infected>=1){
console.log('SECURITY_WARN: Cloudflare Detected: '+res.url);
return {redirectUrl: "https://0.0.0.0/"};// just drop the connection
}
}
return;
}
browser.webRequest.onHeadersReceived.addListener(analyzemydata,{urls: ["<all_urls>"]},["blocking","responseHeaders"]);
//