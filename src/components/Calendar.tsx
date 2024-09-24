import React, { useState } from "react";
import { Calendar } from "@nextui-org/calendar";
import { CalendarDate, DateValue } from '@internationalized/date';
import DailyHours from './DailyHours';

export default function CalendarSystem() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: DateValue) => {
    // Convert DateValue to JavaScript Date
    const jsDate = new Date(date.year, date.month - 1, date.day);
    setSelectedDate(jsDate);
  };

  return (
    <div className="flex gap-x-4">
      <Calendar 
        aria-label="Date Selection" 
        onChange={handleDateChange}
      />
      <DailyHours selectedDate={selectedDate} />
    </div>
  );
}