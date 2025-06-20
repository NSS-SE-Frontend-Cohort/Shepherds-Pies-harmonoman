export const SauceDropdown = ({ sauces, onSauceChange, selectedSauceId }) => {

    const handleChange = (e) => {
        const sauceId = parseInt(e.target.value);
        onSauceChange(sauceId);
    };

    return (
        <div className="w-full p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow">
            <div className="bg-white rounded-lg w-full">
                <select
                    className="bg-white rounded-lg px-6 py-2.5 w-full text-gray-800 font-semibold text-lg hover:bg-gray-100 transition focus:outline-none"
                    onChange={handleChange}
                    value={selectedSauceId}
                >
                    <option value={0}>Select a sauce</option>
                    {sauces.map((sauce) => (
                        <option key={sauce.id} value={sauce.id}>
                            {sauce?.type}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};