export function loadScript(url:string){
  return new Promise<void>((resolve, reject)=>{
    const allScripts = document.querySelectorAll('script') || []
    const arrayScripts = Array.from(allScripts)
    const hasLoad = arrayScripts.some((script)=>{
      return script.src === url
    })
    if(hasLoad){
      return resolve()
    }
    var script = document.createElement ("script")
    script.type ="text/javascript";
    script.onload =function(){
      resolve()
    };
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  })

}
