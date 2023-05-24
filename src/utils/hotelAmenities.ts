const hotelAmenities = [
    "Pool",
    "Gym",
    "Spa",
    "Wi-Fi",
    "Restaurant",
    "Bar",
    "Cinema",
    "TV",
    "Parking"
];

export function getRandomAmenities() {
    const randomAmenities: any = [];
    const amenitiesCopy = [...hotelAmenities]; // Create a copy of the amenities array

    while (randomAmenities.length < 4 && amenitiesCopy.length > 0) {
        const randomIndex = Math.floor(Math.random() * amenitiesCopy.length);
        const randomAmenity = amenitiesCopy.splice(randomIndex, 1)[0]; // Remove the selected amenity from the copy

        randomAmenities.push(randomAmenity);
    }

    return randomAmenities;
}
