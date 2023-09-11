// API call to get the habits data
export const getHabitRecords = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/habitRecords", {
      method: "GET",
    })
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

// API call to create a new habit to the db
export const postHabitRecord = async (habitName: string, habitDescription: string, frequency: string, goal: number, count: number) => {
  try {
    const response = await fetch("http://localhost:3001/api/habitRecords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "habitName": habitName,
        "habitDescription": habitDescription,
        "count": count,
        "goal": goal,
        "frequency": frequency,
      })
    })

    if (response.ok) {
      return true;
    }
    else {
      return false;
    }

  } catch (error) {
    console.error(error);
  }
}

// API call to delete a habit record
export const deleteHabitRecord = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/habitRecords/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      return false;
    }

  } catch (error) {
    console.log(error);
  }
}

// API call to update the status of a habit card as completed or not
export const updateHabitRecord = async (id: string, status: boolean) => {
  try {
    const response = await fetch(`http://localhost:3001/api/habitRecords/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "status": status
      })
    });
    console.log(status, response);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      return false;
    }
  }
  catch (error) {
    console.log(error);
  }
}