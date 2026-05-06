// import { useStateContext } from '../../App';
import MyCalendar from '../calendar/calendar';
import Grid from '../grid/grid';
import './content.css';

export default function Content() {
    // const { state, dispatch } = useStateContext()

    return (
      <div className="content">
        <MyCalendar/>
        <Grid/>
      </div>
    );
}