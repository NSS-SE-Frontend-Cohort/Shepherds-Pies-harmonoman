export const ToppingDropdown = ({ toppings, onToppingChange, selectedToppingId }) => {

    const handleChange = (e) => {
        const toppingId = parseInt(e.target.value);
        onToppingChange(toppingId);
    };

    return (
        <div className="w-full p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow">
            <div className="bg-white rounded-lg w-full">
                <select
                    className="bg-white rounded-lg px-6 py-2.5 w-full text-gray-800 font-semibold text-lg hover:bg-gray-100 transition focus:outline-none"
                    onChange={handleChange}
                    value={selectedToppingId}
                >
                    <option value={0}>Select a topping</option>
                    {toppings.map((topping) => (
                        <option key={topping.id} value={topping.id}>
                            {topping?.ingredient}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};