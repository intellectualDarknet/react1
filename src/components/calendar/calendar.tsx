import Calendar from 'react-calendar';
// import { useStateContext } from '../../App';
import './calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyCalendar() {
    // const { selectedDate, dispatch } = useStateContext()

    function onChange(value: Value) {
        console.log(value);
    }

    return (
      <div className="content_calendar">
        {/* <Calendar onChange={onChange} value={selectedDate} /> */}
      </div>
    );
}