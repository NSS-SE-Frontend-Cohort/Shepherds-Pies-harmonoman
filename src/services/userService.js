export const getEmployeeByEmail = (email) => {
  return fetch(`http://localhost:8088/employees?email=${email}`).then((res) =>
    res.json()
  )
}

export const createEmployee = (customer) => {
  return fetch("http://localhost:8088/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json())
}
