
const Loading = () => {

    return (
        <div>
            <div className={`bg-black z-[100] fixed left-0 top-0 h-svh w-svw 
                            grid items-center justify-center 
                            transition-all duration-1000`}>
                <div className={`loading font-bold text-2xl text-light-blue-1`}>
                    Loading
                </div>
            </div>
        </div>
        // <div className="flex items-center justify-center h-screen">
        //    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        // </div>
    )
}

export default Loading