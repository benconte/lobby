type Room = 'single' | 'double' | 'family'


export function getRandomRooms() {
    const roomCategories: any = ["single", "double", "family"];
    const numberOfRooms = Math.floor(Math.random() * 3) + 1; // Randomly choose 1, 2, or 3
  
    if (numberOfRooms === 3) {
      return roomCategories; // Return all room categories
    } else {
      const randomRooms: Room[] = [];
      while (randomRooms.length < numberOfRooms) {
        const randomCategory = roomCategories[Math.floor(Math.random() * roomCategories.length)];
        if (!randomRooms.includes(randomCategory)) {
          randomRooms.push(randomCategory);
        }
      }
      return randomRooms; // Return randomly selected room categories
    }
  }
  