import Calendar from 'react-calendar';
// import { useStateContext } from '../../App';
import './grid.css';

export default function Grid() {
    // const { step, selectedDate, dispatch } = useStateContext()

  // function getWeekDays(date = new Date()) {
  //   const result = [];

  //   const current = new Date(date);
  //   const day = current.getDay(); // 0 (Sun) - 6 (Sat)

  //   // shift to Monday
  //   const diffToMonday = (day === 0 ? -6 : 1 - day);
  //   current.setDate(current.getDate() + diffToMonday);

  //   for (let i = 0; i < 7; i++) {
  //     const d = new Date(current);
  //     d.setDate(current.getDate() + i);
  //     result.push(d);
  //   }

  //   return result.map((e) => e.getDate());
  // }

  // function renderHours (className: string) {
  //   return new Array(24).fill(0).map((_, i) => <div className={className}>{i + ':00'}</div>)
  // }

  // function renderDays() {
  //   switch (step) {
  //     case 'day': return <span className="grid_day">{selectedDate.getDate()}</span>
  //     case 'week': return getWeekDays(selectedDate).map((date, i) => <span key={i} className="grid_week_day">{date}</span>)
  //     case 'month': return <div className="grid_day">Month</div>
  //   }
  // }

  return (
    <div className="grid">
      {/* <div className='grid_hours'>{renderHours('grid_hours')}</div> */}
      <div className="grid_tablet">
        <div className="grid_tablet_days">
          {/* {renderDays()} */}
        </div>
        <div className="grid_tablet_body">
          {/* Grid body content */}
        </div>
      </div>
    </div>

  );
}