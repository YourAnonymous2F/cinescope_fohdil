

function Skeleton() {
    return (
        <div className="animate-pulse bg-gray-800 rounded-lg overflow-hidden">
            <div className="w-full h-[300px] bg-gray-700"></div>

            <div className="p-3">
                <div className="h-4 bg-gray-700 mb-2 rounded"></div>
                <div className="h-3 bg-gray-700 w-1/2 rounded"></div>
            </div>
        </div>
    )
}

export default Skeleton