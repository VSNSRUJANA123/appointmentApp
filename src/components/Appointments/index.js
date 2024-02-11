// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuid} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {input: '', dates: '', staredELe: false, appointmentList: []}

  InputText = e => {
    this.setState({input: e.target.value})
  }

  currentDate = e => {
    this.setState({dates: e.target.value})
  }

  starrBtn = () => {
    this.setState(prev => ({staredELe: !prev.staredELe}))
  }

  submit = e => {
    e.preventDefault()
    const {input, dates, appointmentList} = this.state
    if (input !== '' && dates !== '') {
      const formatDate = format(new Date(dates), 'dd MMMM yyyy, EEEE')
      const newData = {
        id: uuid(),
        input,
        dates: formatDate,
        isStared: false,
      }
      this.setState({appointmentList: [...appointmentList, newData]})
      this.setState({input: '', dates: ''})
    }
  }

  starred = id => {
    const {appointmentList} = this.state
    this.setState({
      appointmentList: appointmentList.map(items => {
        if (items.id === id) {
          return {...items, isStared: !items.isStared}
        }
        return items
      }),
    })
  }

  getFilteredAppointmentsList = () => {
    const {staredELe, appointmentsList} = this.state

    if (staredELe) {
      const result = appointmentsList.filter(
        eachTransaction => eachTransaction.isStared === true,
      )
      return result
    }
    return appointmentsList
  }

  render() {
    const {input, dates, appointmentList, staredELe} = this.state
    const starredBtnEle = staredELe ? 'active' : ''
    const filterdStaredItems = this.getFilteredAppointmentsList()
    console.log(filterdStaredItems)
    return (
      <div className="bgContainer">
        <div className="white-card">
          <h1>Add Appointment</h1>
          <form className="appointments-Container" onSubmit={this.submit}>
            <div className="text-fields">
              <label htmlFor="Title">Title</label>
              <input
                id="Title"
                placeholder="Title"
                value={input}
                name="Title"
                onChange={this.InputText}
              />
              <label htmlFor="Date">Date</label>
              <input
                id="Date"
                placeholder="Date"
                name="Date"
                type="date"
                value={dates}
                onChange={this.currentDate}
              />
              <button className="addBtn">Add</button>
            </div>
            <div className="image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </form>
          <br />
          <hr />
          <br />
          <div className="appointment-lists">
            <h1>Appointments</h1>
            <button
              className={`starfilterbtn ${starredBtnEle}`}
              onClick={this.starrBtn}
            >
              Starred
            </button>
          </div>
          <ul className="appointmentsContainer">
            {appointmentList.map(items => (
              <AppointmentItem
                key={items.id}
                items={items}
                starred={this.starred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
