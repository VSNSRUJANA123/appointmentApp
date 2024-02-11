// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {items, starred} = props
  const {id, input, dates, isStared} = items
  const clickStar = () => {
    starred(id)
  }
  const imgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-list" key={id}>
      <div>
        <h1>{input}</h1>
        <button data-testid="star" className="star" onClick={clickStar}>
          <img src={imgUrl} alt="star" />
        </button>
      </div>
      <p>Date:{dates}</p>
    </li>
  )
}
export default AppointmentItem
