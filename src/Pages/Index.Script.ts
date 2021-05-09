import * as ko from "knockout";
import { availableMeals, Meal } from "./Scripts/Common";

// http://learn.knockoutjs.com/#/?tutorial=collections

class SeatReservation {
    name: string;
    meal: KnockoutObservable<Meal>;
    formattedPrice: KnockoutComputed<string>;

    constructor(name: string, initialMeal: Meal) {
        this.name = name;
        this.meal = ko.observable(initialMeal);

        this.formattedPrice = ko.computed(() => {
            var price = this.meal().price;
            return price ? "$" + price.toFixed(2) : "None";
        });
    }
}

class ReservationsViewModel {
    availableMeals: Meal[] = availableMeals;

    seats: KnockoutObservableArray<SeatReservation>;
    totalSurcharge: KnockoutComputed<number>;

    removeSeatChild: any;

    constructor() {
        this.seats = ko.observableArray([
            new SeatReservation("Steve", availableMeals[0]),
            new SeatReservation("Bert", availableMeals[0])
        ]);

        this.totalSurcharge = ko.computed(() => {
            var total = 0;
            for (var i = 0; i < this.seats().length; i++)
                total += this.seats()[i].meal().price;
            return total;
        });

        this.removeSeatChild = this.removeSeat.bind(this);
    }

    addSeat() {
        this.seats.push(new SeatReservation("", availableMeals[0]));
    }

    removeSeat(seat: SeatReservation) {
        this.seats.remove(seat);
    }
}

ko.applyBindings(new ReservationsViewModel());