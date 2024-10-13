console.log("hello");

const data = [
     { crop: 'Wheat', nitrogen: 20, potassium: 30, phosphorus: 10 },
     { crop: 'Wheat', nitrogen: 0, potassium: 0, phosphorus: 10 },
    { crop: 'Rice', nitrogen: 15, potassium: 25, phosphorus: 5 },
     { crop: 'Corn', nitrogen: 10, potassium: 20, phosphorus: 8 },
    { crop: 'Barley', nitrogen: 25, potassium: 35, phosphorus: 12 }
  ]

  const findClosest = (field, inputValue, data) => {
    let minDifference = Math.abs(data[0][field] - inputValue);
  
    // Step 1: Find the minimum difference
    data.forEach((entry) => {
      const difference = Math.abs(entry[field] - inputValue);
      if (difference < minDifference) {
        minDifference = difference; 
      }
    });
  
    // Step 2: Collect all entries with the same minimum difference
    const closestEntries = data.filter(
      (entry) => Math.abs(entry[field] - inputValue) === minDifference
    );
  
    return closestEntries;
  };

console.log(findClosest("nitrogen" , 22 ,data))
