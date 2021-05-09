export interface Meal {
    mealName: string;
    price: number;
}

export const availableMeals: Meal[] = [
    { mealName: "Standard (sandwich)", price: 0 },
    { mealName: "Premium (lobster)", price: 10 },
    { mealName: "Ultimate (whole zebra)", price: 20 }
];