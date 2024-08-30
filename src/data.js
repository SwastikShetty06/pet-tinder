const userInput = prompt("Please enter your name:");
const userAge = prompt("Please enter your Age:");
const userLocation = prompt("Please enter your Location:");
const userBio = prompt("Please enter your Bio:");
export const userData = {
    name: userInput,
    age: userAge,
    location: userLocation,
    bio: userBio
    };

    export const petData = [
    {
        id: 1,
        name: "Dog-pool",
        type: "Dog",
        breed: "Chinese Crested Dog",
        age: 2,
        imagePet: "https://people.com/thmb/lJh8McRghB_Qzb2UeHSIMR-Xqhk=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/dogpool-072924-2-b5bfb86301f74c8db1952e1b5743d966.jpg"
    },
    {
        id: 2,
        name: "Max",
        type: "Cat",
        breed: "Birman",
        age: 3,
        imagePet:"https://cdn.pixabay.com/photo/2024/03/04/16/38/cat-8612685_1280.jpg"
    },
    {
        id: 3,
        name: "Jack",
        type: "Cat",
        breed: "Chartreux",
        age: 3,
        imagePet:"https://cdn.pixabay.com/photo/2023/05/04/06/19/animal-7969289_1280.jpg"
    },
    {
        id: 4,
        name: "Bob",
        type: "Dog",
        breed: "Griffon Bruxellois",
        age: 3,
        imagePet:"https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 5,
        name: "Cikku",
        type: "Parrot",
        breed: "Parrot",
        age: 3,
        imagePet:"https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 6,
        name: "Tom",
        type: "Cat",
        breed: "Griffon Bruxellois",
        age: 3,
        imagePet:"https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 0,
        name: "Ereg",
        type: "Cat",
        breed: "Maine Coon",
        age: 3,
        imagePet:"dogpool.jpeg"
    }
    
    // Add more pets as needed
    ];