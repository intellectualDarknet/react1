// import { useStateContext } from '../../App';
import './header.css';

export default function Header() {

    return (
      <header className="header">
        {/* <button className="burger-button" onClick={() => dispatch({ type: 'burgerClick' })}>
          Burger
        </button>
        <button className="today-button" onClick={() => dispatch({ type: 'burgerClick' })}>
          Today
        </button>
        <div className="arrow-button" onClick={() => dispatch({ type: 'burgerClick' })}>
          {'<'}
        </div>
        <div className="arrow-button" onClick={() => dispatch({ type: 'burgerClick' })}>
          {'>'}
        </div> */}
        <div>
          Date
        </div>
        <select id="city" name="city">
          <option value="day">Day</option>
          <option value="spb">Week</option>
          <option value="novosibirsk">year</option>
        </select>
      </header>
    );
}