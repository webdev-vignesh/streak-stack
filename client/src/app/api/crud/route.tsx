// API call to get the habits data
export const getHabitRecords = async() => {
  try {
    const response = await fetch("http://localhost:3001/api/habitRecords", {
      method: "GET",
    })
    if(response.ok){
      const data = await response.json();
      return data;
    }
  } catch(error) {
    console.error(error);
  }
}

// API call to post a new habit to the db
export const postHabitRecord = async(habitName: string, habitDescription: string, frequency: string, goal: number,  count: number) => {
  try{
    const response = await fetch("http://localhost:3001/api/habitRecords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        "habitName": habitName,
        "habitDescription": habitDescription,
        "frequency": frequency,
        "goal": goal,
        "count": count,
      })
    })

    if (response.ok) {
      return true;
    }
    return false;
    
  } catch(error) {
    console.error(error);
  }
}

// API call to delete a habit record
export const deleteHabitRecord = async(id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/habitRecords/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": id,
      })
    })
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      return data;
    }

  } catch (error) {
    console.log(error);
  }
}