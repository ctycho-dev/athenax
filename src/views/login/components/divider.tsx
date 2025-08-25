interface DividerProps {
    children: React.ReactNode
}

export const Divider: React.FC<DividerProps> = ({ children }) => {

    return (
        <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-slate-700" />
            <div className="mx-4 text-sm text-gray-400 flex gap-2 items-center">{children}</div>
            <div className="flex-grow h-px bg-slate-700" />
        </div>
    )
} 