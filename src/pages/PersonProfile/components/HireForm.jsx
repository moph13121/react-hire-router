import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HireForm(props) {
  const [wage, setWage] = useState(0)
  const { person, hiredPeople, setHiredPeople } = props
  const hiredPerson = hiredPeople.find(hiredPerson => hiredPerson.login.uuid === person.login.uuid)
  const nav = useNavigate()


  useEffect(() => {
    if (hiredPerson !== undefined) {
      setWage(hiredPerson.wage)
    }
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    if (hiredPerson !== undefined) {
      hiredPerson.wage = wage
      setHiredPeople(
        [...hiredPeople].map(obj => obj.login.uuid === hiredPerson.login.uuid ? hiredPerson : obj)
      )
    } else {
      setHiredPeople(
        [...hiredPeople, { ...person, wage: wage }]
      )
    }
    nav('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="wage">Wage Offer</label>
      <input
        type="text"
        id="wage"
        name="wage"
        onChange={e => setWage(e.target.value)}
        value={wage}
      />
      <button type="submit">Hire</button>
    </form>
  )
}

export default HireForm
