import * as React from 'react';
const { useEffect, useState } = React;
export default (props) => {
  const [name, setName] = useState('111');

  const changeName = (name) => {
    console.log(name);
    setName(name);
  };

  return (
    <>
      <Submodule changeName={changeName} name={name}></Submodule>
    </>
  );
};

function Submodule(props) {
  const [dep, setDep] = useState(1);
  useEffect(() => {
    console.log(props.name);
  }, [dep]);
  const changeName = () => {
    props.changeName(Math.random());
  };
  const changeDep = () => {
    setDep(dep + 1);
  };
  return (
    <>
      <div onClick={changeName}>修改name {props.name}</div>
      <div onClick={changeDep}>修改dep </div>
    </>
  );
}
