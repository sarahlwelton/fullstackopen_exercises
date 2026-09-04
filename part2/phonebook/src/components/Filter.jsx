
const Filter = ({ filter, handleFilterChange }) => {

  return (
    <>
      <div>
        search: <input value={filter} onChange={handleFilterChange}></input>
      </div>
    </>
  )
}

export default Filter