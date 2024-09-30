import React, { useState, useEffect, useMemo } from "react";
import { Calendar } from "@nextui-org/calendar";
import { CalendarDate, DateValue, today, getLocalTimeZone } from '@internationalized/date';
import DailyHours from './DailyHours';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function CalendarSystem() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const jobs = useQuery(api.calendar.getMonthlyJobs, currentMonth);

  const handleDateChange = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    setSelectedDate(jsDate);

    if (date.month !== currentMonth.month + 1 || date.year !== currentMonth.year) {
      setCurrentMonth({ year: date.year, month: date.month - 1 });
    }
  };

  const jobDates = useMemo(() => {
    if (!jobs) return new Set<string>();
    
    const dates = new Set<string>();
    jobs.forEach(job => {
      let currentDate = new Date(job.startDate);
      const endDate = new Date(job.endDate);
      
      while (currentDate <= endDate) {
        dates.add(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    return dates;
  }, [jobs]);

  useEffect(() => {
    const style = document.createElement('style');
    const cssRules = Array.from(jobDates).map(date => 
      `.nextui-calendar-days [aria-label="${date}"] { 
        background-color: #e6f2ff !important; 
        border-radius: 50%; 
      }`
    ).join('\n');

    style.textContent = cssRules;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [jobDates]);

  return (
    <div className="flex gap-x-4">
      <Calendar 
        aria-label="Date Selection" 
        onChange={handleDateChange}
        defaultValue={today(getLocalTimeZone())}
      />
      <DailyHours selectedDate={selectedDate} />
    </div>
  );
}