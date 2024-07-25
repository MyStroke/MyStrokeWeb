
import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function MyApp() {

  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = `${date.getFullYear()}-${month}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}