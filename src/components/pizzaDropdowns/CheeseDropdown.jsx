export const CheeseDropdown = ({ cheeses, onCheeseChange, selectedCheeseId }) => {

    const handleChange = (e) => {
        const cheeseId = parseInt(e.target.value);
        onCheeseChange(cheeseId);
    };

    return (
        <div className="w-full p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow">
            <div className="bg-white rounded-lg w-full">
                <select
                    className="bg-white rounded-lg px-6 py-2.5 w-full text-gray-800 font-semibold text-lg hover:bg-gray-100 transition focus:outline-none"
                    onChange={handleChange}
                    value={selectedCheeseId}
                >
                    <option value={0}>Select a cheese</option>
                    {cheeses.map((cheese) => (
                        <option key={cheese.id} value={cheese.id}>
                            {cheese?.type}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};