export const SizeDropdown = ({ sizes, onSizeChange, selectedSizeId }) => {
   
    const handleChange = (e) => {
        const sizeId = parseInt(e.target.value);
        onSizeChange(sizeId);
    };

    return (
        <div className="w-full p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow">
            <div className="bg-white rounded-lg w-full">
                <select
                    className="bg-white rounded-lg px-6 py-2.5 w-full text-gray-800 font-semibold text-lg hover:bg-gray-100 transition focus:outline-none"
                    onChange={handleChange}
                    value={selectedSizeId}
                >
                    <option value={0}>Select a size</option>
                    {sizes.map((size) => (
                        <option key={size.id} value={size.id}>
                            {size?.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};