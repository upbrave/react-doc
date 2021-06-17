import * as React from 'react';
import './PaginationCss.css'
import Page from './Page'

const { useState, useEffect, useRef } = React
export default () => {
  const ref = useRef(null)
  const refForm = useRef(null)
  const refInput = useRef(null)
  useEffect(()=>{
    const instance = new Page(12)
    instance.init({
      container: ref.current,
      maxShowBtnCount: 3,
      onPageChange: state => {console.log('pagination change:', state.pageNumber)}
    })

  },[])
  return (
    <div className="pagination-container">
      <div className="box" ref={ref}></div>
    </div>
  );
}
