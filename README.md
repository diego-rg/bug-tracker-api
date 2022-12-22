# API for a bug tracker web APP

- GET request to show all bugs

  `https://api-bugtracker.onrender.com/api/bugs`

- GET request to show one bug using id

  `https://api-bugtracker.onrender.com/api/bugs/:id`

- POST request to create a new bug

  `https://api-bugtracker.onrender.com/api/bugs`
  {
  method: "POST",
  body: JSON.stringify({
  "name": String,
  "description": String,
  "status": String<["new", "assigned", "fixed"]>,
  "priority": String<["low", "high"]>,
  "severity": String<["low", "high"]>
  }),
  headers: {
  "Content-Type": "application/json",
  },
  }

- PUT request to update an existing bug

  `https://api-bugtracker.onrender.com/api/bugs/{id}`

- DELETE request to destroy an existing bug

  `https://api-bugtracker.onrender.com/api/bugs/{id}`
