import React from 'react'
import styles from './Moto.module.scss'
import { useParams } from "react-router-dom";

function Moto() {
  const { motoId } = useParams();
  console.log(motoId);
  return (
    <div>Moto</div>
  )
}

export default Moto