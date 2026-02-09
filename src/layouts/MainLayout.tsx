import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import { useRef } from "react"
import MobileDrawer from "../components/layout/MobileDrawer"

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
      sidebarRef.current?.classList.toggle('-translate-x-full');
    };

    return (
      <div className="min-h-screen flex flex-col font-sans">
        <Header toggleSidebar={toggleSidebar} />
        <MobileDrawer ref={sidebarRef} toggleSidebar={toggleSidebar} />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
          {children}
        </main>
        <Footer />
    </div>
    )
}

export default MainLayout
