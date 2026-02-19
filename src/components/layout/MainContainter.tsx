const MainContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in duration-500">
        {children}
      </div>
    )
}

export default MainContainer