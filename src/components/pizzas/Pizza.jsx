export const Pizza = ({ pizza, pizzaToppings, showEdit = false, onEdit, onDelete }) => {

    const foundPizzaToppings = pizzaToppings?.filter(
        pizzaTopping => pizzaTopping.pizzaId === pizza.id
    ) ?? [];

    const basePrice = pizza.size?.cost ?? 0.0;
    const toppingCost = foundPizzaToppings.reduce(
        (sum, pt) => sum + (pt.topping?.cost ?? 0), 0
    );

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const totalPizzaPrice = formatter.format(basePrice + toppingCost);

    return (
        <div className="relative grid grid-cols-[1fr_auto] items-start gap-4 py-4 border-b border-gray-200">
            <div className="space-y-1">
                <p><strong>Size:</strong> {pizza.size?.name ?? "Unknown"}</p>
                <p><strong>Sauce:</strong> {pizza.sauce?.type ?? "Unknown"}</p>
                <p><strong>Cheese:</strong> {pizza.cheese?.type ?? "Unknown"}</p>
                <p>
                    <strong>Toppings:</strong>{" "}
                    {foundPizzaToppings.length > 0
                        ? foundPizzaToppings.map(pt => pt.topping?.ingredient || "Unknown").join(", ")
                        : "None"}
                </p>            
            </div>
            <div className="text-right font-bold text-lg pr-2">
                {totalPizzaPrice}
            </div>
            {showEdit && (
                <button
                    type="button"
                    onClick={() => onEdit?.(pizza)}
                    className="absolute bottom-4 right-20 px-2 py-1 font-bold text-sm bg-green-600 text-white rounded-xl hover:bg-green-700"
                >
                    Edit
                </button>
            )}
            {onDelete && (
                <button
                    type="button"
                    onClick={() => onDelete(pizza.id)}
                    className="absolute bottom-4 right-2 px-2 py-1 font-bold text-sm bg-red-600 text-white rounded-xl hover:bg-red-700"
                >
                    Delete
                </button>
            )}
        </div>
    );
};