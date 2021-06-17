import * as React from 'react'
// @ts-ignore
import {loadScript} from 'utils/loadScript'
import { merge } from './jsonToExcelMerge'
const {useState ,useEffect} = React
export const aoa = [
  ['姓名', '性别', '年龄', '注册时间'],
  ['张三', '男', 18, new Date()],
  ['李四', '女', 22, new Date()]
];
export default ()=>{
  const [isLoad,setLoad] = useState(false)
  useEffect(()=>{
    const xlsx = 'https://cdn.bootcdn.net/ajax/libs/xlsx/0.17.0/xlsx.core.min.js'
    const fileSaver = 'https://cdn.bootcdn.net/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'

    Promise.all([loadScript(xlsx),loadScript(fileSaver)])
      .then(()=>{
        setLoad(true)
      })
  },[])
  function downloadTable(){
    if(!isLoad)return
    const XLSX = (window as any).XLSX
    var sheet = XLSX.utils.json_to_sheet(aoa);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "SheetJS");
    XLSX.writeFile(wb, "SheetJS.xlsx", {compression:true});
  }
  function downloadTableMerge(){
    if(!isLoad)return
    const XLSX = (window as any).XLSX
    var sheet = XLSX.utils.json_to_sheet(aoa);
    sheet['!merges'] = merge;

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "SheetJS");
    XLSX.writeFile(wb, "SheetJS.xlsx", {compression:true});
  }

  return (
    <div>
      <pre>
        { aoa.map(item=>JSON.stringify(item)).join('\n') }
      </pre>
      <button onClick={downloadTable}>点击下载</button>
      <button onClick={downloadTableMerge}>点击下载-单元格合并</button>
    </div>
  )
}

