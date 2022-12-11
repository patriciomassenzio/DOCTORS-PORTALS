import { getDate } from 'date-fns';
import React from 'react';
import { DayPicker } from 'react-day-picker';
import stethos from '../../assets/images/bg-img.jpg';

const AppointmentBanner = ({ date, setDate }) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    const defaultMonth = new Date(currentYear, currentMonth);
    const futureDate = new Date(new Date().setDate(new Date().getDate() + 30));

    return (
        <section className='hero-section'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className='lg:w-1/2 pl-4 lg:pl-16'><img src={stethos} className="rounded-lg shadow-lg" alt='Chair' /></div>
                    <div className='rounded-lg shadow-lg'>
                        <DayPicker
                            mode='single'
                            onDayClick={(e) => {
                                getDate(e) <= currentDate && alert("Pick another date.")
                            }}
                            selected={date}
                            onSelect={setDate}
                            defaultMonth={defaultMonth} fromMonth={defaultMonth} fromDate={currentDate}
                            toMonth={new Date(futureDate.getFullYear(), futureDate.getMonth())}
                            showOutsideDays
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppointmentBanner;