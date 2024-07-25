"use client";

import React, { useState } from 'react';
import { Container, Card, Text } from '@nextui-org/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import basic styling
import './MyStyledCalendar.css'; // Custom styling

function MyStyledCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = `${date.getFullYear()}-${month}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  return (
    <Container css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1e272e' }}>
      <Card css={{ padding: "$6", maxWidth: "320px", backgroundColor: "#303952", color: "#ecf0f1" }}>
        <Card.Header css={{ justifyContent: 'center' }}>
          <Text h4 css={{ margin: 0, color: "#ecf0f1" }}>
            {selectedDate.toLocaleString('th-TH', { year: 'numeric', month: 'long' })}
          </Text>
        </Card.Header>
        <Card.Body css={{ padding: 0 }}>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            locale="th-TH"
            className="my-react-calendar"
            tileClassName={({ Date, view }) => {
              if (view === 'month') {
                return date.getDay() === 0 || date.getDay() === 6 ? 'weekend' : '';
              }
            }}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MyStyledCalendar;
